import { useEffect, useState } from "react"



function App() {

  const [fact, setFact] = useState('')
  const firstWord = fact.substring(0, fact.indexOf(' ', 0))
  const photoLink = `https://cataas.com/cat/says/${firstWord}`

  const loadPhoto = () => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(response => setFact(response?.fact))
      .catch(error => console.log(error))

  }

  useEffect(() => {
    loadPhoto()
  }, [])

  return (
    <>
      <div style={{
        width: "800px",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        textAlign: "center"
      }}>
        <div style={{
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img
            src={photoLink}
            alt={fact}
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        </div>
        <span>{fact}</span>
        <button onClick={loadPhoto}>Generate Again</button>
      </div>
    </>
  )
}

export default App
