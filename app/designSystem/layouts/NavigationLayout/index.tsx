// import { useUserContext } from '@/core/context'
import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'
import { Flex, Button } from 'antd'
import { ReactNode } from 'react'
import { useUserContext } from '~/core/context'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'
import styled from '@emotion/styled'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const pathname = useLocation().pathname
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/subscription',
      label: 'Subscription',
      position: 'topbar',

      onClick: () => goTo('/subscription'),
    },

    {
      key: '/my-prompts',
      label: 'My Prompts',
      position: 'topbar',

      onClick: () => goTo('/my-prompts'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  const StyledNav = styled.nav`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 12px;
    
    .nav-item {
      margin: 0 1rem;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
      }
    }
  `

  return (
    <StyledNav>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </StyledNav>
  )
}
