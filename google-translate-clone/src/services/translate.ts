import type { FromLanguage, LanguagesType, TranslationResponseType } from "../types"

const BASE_URL = 'https://lingva.ml/api/v1'

interface Props {
    text: string
    from: FromLanguage
    to: LanguagesType
}

export const Translate = async ({text, from, to} : Props) : Promise<TranslationResponseType | undefined> => {

    const textEncoded = encodeURIComponent(text)

    const response = await fetch(`${BASE_URL}/${from}/${to}/${textEncoded}`)

    if (!response.ok)
        return undefined

    const json = await response.json() as TranslationResponseType

    return json

}