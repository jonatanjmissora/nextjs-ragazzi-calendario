export const getFullMonthOf = (date: string) => {
  const [year, month] = date.split("-")
  const fromDate = `${year}-${month}-01`
  const lastDayOfMonth = new Date(Number(year), Number(month), 0).getDate()
  const toDate = `${year}-${month}-${lastDayOfMonth}`
  return [fromDate, toDate]
}