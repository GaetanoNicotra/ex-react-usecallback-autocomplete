import { useState, useEffect } from 'react'


function App() {

  // variabili di stato
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  // caricamento risultati di ricerca
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    {
      fetch(`http://localhost:3333/products?search=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
    }
  }, [query])

  return (
    <>
      <header className='text-center bg-info-subtle p-4 mb-4'><h1>EX - Autocomplete</h1></header>
      <main className='container'>
        <h2 className='mb-3'>Cerca qui quello che desideri</h2>
        <input className='mb-4' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className='dropdown'>
          {results && results.map((q) => {
            return <div >
              <p key={q.id}>{q.name} prezzo = {q.price}</p>

            </div>
          })}
        </div>
      </main>
    </>
  )
}

export default App
