import Groq from 'groq-sdk'

import { NextResponse } from 'next/server'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const { message } = body

    if (!message) {

      return NextResponse.json(
        {
          error: 'Message requis',
        },
        {
          status: 400,
        }
      )
    }

    const completion =
      await groq.chat.completions.create({

        model: 'llama-3.3-70b-versatile',

        messages: [
          {
            role: 'system',

            content: `
            Tu es GuidePFE AI,
            un assistant académique premium spécialisé en :

            - méthodologie de recherche
            - rédaction académique
            - mémoire
            - PFE
            - soutenance
            - CV ATS
            - organisation universitaire
            - recherche scientifique

            Réponds toujours :
            - clairement
            - professionnellement
            - avec structure
            - en français
            `,
          },

          {
            role: 'user',
            content: message,
          },
        ],

        temperature: 0.7,

        max_tokens: 2048,
      })

    return NextResponse.json({
      response:
        completion.choices[0]?.message?.content,
    })

  } catch (error: any) {

    console.log(error)

    return NextResponse.json(
      {
        error: 'Erreur IA',
      },
      {
        status: 500,
      }
    )
  }
}