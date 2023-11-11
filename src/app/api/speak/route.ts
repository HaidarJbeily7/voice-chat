import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import util from 'util'

export async function POST (req: NextRequest) {
  try {
    const { text } = await req.json()
    const credential = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
    )

    const client = new TextToSpeechClient({
      projectId: credential.projectId,
      credentials: {
        client_email: credential.client_email,
        private_key: credential.private_key
      }
    })

    const request = {
      input: { text: text },
      voice: { languageCode: 'ar-XA', ssmlGender: 2 },
      audioConfig: { audioEncoding: 2 }
    }

    const [response] = await client.synthesizeSpeech(request)
    const writeFile = util.promisify(fs.writeFile)
    await writeFile('public/output.mp3', response.audioContent!, 'binary')

    const res = new NextResponse(JSON.stringify({ audioUrl: '/output.mp3' }))
    return res
  } catch (error) {
    console.error('Error:', error)
  }
}
