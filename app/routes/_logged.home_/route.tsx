import {
  Typography,
  Input,
  Button,
  Card,
  List,
  message,
  Tooltip,
  Space,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()
  const [description, setDescription] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')

  // Queries
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user?.id },
    include: { plan: true },
  })

  const { data: prompts } = Api.prompt.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  const { data: suggestions } = Api.suggestion.findMany.useQuery({})

  // Mutations
  const { mutateAsync: generatePrompt } = Api.ai.generateText.useMutation()
  const { mutateAsync: createPrompt } = Api.prompt.create.useMutation()
  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  const handleGeneratePrompt = async () => {
    if (!description) {
      message.error('Please enter a description')
      return
    }

    if (user.credits <= 0) {
      message.error('No credits remaining. Please upgrade.')
      return
    }

    try {
      const result = await generatePrompt({ 
        prompt: `Generate a professional prompt based on this description: ${description}`,
      })

      if (result.answer) {
        await createPrompt({
          data: {
            inputDescription: description,
            generatedPrompt: result.answer,
            isFavorite: false,
            topic: selectedTopic,
            userId: user?.id as string,
          },
        })
        await updateUser({
          where: { id: user.id },
          data: { credits: user.credits - 1 }
        })
        message.success('Prompt generated successfully!')
        setDescription('')
        setSelectedTopic('')
      }
    } catch (error) {
      message.error('Failed to generate prompt')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    message.success('Copied to clipboard!')
  }

  const useSuggestion = (suggestion: any) => {
    setDescription(suggestion.description)
    setSelectedTopic(suggestion.topic)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>AI Prompt Generator</Title>
          <Text>
            Transform your ideas into professional prompts with AI assistance
          </Text>
        </div>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Monthly Credits Remaining: </Text>
              <Text type="success">
                {user.credits} credits
              </Text>
            </div>

            <TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what you want to generate..."
              rows={4}
            />

            <Button type="primary" onClick={handleGeneratePrompt} block>
              <i className="las la-magic" /> Generate Prompt
            </Button>
          </Space>
        </Card>

        <Card
          title={
            <>
              <i className="las la-lightbulb" /> Suggestions
            </>
          }
        >
          <Row gutter={[16, 16]}>
            {suggestions?.map(suggestion => (
              <Col xs={24} sm={12} md={8} key={suggestion.id}>
                <Card
                  size="small"
                  hoverable
                  onClick={() => useSuggestion(suggestion)}
                >
                  <Text strong>{suggestion.topic}</Text>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {suggestion.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Card
          title={
            <>
              <i className="las la-history" /> Generated Prompts History
            </>
          }
        >
          <List
            dataSource={prompts}
            renderItem={prompt => (
              <List.Item
                actions={[
                  <Tooltip title="Copy to clipboard">
                    <Button
                      type="text"
                      icon={<i className="las la-copy" />}
                      onClick={() => copyToClipboard(prompt.generatedPrompt)}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  title={prompt.topic || 'Untitled'}
                  description={
                    <>
                      <Text type="secondary">
                        {dayjs(prompt.createdAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                      <Paragraph>{prompt.generatedPrompt}</Paragraph>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </PageLayout>
  )
}
