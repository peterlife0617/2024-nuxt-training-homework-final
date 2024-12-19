export async function getApiData<T extends any[]>(requests: { [K in keyof T]: Promise<T[K]> }) {
  const responses = await Promise.allSettled(requests)
  return responses.map(response => (response.status === 'fulfilled' ? response.value : null)) as { [K in keyof T]: T[K] | null }
}
