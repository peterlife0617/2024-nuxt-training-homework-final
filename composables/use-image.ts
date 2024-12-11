export function useImage() {
  const { app: {
    baseURL,
  } } = useRuntimeConfig()

  const assetsImages: Record<string, string> = import.meta.glob('@/assets/images/**/*', { eager: true, import: 'default' })
  const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, '')

  const publicImage = (url: string) => `${normalizeBaseUrl(baseURL)}${url}`
  const assetImage = (url: string) => {
    const key = Object.keys(assetsImages).find(key => key.includes(url))
    return key ? assetsImages[key] : ''
  }

  return {
    publicImage,
    assetImage,
  }
}
