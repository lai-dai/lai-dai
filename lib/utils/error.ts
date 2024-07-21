export const getErrorMessage = (error?: any, defaultValue = 'Error') => {
  if (!error) return defaultValue

  let result

  switch (typeof error) {
    case 'object':
      if (error?.isAxiosError === true) {
        result =
          error?.response?.data?.error?.message ||
          error?.response?.data?.data?.message ||
          error?.response?.data?.message ||
          error?.message
      } else {
        result = error?.error?.message || error?.data?.message || error?.message
      }
      break

    case 'string':
      result = error
      break
  }

  return result || defaultValue
}
