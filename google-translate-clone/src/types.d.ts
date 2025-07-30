import { Languages } from "./constants"

export type LanguagesType = keyof typeof Languages

export type FromLanguage = LanguagesType | 'auto'

export interface TranslationResponseType {
    translation: string
    info: {
        pronunciation: {}
        definitions: []
        examples: []
        similar: []
        extraTranslations: []
    }
}