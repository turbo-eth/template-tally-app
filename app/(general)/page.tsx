'use client'

import { FaGithub } from 'react-icons/fa'

import { LinkComponent } from '@/components/shared/link-component'
import { Governors } from '@/integrations/tally/components/governors'

export default function Home() {
  return (
    <>
      <section className="w-full">
        <div className="container mx-auto grid max-w-screen-xl text-center">
          <h1 className="text-gradient-sand text-center text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-6xl md:leading-[6rem]">
            Council
          </h1>
          <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-200">Tally + OpenAI + TurboETH</h3>
          <p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl">Start building next generation Web3 apps today</p>
          <div className="mx-auto mt-6 flex items-center justify-center space-x-5">
            <a
              className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              href={'https://docs.turboeth.xyz/'}
              target="_blank"
              rel="noopener noreferrer">
              <span className="text-xl">⚡️</span>
              <span className="font-bold">TurboETH Documentation</span>
            </a>
            <a
              className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
              href="https://github.com/turbo-eth/template-tally-app"
              target="_blank"
              rel="noopener noreferrer">
              <FaGithub />
              <p>Star on GitHub</p>
            </a>
          </div>
          <LinkComponent className="link mt-4" href="https://github.com/turbo-eth/template-tally-app/issues">
            In active development 🧰 click here to follow bounty progress.
          </LinkComponent>
        </div>
        <hr className="mx-auto my-16 max-w-md" />
        <div className="container mx-auto grid max-w-screen-xl">
          <Governors
            className="flex w-full cursor-pointer flex-col gap-y-4"
            classNameItem="card flex items-center gap-x-10 justify-between"
            variables={{
              chainIds: ['eip155:1'],
              pagination: {
                limit: 6,
                offset: 0,
              },
            }}
          />
        </div>
      </section>
    </>
  )
}
