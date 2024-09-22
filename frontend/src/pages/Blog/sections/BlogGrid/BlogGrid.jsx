import { HashLink as Link } from 'react-router-hash-link'
import Btn from '../../../../components/UI/Btn/Btn'
import Heading from '../../../../components/Heading'
import Icon from '../../../../components/UI/Icon/Icon'

import css from './BlogGrid.module.css'

const BlogGrid = () => {
    // Requesting the data
    return <section className={css.blog__section}>
        <div className="content__wrapper">
            <div><Heading size="massive">All posts</Heading></div>
            <div className={css.blog_posts}>
                {[...Array(3)].map((e, i) => {
                    return (
                        // Must be "post.id" instead of "i"
                        <Link to={`./${i}`} key={`post_key_id_${i}`}>
                            <div className={css.blog_post}>
                                <div>
                                    <img src="https://img2.woyaogexing.com/2019/10/22/c4041465a2c8466da8f4fd946e5f5880!400x400.jpeg" alt="" />
                                </div>
                                <div>
                                    <div>
                                        <div><span>March, 31, 2024</span></div>
                                        <Heading size="large">Random title</Heading>
                                    </div>
                                    <div>
                                        <Btn classes="btn-none" link="">
                                            <Icon id="message"/>
                                            <span>(4) Comment</span>
                                        </Btn>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className={css.blog_pages}>
                <div><Btn classes="btn-accept">1</Btn></div>
                <div><Btn classes="btn-accept btn-disabled">2</Btn></div>
                <div><Btn classes="btn-accept btn-disabled">...</Btn></div>
            </div>
        </div>
    </section>
}

export default BlogGrid