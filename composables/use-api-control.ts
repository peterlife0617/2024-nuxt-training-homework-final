export function useApiControl<TParams extends any[], TReturn>(
  handler: (...args: TParams) => Promise<TReturn>,
) {
  const pending = ref(false)

  const execute = async (...args: TParams): Promise<TReturn> => {
    pending.value = true
    try {
      const result = await handler(...args)

      return result
    }
    finally {
      pending.value = false
    }
  }

  return {
    pending,
    execute,
  }
}
