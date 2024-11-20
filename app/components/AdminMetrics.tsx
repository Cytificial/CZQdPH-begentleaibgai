import { Row, Col, Statistic } from 'antd'
import { Api } from '@/core/trpc'
import { useEffect } from 'react'
import { RouterOutput } from '@/core/trpc'

type MetricsData = RouterOutput['analytics']['getMetrics']

export const AdminMetrics = () => {
  const { data, refetch } = Api.analytics.getMetrics.useQuery(
    {},
    { staleTime: 60000 }
  )
  
  useEffect(() => {
    const interval = setInterval(() => {
      void refetch()
    }, 60000) // Refresh every minute
    
    return () => clearInterval(interval)
  }, [refetch])

  const metrics: MetricsData = data ?? {
    dailyVisitors: 0,
    newUsers: 0,
    revenue: 0,
    supportMessages: 0
  }

  return (
    <Row gutter={16} className="mb-8">
      <Col span={6}>
        <Statistic
          title="Daily Visitors"
          value={metrics.dailyVisitors}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="New Users Today"
          value={metrics.newUsers}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Today's Revenue"
          value={metrics.revenue}
          prefix="$"
          precision={2}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Support Messages Today"
          value={metrics.supportMessages}
        />
      </Col>
    </Row>
  )
}
