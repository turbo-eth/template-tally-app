import React from 'react'

import classNames from 'clsx'

import { siteConfig } from '@/config/site'
import { BranchIsAuthenticated } from '@/integrations/siwe/components/branch-is-authenticated'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import useScroll from '@/lib/hooks/use-scroll'

import { BranchIsWalletConnected } from '../shared/branch-is-wallet-connected'
import { LinkComponent } from '../shared/link-component'
import { ResponsiveMobileAndDesktop } from '../shared/responsive-mobile-and-desktop'
import { ThemeToggle } from '../shared/theme-toggle'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const scrolled = useScroll(50)
  const classes = classNames(
    props.className,
    'Header',
    'fixed top-0 w-full',
    'px-6 lg:px-10 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes}>
      <ResponsiveMobileAndDesktop>
        <>
          <div className="flex w-full justify-between p-4">
            <LinkComponent href="/" className="flex flex-1 items-center ">
              <span className="text-3xl">{siteConfig.emoji}</span>
            </LinkComponent>
            <div className="flex items-center gap-4">
              <LinkComponent className="flex items-center" href="/create">
                <span className="tag tag-light">Create</span>
              </LinkComponent>
              <ThemeToggle />
            </div>
          </div>
        </>
        <>
          <LinkComponent className="flex items-center" href="/">
            <span className="text-lg">{siteConfig.emoji}</span>
            <h1 className="text-gradient-sand ml-2 text-2xl font-light">{siteConfig.name}</h1>
          </LinkComponent>
          <div className="flex flex-1 justify-center lg:px-10"></div>

          <div className="flex items-center gap-4">
            <BranchIsWalletConnected>
              <BranchIsAuthenticated>
                <ButtonSIWELogout className="tag tag-light" label="Sign-Out" />
                <ButtonSIWELogin className="tag tag-light" label="Web3 Authenticate" />
              </BranchIsAuthenticated>
              <></>
            </BranchIsWalletConnected>
            <ThemeToggle />
          </div>
        </>
      </ResponsiveMobileAndDesktop>
    </header>
  )
}
