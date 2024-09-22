import servicesContent from './../../../../../src/data/servicesContent'
import Heading from './../../../../../src/components/Heading'

import css from './Services.module.css'

const Services = () => {
	return <section className={css.services__section} id='services'>
		<div className='content__wrapper'>
			<div><Heading size='massive'>Our Services</Heading></div>
			<div className={css.services__list}>
				{servicesContent.map((elem, i) => {
					return <div key={`service_${i}__block`}>
						<div></div>
						<div>
							<Heading size='large'>{elem.title}</Heading>
							<p>{elem.body}</p>
						</div>
					</div>
				})}
			</div>
		</div>
	</section>
}

export default Services