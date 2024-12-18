export const getLocaleDate = (date: Date = new Date()) => {
  const actualDate = new Date(date)
  const year = actualDate.getFullYear()
  const month = actualDate.getMonth()
  const day = actualDate.getDate()
  return [year, month, day]
}

export const getActualDateStr = (date: Date = new Date()) => {
  const [year, month, day] = getLocaleDate(date)
  const monthStr = (month + 1) < 10 ? "0" + (month + 1) : (month + 1).toString()
  const dayStr = day < 10 ? "0" + day : day.toString()
  return year.toString() + "-" + monthStr + "-" + dayStr

}