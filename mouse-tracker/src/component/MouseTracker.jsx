import { useEffect } from "react"
import { useState } from "react"

function MouseTracker() {

    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        
        const moving = (event) => {
            const { clientX, clientY } = event
            setPosition({x: clientX, y: clientY})
        }

        if (enabled) {
            window.addEventListener('pointermove', moving)
        }

        return () => {
            window.removeEventListener('pointermove', moving)
        }

    }, [enabled])

    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #fff',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -25,
                top: -25,
                width: 50,
                height: 50,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
            />
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'Desactivar' : 'Activar'} seguir puntero
            </button>
        </>
    )

}

export default MouseTracker