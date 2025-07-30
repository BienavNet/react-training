import type { FromLanguage, LanguagesType } from "../types"


const ACTIONS = {
    INTERCHANGE: 'INTERCHANGE',
    TRANSLATE: 'TRANSLATE',
    SET_FROM_TEXT: 'SET_FROM_TEXT',
    // SET_TO_TEXT: 'SET_TO_TEXT',
    SET_FROM_LANGUAGE: 'SET_FROM_LANGUAGE',
    SET_TO_LANGUAGE: 'SET_TO_LANGUAGE'
}

type ActionType = keyof typeof ACTIONS


interface State {
    fromLanguage: FromLanguage
    toLanguage: LanguagesType
    textToTranslate: string
    textTranslated: string
}

interface Action {
    type: ActionType, 
    payload: string | LanguagesType | undefined
}

export const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    textToTranslate: '',
    textTranslated: ''
}




const DO_ACTION = {
    [ACTIONS.INTERCHANGE]: (state: State, _ : Action): State => {

        if (state.fromLanguage === 'auto')
            return {
                ...state
            }
        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage,
            textToTranslate: state.textTranslated,
            textTranslated: state.textToTranslate
        }
    }, 
    [ACTIONS.TRANSLATE]: (state: State, action: Action): State => {

        if (!action.payload)
            return {
                ...state,
                textTranslated: ''
            }

        return {
            ...state,
            textTranslated: action.payload
        }
    }, 
    [ACTIONS.SET_FROM_LANGUAGE]: (state: State, action: Action): State => {
        if (!action.payload)
            return {
                ...state
            }

        return {
            ...state,
            fromLanguage: action.payload as FromLanguage
        }
    }, 
    [ACTIONS.SET_TO_LANGUAGE]: (state: State, action: Action): State => {
        if (!action.payload)
            return {
                ...state
            }

        return {
            ...state, 
            toLanguage: action.payload as LanguagesType
        }
    }, 
    [ACTIONS.SET_FROM_TEXT]: (state: State, action: Action): State => {
        if (!action.payload)
            return {
                ...state,
                textToTranslate: ''
            }
        return {
            ...state, 
            textToTranslate: action.payload

        }
    }
}


export const translateReducer = (state: State, action: Action) : State => {
    const {type: actionType} = action
    const task = DO_ACTION[actionType]
    return task? task(state, action) : state
}