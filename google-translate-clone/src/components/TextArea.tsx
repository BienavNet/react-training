import debounce from "just-debounce-it"
import { useCallback, useState } from "react"
import '../styles/TextArea.css'

interface isTranslatorProps {
    placeholder: string
    setText: ({ text }: { text: string }) => void
    isTranslator: true
    value: string
    setLoading: (loading: boolean) => void
}

interface isNotTranslatorProps {
    placeholder: string
    isTranslator: false
    value: string
    loading: boolean,

}

type Props = isTranslatorProps | isNotTranslatorProps


export const TextArea: React.FC<Props> = (Props) => {

    const [text, setText] = useState<string>(Props.value)

    const handleDebounce = useCallback(
        debounce((newText: string) => {
            if (!Props.isTranslator)
                return
            Props.setText({ text: newText })
        }, 500)
    , [Props.value])

    const handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const newText = e.target.value

        if (newText === '' && Props.isTranslator)
            Props.setLoading(false)

        if (newText !== '' && Props.isTranslator)
            Props.setLoading(true)
        setText(newText)
        handleDebounce(newText)
    }

    const handlePlaceholder = () : string => {
        if (Props.isTranslator)
            return Props.placeholder
        return Props.loading ? "Loading..." : "Traducir texto"
    }

    const handleValue = () : string => {
        if (Props.isTranslator)
            return text

        if (!Props.loading)
            return Props.value

        return text !== '' ? Props.value : ""

        // return Props.loading ? '' : Props.value
    }

    return (
        <>
            <textarea
                disabled={!Props.isTranslator}
                placeholder={handlePlaceholder()}
                value={handleValue()}
                onChange={handleOnChange}
            >
            </textarea>
        </>
    )
}