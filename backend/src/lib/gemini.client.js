const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const env = require('../config/env')
const ApiError = require('../utils/ApiError')

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_GENAI_API_KEY })

// Retry with another model for quota, server or availability errors.
const RETRYABLE_STATUSES = [404, 429, 500, 503]

function toApiError(error) {
  const status = error?.status

  if (status === 429) {
    return new ApiError(
      429,
      'The AI usage limit was reached. Please try again in a few minutes.',
    )
  }

  if (status === 503) {
    return ApiError.badGateway(
      'The AI service is busy right now. Please try again in a moment.',
    )
  }

  return ApiError.badGateway('The AI service failed. Please try again.')
}

async function generateWithFallback({
  prompt,
  systemInstruction,
  jsonSchema,
}) {
  let lastError

  for (const model of env.GEMINI_MODELS) {
    try {
      return await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseJsonSchema: jsonSchema,
        },
      })
    } catch (error) {
      lastError = error

      console.error(
        `Gemini model ${model} failed (status ${error?.status ?? 'unknown'}):`,
        error?.message,
      )

      if (!RETRYABLE_STATUSES.includes(error?.status)) break
    }
  }

  throw toApiError(lastError)
}

/**
 * Calls Gemini and returns data that is guaranteed to match `schema`.
 */
async function generateStructured({ prompt, systemInstruction, schema }) {
  const jsonSchema = z.toJSONSchema(schema)
  delete jsonSchema.$schema

  const response = await generateWithFallback({
    prompt,
    systemInstruction,
    jsonSchema,
  })

  let json

  try {
    json = JSON.parse(response.text)
  } catch {
    throw ApiError.badGateway(
      'The AI returned an unreadable response. Please try again.',
    )
  }

  const result = schema.safeParse(json)

  if (!result.success) {
    console.error(
      'Gemini response failed validation:',
      z.prettifyError(result.error),
    )

    throw ApiError.badGateway(
      'The AI returned an incomplete response. Please try again.',
    )
  }

  return result.data
}

module.exports = { generateStructured }