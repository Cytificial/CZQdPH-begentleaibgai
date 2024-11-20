import { Row, Col, Statistic } from 'antd'
import { Api } from '@/core/trpc'
import { useEffect, useState } from 'react'

export const AdminMetrics = () => {
  const { data, refetch } = Api.analytics.getMetrics.useQuery({})
  
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 60000) // Refresh every minute
    
    return () => clearInterval(interval)
  }, [refetch])

  return (
    <Row gutter={16} className="mb-8">
      <Col span={6}>
        <Statistic
          title="Daily Visitors"
          value={data?.dailyVisitors ?? 0}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="New Users Today"
          value={data?.newUsers ?? 0}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Today's Revenue"
          value={data?.revenue ?? 0}
          prefix="$"
          precision={2}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Support Messages Today"
          value={data?.supportMessages ?? 0}
        />
      </Col>
    </Row>
  )
}
