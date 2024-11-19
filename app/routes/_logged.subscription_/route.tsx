import { Typography, Card, Button, Row, Col, message, Modal, Flex } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useState } from 'react'
import dayjs from 'dayjs'

type SubscriptionPlan = {
  id: string
  name: string
  price: string
  features: string[]
}

export default function SubscriptionPage() {
  const { user } = useUserContext()
  const { mutateAsync: createSubscription } = Api.subscription.create.useMutation()
  const { mutateAsync: createPaymentLink, isLoading: paymentLinkLoading } = Api.billing.createPaymentLink.useMutation()
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user?.id },
    include: { plan: true },
  })

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '9.99',
      features: ['5 AI prompts per day', 'Basic templates', 'Email support']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '19.99',
      features: ['20 AI prompts per day', 'Advanced templates', 'Priority support', 'Custom prompts']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '49.99',
      features: ['Unlimited AI prompts', 'Premium templates', '24/7 support', 'Custom prompts', 'API access']
    }
  ]
  
  const handleSubscribe = async (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    setConfirmModalVisible(true)
  }

  const handleConfirmSubscription = async () => {
    try {
      await createSubscription({ 
        data: { 
          planId: selectedPlan.id, 
          userId: user?.id as string, 
          status: 'active', 
          startDate: new Date().toISOString(), 
          endDate: dayjs().add(1, 'month').toISOString() 
        } 
      })
      
      const response = await createPaymentLink({ productId: selectedPlan.id })
      setConfirmModalVisible(false)
      
      if (typeof response === 'string') {
        window.location.href = response
      } else if (typeof response === 'object' && response.url) {
        window.location.href = response.url
      } else {
        message.error('Invalid payment link received')
      }
    } catch (error) {
      const errorMessage = error?.message || 'Failed to create subscription'
      if (error?.code === 'card_declined') {
        message.error('Your card was declined. Please try another payment method.')
      } else if (error?.code === 'expired_card') {
        message.error('Your card has expired. Please update your payment details.')
      } else {
        message.error(errorMessage)
      }
    }
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


      <Row gutter={[16, 16]} justify="center">
        {plans?.map(plan => (
          <Col xs={24} sm={12} md={8} key={plan.id}>
            <Card
              className={subscription?.plan?.id === plan.id ? 'border-2 border-blue-500' : ''}
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
                  onClick={() => handleSubscribe(plan)}
                  style={{ width: '100%' }}
                >
                  Subscribe Now
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>


      <Modal
        title="Confirm Subscription"
        open={confirmModalVisible}
        onOk={handleConfirmSubscription}
        onCancel={() => setConfirmModalVisible(false)}
        confirmLoading={paymentLinkLoading}
      >
        <p>You are about to subscribe to the following plan:</p>
        {selectedPlan && (
          <>
            <Title level={4}>{selectedPlan.name}</Title>
            <p>Price: ${selectedPlan.price}/month</p>
            <p>Features:</p>
            <ul>
              {(selectedPlan.features as string[])?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </PageLayout>
  )
}
