'use client'

import { useState } from 'react'

import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

import { SearchInput } from '@/components/ui/search-input'
import { Governors } from '@/integrations/tally/components/governors'
import { tallyChains } from '@/integrations/tally/config/chains'
import { cn } from '@/lib/utils'

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [chainId, setChainId] = useState<string>()

  return (
    <>
      <section className="w-full">
        <div className="container mx-auto grid max-w-screen-xl text-center">
          <h1 className="text-gradient-sand text-center text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-6xl md:leading-[6rem]">
            Council
          </h1>
          <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-200">Tally + OpenAI + TurboETH</h3>
          <p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl">Start building next generation Web3 apps today</p>
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
        </div>
        <div className="container mx-auto mt-16 grid max-w-screen-xl">
          <div className="card mb-8 w-full ">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Explore DAOS</h3>
              <SearchInput value={searchValue} onChange={setSearchValue} />
            </div>
            <hr className="my-5" />
            <div className="flex flex-wrap items-center gap-x-3 text-sm font-semibold">
              {tallyChains.map(({ id, name, logoSrc }) => (
                <div
                  onClick={() => setChainId(id)}
                  key={id}
                  className={cn(
                    'flex items-center min-w-fit px-2 py-3 cursor-pointer hover:bg-gray-200/40 rounded-lg',
                    chainId === id && 'bg-gray-200/60 hover:bg-gray-200/60'
                  )}>
                  {logoSrc && <Image className="mr-2" alt={`${name} logo`} src={logoSrc} width={18} height={18} />}
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
          <Governors
            searchValue={searchValue}
            className="mx-auto grid w-full cursor-pointer grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            classNameItem="card w-full overflow-hidden max-w-xs mx-auto h-[340px] flex hover:scale-105 flex-col items-center justify-between"
            variables={{
              chainIds: chainId ? [chainId] : [],
              pagination: {
                limit: 50,
                offset: 0,
              },
            }}
          />
        </div>
      </section>
    </>
  )
}
