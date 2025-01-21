export const localeStringToDBDate = (localeDate: string) => {
  const [day, month, year] = localeDate.split("/")
  const dayX = Number(day) < 10 ? "0" + day : day
  const monthX = Number(month) < 10 ? "0" + month : day
  return year + "-" + monthX + "-" + dayX
}