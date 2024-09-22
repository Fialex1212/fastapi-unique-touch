import { useState } from 'react'

import Btn from '../../../components/UI/Btn/Btn'
import data from '../../../data/galleryContent'
import Heading from '../../../components/Heading'

import css from './Content.module.css'

const Content = () => {
    const [currentImg, setCurrentImg] = useState(null),
        closeImg = (elem) => elem.target?.src !== currentImg && setCurrentImg(null)
    
    return <section className={css.content__section}>
        {
            currentImg ? (
                <div onClick={(elem) => { closeImg(elem) }}
                       className='fullScreenImg__overlay'>
                    <img src={currentImg} alt={`Full Screen Img: ${currentImg}`}/>
                </div>
            ) : null
        }

        <div className="content__wrapper">
            <Heading size="massive">Our Gallery</Heading>
            <div className={css.content_gallery}>
                {data.map((src, i) => {
                    return <div onClick={() => {setCurrentImg(src)}} key={`content_img_${i}`}>
                        <img src={src} alt={`Gallery image ${i + 1}`}/>
                    </div>
                })}
            </div>
            <Btn classes="btn-accept">Load more</Btn>
        </div>
    </section>
}

export default Content