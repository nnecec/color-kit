export const getHueBackground = () => {
  return Object.fromEntries(Array.from({ length: 10 }).map((_, index) => [index * 10, index * 40]))
}
