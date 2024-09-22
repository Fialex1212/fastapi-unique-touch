import CommonHero from '../../components/sections/CommonHero/CommonHero'
import Content from './Content/Content'

const Gallery = () => {
    return <>
        <CommonHero content={{
            title: 'Gallery',
            subtitle: 'Variety of our photos'
        }}/>
       <Content/>
    </>
}

export default Gallery