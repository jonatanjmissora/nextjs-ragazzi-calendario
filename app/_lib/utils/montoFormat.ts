export default function montoFormat(value: number | string): string {
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0 }).format(Number(value))
}