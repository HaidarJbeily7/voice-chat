// pages/api/chat.js
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemMessageTemplate = (input: string) => {
  return `Answer the question as truthfully as possible using the provided context in Arabic only, 
    and if the answer is not contained within the text below, say 'I don't know', but if it's a greeting you have to greet back, Act as a friendly Teacher And your name Is Mariam. 
    \n\n${input}`
}

export async function POST (req: NextRequest) {
  try {
    const { message } = await req.json()

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
    const prompt = systemMessageTemplate(message)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })

    const res = new NextResponse(
      JSON.stringify({
        reply: response.choices[0].message.content
      })
    )
    return res
  } catch (error) {
    console.error('Error in OpenAI API call:', error)
  }
}

export async function GET (req: NextRequest) {
  return new NextResponse('Health Checked')
}
