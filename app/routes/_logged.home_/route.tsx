import { useNavigate } from '@remix-run/react'
import { PageLayout } from '@/designSystem'
import { useUserContext } from '@/core/context'
import { AdminDashboardClient } from '~/plugins/admin-dashboard/client'

export default function HomePage() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  if (user.globalRole !== 'ADMIN') {
    navigate('/404')
    return null
  }

  const hook = AdminDashboardClient.useAdminDashboard({
    models: ['User', 'Subscription', 'SupportMessage'],
    countItemsByPages: 10,
  })

  return (
    <PageLayout>
      <AdminDashboardClient.AdminMetrics />
      <AdminDashboardClient.AdminDashboard hook={hook} />
    </PageLayout>
  )
}
