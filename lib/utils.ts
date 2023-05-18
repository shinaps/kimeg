export const createPromptForCreateMessage = (text: string): Prompt => {
  const prompt = [
    {
      role: 'system',
      content:
        'ユーザーから入力される文章には複数の選択肢が含まれています。その中の１つを選択し、お爺さんのような口調で返答して下さい。',
    },
    { role: 'user', content: 'コーラを買うかペプシを買うか迷ってます。どちらにすればいいですか？' },
    { role: 'assistant', content: 'コーラを買うのじゃ。' },
    { role: 'user', content: text },
  ]

  return prompt
}
export const createPromptForGetPlaceholder = (): Prompt => {
  const prompt = [
    {
      role: 'system',
      content: 'お爺さんが言いそうな哀愁漂う独り言をランダムに1つだけ言って下さい。',
    },
    { role: 'user', content: 'say()' },
    { role: 'assistant', content: '猫飼いたいのぉ' },
    { role: 'user', content: 'say()' },
  ]

  return prompt
}
