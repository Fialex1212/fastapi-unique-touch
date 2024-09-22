import Btn from '../../UI/Btn/Btn'
import Heading from '../../Heading'

import css from './FAQ.module.css'

const FAQ = (data) => {
	return <section className={css.FAQ__section}>
		<div className='content__wrapper'>
			<div><Heading size='massive'>Frequently asked questions</Heading></div>
			<div className={css.FAQ_list}>
				{[...Array(4)].map((elem, i) => {
					return <div className={css.list__item} key={`FAQ_question_${i}`}>
						<input type='checkbox' id={`FAQ_question_${i}`} defaultChecked={i === 1}/>
						<label htmlFor={`FAQ_question_${i}`}>
							<Heading size='large'>[Custom Question]?</Heading>
							<p>[Obviously, custom response goes here as soon as menu is dropped]</p>
						</label>
					</div>
				})}
			</div>
			<Btn classes='btn-none'>View all...</Btn>
		</div>
	</section>
}

export default FAQ