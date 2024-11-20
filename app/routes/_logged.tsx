import { useUserContext } from '@/core/context'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { Outlet, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { MrbSplashScreen } from '~/designSystem'

export default function LoggedLayout() {
  const { isLoggedIn, isLoading } = useUserContext()
  const router = useNavigate()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router('/login')
    }
  }, [isLoading, isLoggedIn])

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 min-h-screen w-full object-cover"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 min-h-screen bg-black/50">
          <NavigationLayout>
            <Outlet />
          </NavigationLayout>
        </div>
      </div>
    )
  }
}
