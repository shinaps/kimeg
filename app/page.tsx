'use client'
import { Button, Flex, Text, Textarea, Title } from '@mantine/core'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

export default function Home() {
  const [text, setText] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, handlers] = useDisclosure(false)

  useEffect(() => {
    const setPlaceholderMessage = async () => {
      const res = await fetch('/api/openai/get-placeholder', { next: { revalidate: 3600 } })
      const message = await res.json()
      setResponse(message)
    }

    setPlaceholderMessage()
  }, [])

  const handleSubmit = async () => {
    handlers.open()
    const res = await fetch('/api/openai/create-message', {
      method: 'POST',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const message = await res.json()
    setResponse(message)
    handlers.close()
  }

  return (
    <>
      <Flex
        gap='md'
        justify='center'
        align='center'
        direction='column'
        wrap='nowrap'
        className={`mt-16`}
      >
        <Title order={1}>決め爺</Title>
        <Title order={6}>あなたの代わりに爺さんが決めてくれます</Title>
      </Flex>
      <Flex
        gap='md'
        justify='center'
        align='center'
        direction='column'
        wrap='nowrap'
        className={`mt-8`}
      >
        <Textarea
          className={`mx-auto w-72`}
          placeholder='ここに悩んでいることを書きなさい'
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          size='sm'
          autosize
        />
        <Button
          className={`mx-auto block w-72`}
          color='violet'
          disabled={text.length === 0 || isLoading}
          onClick={handleSubmit}
        >
          決めてもらう
        </Button>
      </Flex>
      <Flex
        gap='md'
        justify='center'
        align='center'
        direction='column'
        wrap='nowrap'
        className={`mx-auto mt-16 w-72`}
      >
        <Text className={`w-full rounded-md border border-solid border-slate-200 p-3`} fz='sm'>
          {isLoading ? 'うーむ' : `${response}`}
        </Text>
        <div className={`relative block h-36 w-36`}>
          {isLoading ? (
            <Image
              src='/thinking-g.png'
              fill={true}
              alt='考える爺さん'
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Image src='/g.png' fill={true} alt='爺さん' style={{ objectFit: 'contain' }} />
          )}
        </div>
      </Flex>
    </>
  )
}
