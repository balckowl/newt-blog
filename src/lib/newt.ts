import 'server-only'
import { createClient } from 'newt-client-js'
import { cache } from 'react'
import { Article, Author, Category, Topic } from '@/types/article'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPosts = cache(async (query?: any) => {
  const data = await client.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
    ...query
  })

  return data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPost = cache(async (query?: any) => {
  const data = await client.getFirstContent<Article>({
    appUid: 'blog',
    modelUid: 'article',
    ...query
  })

  return data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTopics = cache(async (query?: any) => {
  const data = await client.getContents<Topic>({
    appUid: 'blog',
    modelUid: 'topic',
    ...query
  })

  return data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTopic = cache(async (query?: any) => {
  const data = await client.getFirstContent<Category>({
    appUid: 'blog',
    modelUid: 'topic',
    ...query
  })

  return data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategories = cache(async (query?: any) => {
  const data = await client.getContents<Category>({
    appUid: 'blog',
    modelUid: 'category',
    ...query
  })

  return data
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategory = cache(async (query?: any) => {
  const data = await client.getFirstContent<Category>({
    appUid: 'blog',
    modelUid: 'category',
    ...query
  })

  return data
})

export const getAuthors = cache(async () => {
  const { items } = await client.getContents<Author>({
    appUid: 'blog',
    modelUid: 'author'
  })

  return items
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAuthor = cache(async (query?: any) => {
  const data = await client.getFirstContent<Author>({
    appUid: 'blog',
    modelUid: 'author',
    ...query
  })

  return data
})

export const getRandomArticles = async (categoryId: string, ninArr: string[]) => {
  const data = await client.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      limit: 6,
      category: { in: [categoryId] },
      _id: {
        nin: ninArr
      }
    },
  })
  return data
}
