import { useEffect, useRef } from 'react'
import { createOverlay } from '../../../utils/createOverlay'

import Btn from '../../UI/Btn/Btn'

import css from './Modal.module.css'

const Modal = ({ element, isOpen, setOpen }) => {
    const modalRef = useRef(null)
    
    useEffect(() => {
        const setModal = (event) => {
            event.target.contains(modalRef.current)
                && event.target !== modalRef.current
                    && setOpen(false)
        }

        window.addEventListener('click', setModal)
        return () => { window.addEventListener('click', setModal) }
    }, [])

    return isOpen
        ? createOverlay(
            <div ref={modalRef} className={css.modal__overlay}>
                {element}
                <Btn classes='btn-none' func={() => {setOpen(false)}}>
                    <span>&#10005;</span>
                </Btn>
            </div>
        ) : null
}

export default Modal