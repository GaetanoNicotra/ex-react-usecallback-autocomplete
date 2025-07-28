import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash';

function App() {

  // variabili di stato
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  const [details, setDetails] = useState(null)

  // funzione per recuperare i risultati
  // ottimizata con useCallback() e debounce
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

  // funzione per caricare i dettagli
  const recuperoDettagli = async (id) => {
    try {
      const res = await fetch(`http://localhost:3333/products/${id}`)
      const data = await res.json()
      setDetails(data)
      setResults([])
    } catch (error) {
      console.error(error)
    }

  }

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
              <p className='nome ms-3 mt-3 text-white' onClick={() => recuperoDettagli(q.id)}>{q.name}</p>
            </div>
          })}
        </div>
        {details && (
          <div className="card mt-5 p-3">
            <h4>{details.name}</h4>
            <h5>{details.brand}</h5>
            <img src={details.image} alt="img-prodotto" />
            <h6>{details.price} &#8364;</h6>
            <p>Color: {details.color}</p>
            <p>{details.description}</p>
            <p>Vote: {details.rating}</p>
          </div>
        )}
      </main>
    </>
  )
}

export default App
