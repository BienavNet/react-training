import { initialState, translateReducer } from "../reducer/TranslateReducer";
import { useReducer, useState } from "react";
import { Translate } from "../services/translate";
import type { FromLanguage, LanguagesType } from "../types";


export default function useTranslator() {
    const [state, dispatch] = useReducer(translateReducer, initialState)
    const [loading, setLoading] = useState<boolean>(state.textToTranslate !== '')

    const dispatchInterchange = () => {
        dispatch({
            type: "INTERCHANGE",
            payload: undefined
        })
    }

    const dispatchTranslate = ({ text }: { text: string }) => {

        const fromLanguage = state.fromLanguage === 'auto' ? 'es' : state.fromLanguage

        if (text === '') {
            dispatch({
                type: "TRANSLATE",
                payload: ''
            })
            return
        }

        setLoading(true)
        Translate({ text: text, from: fromLanguage, to: state.toLanguage })
            .then(res => {
                if (res === undefined)
                    return
                dispatch({
                    type: "TRANSLATE",
                    payload: res.translation
                })
            }).finally(() => setLoading(false))
    }

    const dispatchSetFromText = ({ text }: { text: string }) => {
        dispatch({
            type: "SET_FROM_TEXT",
            payload: text
        })
    }

    const dispatchSetFromLanguage = ({ newLanguage }: { newLanguage: FromLanguage }) => {
        dispatch({
            type: "SET_FROM_LANGUAGE",
            payload: newLanguage
        })
    }

    const dispatchSetToLanguage = ({ newLanguage }: { newLanguage: LanguagesType }) => {
        dispatch({
            type: "SET_TO_LANGUAGE",
            payload: newLanguage
        })
    }

    return {
        dispatchInterchange,
        dispatchSetFromLanguage,
        dispatchSetFromText,
        dispatchSetToLanguage,
        dispatchTranslate,
        fromLanguage: state.fromLanguage,
        toLanguage: state.toLanguage,
        textTranslated: state.textTranslated,
        textToTranslate: state.textToTranslate,
        loading,
        setLoading
    }

}


