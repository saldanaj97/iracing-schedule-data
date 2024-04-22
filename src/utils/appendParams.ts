export const appendParams = (URL: string, params: { [paramName: string]: any }) => {
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue !== undefined) {
      URL += `&${paramName}=${paramValue}`
    }
  })
  return URL
}
