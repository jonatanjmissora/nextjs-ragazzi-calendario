export const getFullYearOf = (date: string) => {
    const [year, month, day] = date.split("-")
    const fromDate = `${Number(year)-1}-${month}-01`
    const toDate = `${year}-${month}-${day}`
    return [fromDate, toDate]
  }