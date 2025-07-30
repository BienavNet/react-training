import type React from "react"
import { Languages } from "../constants"
import type { LanguagesType, FromLanguage } from "../types"
import '../styles/Select.css'

interface PropsFromLanguage {
    isFromLanguage: true
    updateLanguage: ({ newLanguage }: { newLanguage: FromLanguage }) => void
    toLanguage: FromLanguage
}

interface PropsToLanguage {
    isFromLanguage: false
    updateLanguage: ({ newLanguage }: { newLanguage: LanguagesType }) => void
    toLanguage: LanguagesType
}


type Props = PropsFromLanguage | PropsToLanguage


export const Select: React.FC<Props> = ({ isFromLanguage, updateLanguage, toLanguage }) => {

    const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {

        const newLanguage = e.target.value

        if (isFromLanguage) {
            updateLanguage({ newLanguage: newLanguage as FromLanguage })
            return
        }

        updateLanguage({ newLanguage: newLanguage as LanguagesType })
    }

    return (
        <select
            aria-label="Selecciona el idioma"
            name="languageSelect"
            id="languageSelect"
            onChange={handleOnChange}
            defaultValue={toLanguage}
        >
            {isFromLanguage && <option value="auto">Detectar idioma</option>}
            {Object.entries(Languages).map(value => (
                <option selected={value[0] === toLanguage} key={value[0]} value={value[0]}>{value[1]}</option>
            ))}
        </select>
    )
}