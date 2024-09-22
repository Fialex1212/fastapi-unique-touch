import Heading from '../../Heading'

import css from './CommonHero.module.css'

const CommonHero = ({content, element}) => {
    const { title, subtitle } = content || {
        title: 'Page unavailable',
        subtitle: 'Page is currently under development'
    }
    
    element ||= null

    return <section className={css.hero__section}>
        <div className="content__wrapper">
            <div>
                {element ? element : (
                    <>
                        <Heading size="massive">{title}</Heading>
                        <p>{subtitle}</p>
                    </>
                )}
            </div>
        </div>
    </section>
}

export default CommonHero