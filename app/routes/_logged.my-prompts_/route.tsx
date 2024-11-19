import { Typography, Input, Card, Space, Row, Col, Button, message } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyPromptsPage() {
  const { user } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch prompts
  const { data: prompts, refetch } = Api.prompt.findMany.useQuery({
    where: {
      userId: user?.id,
      OR: [
        { inputDescription: { contains: searchTerm, mode: 'insensitive' } },
        { generatedPrompt: { contains: searchTerm, mode: 'insensitive' } },
        { topic: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const { mutateAsync: updatePrompt } = Api.prompt.update.useMutation()
  const { mutateAsync: deletePrompt } = Api.prompt.delete.useMutation()

  // Handlers
  const handleFavorite = async (promptId: string, currentStatus: boolean) => {
    try {
      await updatePrompt({
        where: { id: promptId },
        data: { isFavorite: !currentStatus },
      })
      await refetch()
      message.success('Prompt updated successfully')
    } catch (error) {
      message.error('Failed to update prompt')
    }
  }

  const handleDelete = async (promptId: string) => {
    try {
      await deletePrompt({ where: { id: promptId } })
      await refetch()
      message.success('Prompt deleted successfully')
    } catch (error) {
      message.error('Failed to delete prompt')
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>My Prompts</Title>
          <Text>View and manage all your generated prompts</Text>
        </div>

        <Search
          placeholder="Search prompts..."
          allowClear
          size="large"
          onChange={e => setSearchTerm(e.target.value)}
          style={{ maxWidth: 600, margin: '0 auto', display: 'block' }}
        />

        <Row gutter={[16, 16]}>
          {prompts?.map(prompt => (
            <Col xs={24} sm={24} md={24} key={prompt.id}>
              <Card
                hoverable
                actions={[
                  <Button
                    type="text"
                    onClick={() => handleFavorite(prompt.id, prompt.isFavorite)}
                    icon={
                      <i
                        className={`las ${
                          prompt.isFavorite ? 'la-star' : 'la-star-o'
                        }`}
                        style={{
                          color: prompt.isFavorite ? '#faad14' : undefined,
                        }}
                      />
                    }
                  >
                    {prompt.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </Button>,
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDelete(prompt.id)}
                    icon={<i className="las la-trash-alt" />}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: '100%' }}
                >
                  {prompt.topic && (
                    <Text type="secondary">
                      <i className="las la-tag" /> {prompt.topic}
                    </Text>
                  )}
                  <Text strong>Input Description:</Text>
                  <Text>{prompt.inputDescription}</Text>
                  <Text strong>Generated Prompt:</Text>
                  <Text>{prompt.generatedPrompt}</Text>
                  <Text type="secondary">
                    <i className="las la-calendar" />{' '}
                    {dayjs(prompt.createdAt).format('MMMM D, YYYY')}
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}

          {prompts?.length === 0 && (
            <Col span={24}>
              <Card>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <i
                    className="las la-search"
                    style={{ fontSize: '2rem', color: '#999' }}
                  />
                  <Title level={4}>No prompts found</Title>
                  <Text type="secondary">
                    Try generating some prompts or adjusting your search terms
                  </Text>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </Space>
    </PageLayout>
  )
}
