export const getLocaleDate = (date: Date = new Date()) => {
    const actualDate = new Date(date)
    const year = actualDate.getFullYear()
    const month = actualDate.getMonth()
    const day = actualDate.getDate()
    return [year, month, day]
  }