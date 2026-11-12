export function getErrorMessage(
  error,
  fallback = 'Something went wrong. Please try again.'
) {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.request) {
    return 'Cannot reach the server. Check your connection and try again.'
  }

  return error?.message || fallback
}