import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import css from './Post.module.css'
import Heading from '../../components/Heading'

const Post = () => {
    const { postId } = useParams()
    
    const getPost = async (postId) => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        return data
    }
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts', postId],
        queryFn: () => getPost(postId),
        onSuccess: () => {console.log(111)}
    })

    if (isLoading) return <>Loading...</>
    if (error) return console.error(error)
    
    return <section className={css.post__section}>
        <div className="content__wrapper">
            <Heading size="massive">{data.title}</Heading>
            <p>{data.body}</p>
            <br/>
            <span>This is the post with an id being {postId}</span>
        </div>
    </section>
}

export default Post