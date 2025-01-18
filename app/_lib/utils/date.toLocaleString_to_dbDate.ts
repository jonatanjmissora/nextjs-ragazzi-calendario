export const localeStringToDBDate = (localeDate: string) => {
  let [day, month, year] = localeDate.split("/")
  day = Number(day) < 10 ? "0" + day : day
  month = Number(month) < 10 ? "0" + month : day
  return year + "-" + month + "-" + day
}