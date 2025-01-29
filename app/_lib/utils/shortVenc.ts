export const shortVenc = (date: string) => {

  const [, month, day] = date.split("-")
  return day + "/" + month

}