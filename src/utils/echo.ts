const urlParams = new URLSearchParams(window.location.search)

export const debugEcho = (key: string, message: any, query = 'debugUserProfile') => {
  if (urlParams.has(query)) console.log(key, message)
}
