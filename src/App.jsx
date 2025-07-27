import { useState, useEffect } from 'react'


function App() {

  // variabili di stato
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  // caricamento risultati di ricerca
  useEffect(() => {
    if (!query) {
      {
        setResults([])
        return
      }
    }

    {

      fetch(`http://localhost:3333/products?search=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
    }
  }, [query])


  return (
    <>
      <header>EX - Autocomplete</header>
      <main>
        <h2>Cerca qui quello che desideri</h2>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          {results && results.map((q) => {
            return <div className='dropdown'>
              <p key={q.id}>{q.name} prezzo = {q.price}</p>
              <img src={q.image} alt="img-product" />
            </div>

          })}
        </div>
      </main>
    </>
  )
}

export default App
