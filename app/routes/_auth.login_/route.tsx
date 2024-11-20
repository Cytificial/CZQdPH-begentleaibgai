import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { useNavigate, useSearchParams } from '@remix-run/react'
import { Button, Checkbox, Flex, Form, Input, Typography, Progress, Alert, Skeleton } from 'antd'
import { EyeInvisibleTwoTone, EyeTwoTone, GithubOutlined, GoogleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { AuthenticationClient } from '~/core/authentication/client/index'
import { motion, AnimatePresence } from 'framer-motion'
import { TRPCError } from '@trpc/server'

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface ErrorState {
  type: 'api' | 'network' | 'validation';
  message: string;
}

export default function LoginPage() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()

  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<ErrorState | null>(null)

  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: data => {
      try {
        const redirect = data.redirect && new URL(data.redirect).href;
        window.location.href = redirect || '/dashboard';
      } catch {
        window.location.href = '/dashboard';
      }
    },
    retry: false
  })

  const errorKey = searchParams.get('error')

  const errorMessage = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }[errorKey ?? 'default']

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      form.setFieldValue('email', 'test@test.com')
      form.setFieldValue('password', 'password')
    }
  }, [])

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true)
    setError(null)

    try {
      await login({ 
        email: values.email, 
        password: values.password,
        remember: rememberMe 
      })
    } catch (error) {
      if (!navigator.onLine) {
        setError({
          type: 'network',
          message: 'Network connection lost. Please check your internet connection.'
        })
      } else if (error instanceof TRPCError) {
        const errorMessages = {
          UNAUTHORIZED: 'Invalid email or password. Please check your credentials.',
          FORBIDDEN: 'Your account has been locked. Please contact support.',
          TOO_MANY_REQUESTS: 'Too many login attempts. Please try again later.',
          TIMEOUT: 'Request timed out. Please check your connection.',
          BAD_REQUEST: 'Invalid login request. Please check your input.',
          INTERNAL_SERVER_ERROR: 'Server error. Please try again later.',
          CONFLICT: 'Account conflict detected. Please contact support.',
          PRECONDITION_FAILED: 'Login prerequisites not met. Please verify your account.'
        };
        setError({
          type: 'api',
          message: errorMessages[error.code] || `Authentication error: ${error.message}`
        });
      } else {
        setError({
          type: 'api',
          message: 'An unexpected error occurred during login. Please try again.'
        })
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1} className="px-4">
      <Flex
        vertical
        style={{
          width: '100%',
          maxWidth: '340px',
          paddingBottom: '100px',
          paddingTop: '100px',
        }}
        gap="middle"
      >
        <AppHeader description="Welcome!" />

        <AnimatePresence>
          {(error || errorKey) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Alert
                type="error"
                message={error?.message || errorMessage}
                showIcon
                style={{ marginBottom: 16 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <Skeleton active paragraph={{ rows: 3 }} style={{ marginBottom: 16 }} />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is required' }
            ]}
          >
            <Input placeholder="Your email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Your password"
              autoComplete="current-password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Flex justify="end">
              <Button
                type="link"
                onClick={() => router('/reset-password')}
                style={{ padding: 0, margin: 0 }}
              >
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <AuthenticationClient.SocialButtons />

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router('/register')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">No account?</Typography.Text>{' '}
            <Typography.Text>Sign up</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
