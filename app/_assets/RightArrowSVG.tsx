export default function RightArrowSVG({ className, currentColor }: { className?: string, currentColor?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={currentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`rotate-90 ${className}`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
  )
}