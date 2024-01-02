export const hexMatcher = /^#([\da-f]{3,8})$/i

export const format = (number: number): string => {
  const hex = number.toString(16)
  return hex.length < 2 ? '0' + hex : hex
}
