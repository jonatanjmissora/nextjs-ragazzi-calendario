export default function montoFormat(value: number) {
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0 }).format(value)
}