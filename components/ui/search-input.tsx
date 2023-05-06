import { AiOutlineSearch } from 'react-icons/ai'

import { Input } from './input'

interface SearchInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, placeholder, onChange }: SearchInputProps) => (
  <div className="relative">
    <AiOutlineSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      className="pl-10"
    />
  </div>
)
