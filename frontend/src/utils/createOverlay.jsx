import { createPortal } from 'react-dom'

const overlaysMountElement = document.getElementById('overlays')

export const createOverlay = (element) => {
    element ||= null
    if (element) {
        return createPortal(
            <div>{element}</div>,
            overlaysMountElement
        )
    }
}