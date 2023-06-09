import { vector } from 'vellma'
import { type ApiEmbeddingConfig, embedding as embeddingApi } from '../api'

export type EmbeddingConfig = Omit<ApiEmbeddingConfig, 'input' | 'user'> & {
  text: string,
  userId?: string,
}

export const embedding = async (config: EmbeddingConfig) => {
  const { text: input, userId: user } = config
  const { json: { data: [{ embedding }] } } = await embeddingApi({ ...config, input, user })

  return vector({
    embedding,
    embeddingSource: input,
    modelId: config.model ?? 'text-embedding-ada-002',
  })
}
