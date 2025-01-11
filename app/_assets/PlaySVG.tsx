export default function PlaySVG({ className, currentColor }: { className?: string, currentColor?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={currentColor} className={className}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" /></svg>
  )
}