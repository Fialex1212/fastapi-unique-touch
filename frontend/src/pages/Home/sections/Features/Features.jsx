import Heading from './../../../../components/Heading'
import Btn from './../../../../components/UI/Btn/Btn'
import Icon from './../../../../components/UI/Icon/Icon'

import css from './Features.module.css'

const Features = () => {
	return <section className={css.features__section} id="about">
		<div className="content__wrapper">
			<div className={css.features_content}>
				<div><img src="https://i.pinimg.com/originals/77/ba/fa/77bafa02710c5c521262781157482e42.jpg"/></div>
				<div className={css.features_description}>
					<div>
						<Heading size="large">Simple title</Heading>
						<Heading>Sort of subheading</Heading>
					</div>
					<div>
						<p>Lorem ipsum dolor sit amet, consectetur adip, amet, consectetur adip, amet, consectetur adip</p>
					</div>
					<div>
						<ul>
							<li>
								<Icon id="location"/>
								<span>First list item</span>
							</li>
							<li>
								<Icon id="location"/>
								<span>Fourth list item 4 description</span>
							</li>
						</ul>
					</div>
					<Btn classes="btn-accept">See more</Btn>
				</div>
			</div>
			<div className={css.features_posts}>
				<div className={css.posts__headline}>
					<Heading size="large">Latest Posts</Heading>
					<Btn classes="btn-none" link="/blog#">View more</Btn>
				</div>
				<div className={css.posts__container}>
					{[...Array(5)].map((e, i) => {
						return <div className={css.posts__post} key={`post_${i}`}>
							<div><img src="https://i.pinimg.com/736x/8e/1c/90/8e1c90beb54d8c439adf6c54ebd4ee4d.jpg"/></div>
							<div>
								<Heading size="large">Reached Milestone of 600m Visitors!</Heading>
								<p>basic description lorem ipsum dolor sit amet, consectetur adip</p>
							</div>
						</div>
					})}
				</div>
			</div>
		</div>
	</section>
}

export default Features