export default function InfoBox({ type = 'blue', children }) {
  return (
    <div className={`info-box info-${type}`}>
      {children}
    </div>
  )
}