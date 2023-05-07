import Image from 'next/image'

interface ChainInfo {
  name: string
  src: string
  logo?: {
    width: number
    height: number
  }
}

export const ChainTag = ({ name, src, logo }: ChainInfo) => (
  <div className=" flex cursor-pointer items-center rounded-lg bg-gray-200/60 p-2">
    <Image className="mr-2" alt={'chain logo'} src={src} width={logo?.width || 15} height={logo?.height || 15} />
    <span className="text-sm font-semibold">{name}</span>
  </div>
)
