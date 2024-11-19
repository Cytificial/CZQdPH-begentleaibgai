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
  Select,
  Rate,
  DatePicker,
  Modal,
  Tabs,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout, ErrorBoundary } from '@/designSystem'

export default function HomePage() {
  const { user } = useUserContext()
  const [description, setDescription] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [promptQuality, setPromptQuality] = useState(0)
  const [filterTopic, setFilterTopic] = useState('')
  const [filterDate, setFilterDate] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [previewMode, setPreviewMode] = useState(false)

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

    setIsLoading(true)
    try {
      const result = await generatePrompt({
        prompt: `Generate a professional prompt based on this description: ${description}`,
      })

      if (result.answer) {
        setGeneratedPrompt(result.answer)
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
        setPromptQuality(0)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error generating prompt:', error)
      
      setGeneratedPrompt('')
      if (error.code === 'UNAUTHORIZED') {
        message.error('Please login to generate prompts')
      } else if (error.code === 'RATE_LIMITED') {
        message.error('Too many requests. Please try again later.')
      } else if (error.code === 'BAD_REQUEST') {
        message.error('Invalid prompt request. Please try again.')
      } else {
        message.error('Failed to generate prompt. Please try again.')
      }
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

            <Select
              style={{ width: '100%' }}
              placeholder="Select a topic"
              value={selectedTopic}
              onChange={setSelectedTopic}
            >
              {suggestions?.map(suggestion => (
                <Select.Option key={suggestion.id} value={suggestion.topic}>
                  {suggestion.topic}
                </Select.Option>
              ))}
            </Select>

            <TextArea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what you want to generate..."
              rows={4}
              maxLength={500}
              showCount
            />

            <Button type="primary" onClick={handleGeneratePrompt} loading={isLoading} block>
              <i className="las la-magic" /> Generate Prompt
            </Button>
          </Space>
        </Card>

        <Card style={{ display: generatedPrompt ? 'block' : 'none' }}>
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            <Text strong>Generated Prompt:</Text>
            <Paragraph>{generatedPrompt}</Paragraph>
            <Space>
              <Text>Quality Score:</Text>
              <Rate value={promptQuality} onChange={setPromptQuality} />
            </Space>
            <Space>
              <Button
                type='primary'
                icon={<i className='las la-eye' />}
                onClick={() => setPreviewMode(true)}
              >
                Preview
              </Button>
              <Button 
                type='text'
                icon={<i className='las la-copy' />}
                onClick={() => copyToClipboard(generatedPrompt)}
              >
                Copy to clipboard
              </Button>
            </Space>
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
          extra={
            <Space>
              <Select
                style={{ width: 200 }}
                placeholder="Filter by topic"
                value={filterTopic}
                onChange={setFilterTopic}
                allowClear
              >
                {suggestions?.map(suggestion => (
                  <Select.Option key={suggestion.id} value={suggestion.topic}>
                    {suggestion.topic}
                  </Select.Option>
                ))}
              </Select>
              <DatePicker onChange={setFilterDate} />
            </Space>
          }
        >
          <List
            dataSource={prompts?.filter(prompt => 
              (!filterTopic || prompt.topic === filterTopic) &&
              (!filterDate || dayjs(prompt.createdAt).isSame(filterDate, 'day'))
            )}
            pagination={{
              current: currentPage,
              onChange: setCurrentPage,
              pageSize: 10,
              total: prompts?.length
            }}
            renderItem={prompt => (
              <List.Item
                actions={[
                  <Tooltip title="Toggle favorite">
                    <Button
                      type="text"
                      icon={<i className={`las ${prompt.isFavorite ? 'la-heart' : 'la-heart-o'}`} />}
                      onClick={() => updatePrompt({
                        where: { id: prompt.id },
                        data: { isFavorite: !prompt.isFavorite }
                      })}
                    />
                  </Tooltip>,
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

      <Modal
        title="Prompt Preview"
        open={previewMode}
        onCancel={() => setPreviewMode(false)}
        footer={null}
        width={800}
      >
        <Tabs
          items={[
            {
              key: 'chatgpt',
              label: 'ChatGPT',
              children: <Card>{generatedPrompt}</Card>
            },
            {
              key: 'midjourney',
              label: 'Midjourney',
              children: <Card>/imagine {generatedPrompt} --v 5</Card>
            },
            {
              key: 'dalle',
              label: 'DALL-E',
              children: <Card>Create an image of {generatedPrompt}</Card>
            }
          ]}
        />
      </Modal>
    </PageLayout>
  )
}
