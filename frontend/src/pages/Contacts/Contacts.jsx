import CommonHero from '../../components/sections/CommonHero/CommonHero'
import Content from './Content/Content'

const Contacts = () => {
    return <>
        <CommonHero content={{
            title: 'Our Contacts',
            subtitle: 'Got some questions? Contact us!'
        }}/>
        <Content/>
    </>
}

export default Contacts