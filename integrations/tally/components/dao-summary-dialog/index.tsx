import { setTimeout } from 'timers'

import { useRef, useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import { IoBulbOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContentXL, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/lib/hooks/use-toast'

import { useIndexedDb } from '../../indexedDb/use-indexed-db'

interface DaoSummaryDialogProps {
  proposalId: string
  daoSlug: string
  daoName: string
  description: string
}

export const DaoSummaryDialog = ({ proposalId, daoSlug, daoName, description }: DaoSummaryDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [summary, setSummary] = useState<string>('')
  const summaryRef = useRef<string>('')
  const [promptSettings, setPromptSettings] = useState({
    tone: 'neutral',
    language: 'simple',
    length: 'short',
  })
  const { getDaoSummary, saveDaoSummary } = useIndexedDb()
  const { toast, dismiss } = useToast()

  const prompt = `Below is a governance proposal from the ${daoName} decentralized autonomous organization. Please provide a comprehensive summary of the proposal, capturing its key aspects in a ${promptSettings.tone} tone. Use a ${promptSettings.language} language style and elaborate on the details, ensuring the length is ${promptSettings.length} to cover all pertinent information. Additionally, include a concise tl;dr section that highlights the essential proposal points for a quick understanding: \\n ${description}`

  const handleToast = (type: 'description' | 'summary') => {
    toast({
      title: `${type[0].toUpperCase() + type.slice(1)} Copied`,
      description: `The ${daoName} proposal ${type} has been copied to your clipboard.`,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handlePromptChange = (key: string, value: string) => {
    setPromptSettings((prev) => ({ ...prev, [key]: value }))
  }

  const generateDescriptionSummary = async () => {
    setSummary('')
    setIsLoading(true)
    const storedSummary = await getDaoSummary(`${daoSlug}:${proposalId}:${promptSettings.tone}:${promptSettings.language}:${promptSettings.length}`)

    if (typeof storedSummary === 'undefined') {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = response.body
      if (!data) {
        return
      }

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        summaryRef.current += chunkValue
        setSummary((prev) => prev + chunkValue)
      }
      await saveDaoSummary({
        id: `${daoSlug}:${proposalId}:${promptSettings.tone}:${promptSettings.language}:${promptSettings.length}`,
        summary: summaryRef.current,
      })
      setIsLoading(false)
    } else {
      const summaryList = storedSummary?.summary.split(' ')
      summaryList.forEach((word, index) => setTimeout(() => setSummary((prev) => prev + summaryList[index] + ' '), 80 * index))
      setTimeout(() => setIsLoading(false), 80 * summaryList.length)
    }
  }

  return (
    <Dialog>
      <DialogContentXL>
        <div className="overflow-scroll">
          <DialogTitle>{daoName} Summary</DialogTitle>
          <div className="card mt-1">
            <h2 className="mb-3 text-lg font-bold">{daoName} proposal description:</h2>
            <div className="relative">
              <CopyToClipboard text={description}>
                <span
                  onClick={() => handleToast('description')}
                  className="flex-center absolute right-1 top-1 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                  <FaCopy className="text-neutral-600 dark:text-neutral-100" />
                </span>
              </CopyToClipboard>
              <Textarea readOnly value={description} className="h-52" />
            </div>
          </div>
          <div className="card mt-4">
            <div className="my-2 flex flex-row items-center justify-between">
              <h2 className="mr-3 text-lg font-bold">Generate a summary with AI:</h2>
              <Button disabled={isLoading} onClick={generateDescriptionSummary}>
                Generate
              </Button>
            </div>
            <div className="flex flex-col gap-y-3">
              {selectOptions.map((option) => (
                <Select key={option.value} value={promptSettings[option.value]} onValueChange={(value) => handlePromptChange(option.value, value)}>
                  <div>
                    <label className="text-sm font-medium">{option.label}:</label>
                    <SelectTrigger className="input mt-1 text-gray-600 placeholder:text-neutral-400 dark:text-gray-600 dark:placeholder:text-neutral-400">
                      <SelectValue defaultValue={option.options[0].value} placeholder={option.options[0].label} />
                    </SelectTrigger>
                  </div>
                  <SelectContent className="bg-white dark:bg-white">
                    {option.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
            <div className="relative mt-4">
              {summary && (
                <CopyToClipboard text={summary}>
                  <span
                    onClick={() => (summary ? handleToast('summary') : null)}
                    className="flex-center absolute right-1 top-1 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                    <FaCopy className="text-neutral-600 dark:text-neutral-100" />
                  </span>
                </CopyToClipboard>
              )}
              <Textarea readOnly value={summary} className="h-52" />
            </div>
          </div>
        </div>
      </DialogContentXL>
      <DialogTrigger>
        <Button className="bg-slate-100 p-1">
          <IoBulbOutline className="h-7 w-7 text-gray-500" />
        </Button>
      </DialogTrigger>
    </Dialog>
  )
}

const selectOptions = [
  {
    label: 'Tone',
    value: 'tone',
    options: [
      {
        label: 'Neutral',
        value: 'neutral',
      },
      {
        label: 'Formal',
        value: 'formal',
      },
      {
        label: 'Informal',
        value: 'informal',
      },
    ],
  },
  {
    label: 'Language Style',
    value: 'language',
    options: [
      {
        label: 'Simple',
        value: 'simple',
      },
      {
        label: 'Technical',
        value: 'technical',
      },
    ],
  },
  {
    label: 'Length',
    value: 'length',
    options: [
      {
        label: 'Short',
        value: 'short',
      },
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Long',
        value: 'long',
      },
    ],
  },
] as const
