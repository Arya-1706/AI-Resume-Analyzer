export default function FullPageLoader({ message = 'Loading...' }) {
  return (
    <main className='loading-screen'>
      <h1>{message}</h1>
    </main>
  )
}