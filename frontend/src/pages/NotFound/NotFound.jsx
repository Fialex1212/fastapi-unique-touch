import { useLocation } from 'react-router-dom'

import Heading from '../../components/Heading'
import Btn from '../../components/UI/Btn/Btn'
import CommonHero from '../../components/sections/CommonHero/CommonHero'

const NotFound = () => {
    const { pathname } = useLocation()
    return <>
        <CommonHero content={{
            title: '404 Not Found',
            subtitle: `Page ${pathname} was not found`
        }}/>
        <section style={{
            paddingBlock: '6dvh',
            textAlign: 'center',
            display: 'grid',
            placeItems: 'center',
            gap: '1rem'
        }}>
            <div className="font-accent-low">
                <Heading size="large">Seems, this page doesn't exist</Heading>
                <p>Would you like to return to the Home page instead?</p>
            </div>
            <Btn classes="btn-black" link="/#">Back Home</Btn>
        </section>
    </>
}

export default NotFound