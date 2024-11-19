import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { useNavigate, useSearchParams } from '@remix-run/react'
import { Button, Checkbox, Flex, Form, Input, Progress, Typography } from 'antd'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9]/)) strength += 25
    if (password.match(/[^A-Za-z0-9]/)) strength += 25
    setPasswordStrength(strength)
  }

  const { mutateAsync: register } = Api.authentication.register.useMutation()

  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: data => {
      if (data.redirect) {
        window.location.href = data.redirect
      }
    },
  })

  useEffect(() => {
    const email = searchParams.get('email')?.trim()

    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email })
    }
  }, [searchParams])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      const tokenInvitation = searchParams.get('tokenInvitation') ?? undefined

      await register({ ...values, tokenInvitation })

      login(values)
    } catch (error) {
      console.error(`Could not signup: ${error.message}`, {
        variant: 'error',
      })

      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '100px',
          paddingTop: '100px',
        }}
        gap="middle"
      >
        <AppHeader description="Welcome!" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
            label="Name"
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Your password"
              autoComplete="new-password"
              onChange={(e) => calculatePasswordStrength(e.target.value)}
            />
          </Form.Item>
          
          <Progress percent={passwordStrength} size="small" />

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Passwords do not match')
                }
              })
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please accept the terms and conditions' }]}
          >
            <Checkbox>
              I agree to the <Typography.Link href="/terms" target="_blank">Terms and Conditions</Typography.Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router('/login')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Have an account?</Typography.Text>{' '}
            <Typography.Text>Sign in</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
