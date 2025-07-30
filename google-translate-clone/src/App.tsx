import { Select } from "./components/Select"
import { TextArea } from "./components/TextArea"
import { InvertSvg } from "./assets/Logos"

import './styles/App.css'
import useTranslator from "./hooks/useTranslate"
import { useEffect } from "react"


function App() {

  const {
    dispatchInterchange,
    dispatchSetFromText,
    dispatchSetFromLanguage,
    dispatchSetToLanguage,
    dispatchTranslate,
    textTranslated,
    fromLanguage,
    toLanguage,
    textToTranslate,
    loading, 
    setLoading

  } = useTranslator()

  useEffect(() => {
    if (textToTranslate === ''){
      dispatchSetFromText({text: ''})
      dispatchTranslate({text: ''})
      return
    }

    dispatchTranslate({text: textToTranslate})
  }, [fromLanguage, toLanguage, textToTranslate])



  return (
    <div>
      <h2>Clone Google Translator</h2>
      <div className="mainContainer">
        <div>
          <Select
            isFromLanguage={true}
            updateLanguage={dispatchSetFromLanguage}
            toLanguage={fromLanguage}
          />
          <TextArea
            placeholder="Escribe el texto a traducir"
            setText={dispatchSetFromText}
            isTranslator={true}
            value={textToTranslate}
            setLoading={setLoading}
          />
        </div>
        <div className="interchange">
          <button onClick={() => dispatchInterchange()}>{InvertSvg}</button>
        </div>
        <div>
          <Select
            isFromLanguage={false}
            updateLanguage={dispatchSetToLanguage}
            toLanguage={toLanguage}
          />
          <TextArea
            placeholder="Texto traducido aparecerá aquí."
            isTranslator={false}
            value={textTranslated}
            loading={loading}

          />
        </div>
      </div>
    </div>
  )
}

export default App
