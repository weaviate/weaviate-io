export const numToThousands = (text: string) => {
  const num = parseInt(text)
  if (isNaN(num)) return text
  
  const thousands = Math.round(num / 1000)
  const formattedThousands = thousands >= 1000 ? thousands.toLocaleString() : thousands.toString()
  return `${formattedThousands}K`
}

export const addCommas = (text: string) => {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const addNumSize = (text: string) => {
  const num = parseInt(text)
  if (isNaN(num)) return text
  
  if (num >= 1000000) {
    const millions = Math.round(num / 1000000)
    return `${millions}MiB`
  }
  
  if (num >= 1000) {
    const thousands = Math.round(num / 1000)
    return `${thousands}KiB`
  }
  
  return text
}
