import sanityClient from '@sanity/client'

const SANITY_ID = import.meta.env.VITE_SANITY_ID
const SANITY_TOKEN = import.meta.env.VITE_SANITY_TOKEN

export const authorizedClient = sanityClient({
    projectId: SANITY_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    token: SANITY_TOKEN,
    useCdn: false
})