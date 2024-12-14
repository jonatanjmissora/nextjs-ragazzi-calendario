export const localeStringToDBDate = (localeDate: string) => {
  const [day, month, year] = localeDate.split("/")
  return year + "-" + month + "-" + day
}