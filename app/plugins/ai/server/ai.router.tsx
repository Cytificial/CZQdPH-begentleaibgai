import { DateHelper } from '@/core/helpers/date'
import { FileHelper } from '@/core/helpers/file'
import { TRPCError } from '@trpc/server'
import axios from 'axios'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { UploadServer } from '~/plugins/upload/server'
import { AiService } from './ai.service'

/**
 * @provider AiApi
 * @description An AI library to query OpenAI
 * @function {({ prompt: string }) => Promise<{ answer: string}>} generateText - Send the prompt to OpenAI and get back its answer
 * @function {({ prompt: string }) => Promise<{ url: string }>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {({ url: string }) => Promise<{ translation: string }>} audioToText - Send the readStream of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {({ text: string } => Promise<{ url: string }>} textToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `const generateText = Api.ai.generateText.useMutation(); generateText.mutateAsync({ prompt: 'How are you?' }).then(response => response.answer);`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */
const checkApiKey = () => {
  if (!AiService.isActive()) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: 'OpenAI API key not configured. Add SERVER_OPENAI_API_KEY to .env',
    })
  }
}

export const AiRouter = Trpc.createRouter({
  generateText: Trpc.procedure
    .input(
      z.object({
        prompt: z.string(),
        attachmentUrls: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { prompt, attachmentUrls } = input
        checkApiKey()

        const answer = await AiService.generateText({
          prompt,
          attachmentUrls,
        })

        return { answer }
      } catch (error) {
        if (error instanceof TRPCError) throw error
        
        if (error.response?.status === 429) {
          throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: 'OpenAI rate limit exceeded. Please try again later.',
          })
        }
        
        if (error.response?.status === 400) {
          throw new TRPCError({
            code: 'BAD_REQUEST', 
            message: 'Invalid request to OpenAI API. Please check your inputs.',
          })
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'OpenAI API error occurred.',
        })
      }
    }),

  /**
   * ? The schema in this function is an example. You should update it to your use-case.
   * ? If you need multiple schemas, you can create one dedicated function for each.
   */
  generateJson: Trpc.procedure
    .input(
      z.object({
        instruction: z.string(),
        content: z.string(),
        attachmentUrls: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      checkApiKey()

      const schema = z.object({
        results: z.array(
          z.object({
            description: z.string(),
          }),
        ),
      })

      const json = await AiService.generateJson(
        input.instruction,
        input.content,
        schema,
        input.attachmentUrls,
      )

      return json
    }),

  generateImage: Trpc.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      checkApiKey()

      const url = await AiService.generateImage(input.prompt)

      return { url }
    }),

  audioToText: Trpc.procedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      checkApiKey()

      const arrayBuffer = await axios
        .get<ArrayBuffer>(input.url, { responseType: 'arraybuffer' })
        .then(response => response.data)

      const readstream = await FileHelper.createReadStreamFromArrayBuffer(
        arrayBuffer,
        'audio.wav',
      )

      const translation = await AiService.fromAudioToText(readstream)

      return { translation }
    }),

  textToAudio: Trpc.procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      checkApiKey()

      const buffer = await AiService.fromTextToAudio(input.text)

      const now = DateHelper.getNow()

      const name = `${now.getTime()}__text-to-audio.mp3`

      const file: UploadServer.FileType = {
        name,
        mimetype: 'audio/mp3',
        buffer,
      }

      const urls = await UploadServer.service.uploadPublic(file)

      const url = urls[0].url

      return { url }
    }),
})
