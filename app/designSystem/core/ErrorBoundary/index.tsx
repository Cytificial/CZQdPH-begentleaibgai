import { Button, Divider, Flex, Result, Typography } from 'antd'
import React, { ReactNode } from 'react'
import { TRPCClientError } from '@trpc/client'
import { Api } from '@/core/trpc'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  isAuthError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      isAuthError: false
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isTRPCError = error instanceof TRPCClientError
    const isAuthError = error.message.includes('401') || 
                       error.message.includes('403') || 
                       error.message.includes('authentication')
    return {
      hasError: true,
      error,
      isAuthError: isAuthError || (isTRPCError && ['UNAUTHORIZED', 'FORBIDDEN'].includes((error as TRPCClientError).code))
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to reporting service or console
    console.error('Error caught in ErrorBoundary: ', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleLogin = () => {
    window.location.href = '/login'
  }

  handleRetry = async () => {
    const apiUtils = Api.useUtils()
    if (this.state.error instanceof TRPCClientError) {
      await apiUtils.invalidate()
    }
    this.setState({ hasError: false, error: null, isAuthError: false })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Display the actual error message
      return (
        <Result
          status={this.state.isAuthError ? "403" : "error"}
          title={this.state.isAuthError ? "Authentication Error" : "Something went wrong."}
          subTitle={this.state.isAuthError 
            ? "You need to be authenticated to access this resource. Please log in and try again."
            : "There was an unexpected error in the application. Check the details below for debugging."}
          style={{ background: 'white' }}
          extra={
            <>
              {this.state.isAuthError ? (
                <>
                  <Button type="primary" onClick={this.handleLogin}>
                    Go to Login
                  </Button>
                  <Button onClick={this.handleRetry}>
                    Retry
                  </Button>
                </>
              ) : (
                <>
                  <Button type="primary" onClick={this.handleReload}>
                    Reload Page
                  </Button>
                  <Button onClick={this.handleGoHome}>
                    Back Home
                  </Button>
                </>
              )}

              <Flex vertical className="mt-5" style={{ textAlign: 'left' }}>
                <Typography.Title level={5}>Error Details</Typography.Title>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.message}
                </pre>
                {!this.state.isAuthError && (
                  <>
                    <Divider />
                    <Typography.Title level={5}>Stack Trace</Typography.Title>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {this.state.error.stack}
                    </pre>
                  </>
                )}
              </Flex>
            </>
          }
        />
      )
    }

    return this.props.children
  }
}
