import Hero from '../../components/sections/CommonHero/CommonHero'
import BlogGrid from './sections/BlogGrid/BlogGrid'

const Blog = () => {
    return <>
        <Hero content={{
            title: 'Blog Grid',
            subtitle: 'Our posts and news'
        }}/>
        <BlogGrid/>
    </>
}

export default Blog