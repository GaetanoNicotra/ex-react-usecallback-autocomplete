import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash';

function App() {

  // variabili di stato
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  // funzione per recuperare i risultati
  const getData = useCallback(debounce((query) => {
    if (!query) {
      setResults([])
      return
    }
    {
      fetch(`http://localhost:3333/products?search=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
    }

  }, 500), [])

  // caricamento risultati di ricerca
  useEffect(() => {
    getData(query)
  }, [query, getData]);

  return (
    <>
      <header className='text-center bg-info-subtle p-4 mb-4'><h1>EX - Autocomplete</h1></header>
      <main className='container'>
        <h2 className='mb-3'>Cerca qui quello che desideri</h2>
        <input className='mb-4' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className='dropdown'>
          {results && results.map((q) => {
            return <div key={q.id}>
              <p>{q.name}</p>
              <hr />
              <details> <summary>Dettagli prodotto</summary>
                {q.price}&#8364;
              </details>
            </div>
          })}
        </div>
      </main>
    </>
  )
}

export default App
