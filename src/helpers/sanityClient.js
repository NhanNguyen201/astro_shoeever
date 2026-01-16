import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: '2025-12-12',
    useCdn: false,
    ignoreBrowserTokenWarning: true
})

export const writeClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: '2025-12-12',
    token: import.meta.env.VITE_SANITY_DEV_KEY,
    useCdn: false,
    ignoreBrowserTokenWarning: true
  })
  
const builder = createImageUrlBuilder(client)

export const urlFor = source => builder.image(source)
