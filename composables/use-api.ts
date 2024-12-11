import { FetchError } from 'ofetch'
import { ref } from 'vue'

function handleError(error: unknown) {
  if (error instanceof FetchError) {
    console.error('FetchError:', error.message)
  }
  else {
    console.error('Unexpected error:', error)
  }
  throw error
}

export function useApi() {
  const isFetch = ref(false)

  const fetchData = <T extends (...args: any) => any>(handler: T): ReturnType<T> => {
    isFetch.value = true

    return handler().catch(handleError).finally(() => {
      isFetch.value = false
    })
  }

  return { isFetch, fetchData }
}
