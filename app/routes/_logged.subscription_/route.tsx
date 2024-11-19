import { Typography, Card, Button, Row, Col, Tag, Spin, message } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SubscriptionPage() {
  const { user } = useUserContext()

  const { data: plans, isLoading: plansLoading } =
    Api.subscriptionPlan.findMany.useQuery({})

  const { data: subscription, isLoading: subscriptionLoading } =
    Api.subscription.findFirst.useQuery({
      where: { userId: user?.id },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    })

  const { mutateAsync: createPaymentLink, isLoading: paymentLinkLoading } =
    Api.billing.createPaymentLink.useMutation()

  const handleSubscribe = async (planId: string) => {
    try {
      const response = await createPaymentLink({ productId: planId })
      if (typeof response === 'string') {
        window.location.href = response
      } else if (typeof response === 'object' && response.url) {
        window.location.href = response.url
      } else {
        message.error('Invalid payment link received')
      }
    } catch (error) {
      message.error('Failed to create payment link')
    }
  }

  if (plansLoading || subscriptionLoading) {
    return (
      <PageLayout layout="narrow">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>
          <i className="las la-crown" style={{ marginRight: '8px' }}></i>
          Subscription Plans
        </Title>
        <Text>Choose the perfect plan for your needs</Text>
      </div>

      {subscription && (
        <Card style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Title level={4}>
            <i
              className="las la-check-circle"
              style={{ marginRight: '8px' }}
            ></i>
            Current Subscription
          </Title>
          <Text>Plan: {subscription.plan?.name}</Text>
          <br />
          <Text>
            Status:{' '}
            <Tag color={subscription.status === 'active' ? 'green' : 'orange'}>
              {subscription.status}
            </Tag>
          </Text>
          <br />
          <Text>
            Valid until: {dayjs(subscription.endDate).format('MMMM D, YYYY')}
          </Text>
        </Card>
      )}

      <Row gutter={[16, 16]} justify="center">
        {plans?.map(plan => (
          <Col xs={24} sm={12} md={8} key={plan.id}>
            <Card
              title={
                <Title level={4} style={{ textAlign: 'center', margin: 0 }}>
                  {plan.name}
                </Title>
              }
              style={{ height: '100%' }}
            >
              <div style={{ textAlign: 'center' }}>
                <Title level={2} style={{ margin: '16px 0' }}>
                  ${plan.price}
                  <Text style={{ fontSize: '14px' }}>/month</Text>
                </Title>
                <Text>{plan.credits} credits</Text>
                <div style={{ margin: '16px 0' }}>
                  {(plan.features as string[])?.map((feature, index) => (
                    <div key={index} style={{ margin: '8px 0' }}>
                      <i
                        className="las la-check"
                        style={{ color: '#52c41a', marginRight: '8px' }}
                      ></i>
                      <Text>{feature}</Text>
                    </div>
                  ))}
                </div>
                <Button
                  type="primary"
                  size="large"
                  loading={paymentLinkLoading}
                  onClick={() => handleSubscribe(plan.id)}
                  style={{ width: '100%' }}
                >
                  Subscribe Now
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
