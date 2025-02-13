export const getFullYearOf = (date: string) => {
    const [year, month] = date.split("-")
    const fromDate = `${Number(year)-1}-${month}-01`
    const toDate = `${year}-${month}-01`
    return [fromDate, toDate]
  }