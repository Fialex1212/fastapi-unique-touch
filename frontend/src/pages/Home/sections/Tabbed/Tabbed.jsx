import { useState } from 'react'

import tabbedContent from './../../../../data/tabbedContent'
import Btn from './../../../../components/UI/Btn/Btn'
import Heading from './../../../../components/Heading'

import css from './Tabbed.module.css'

const Tabbed = () => {
	const [activeTab, setActiveTab] = useState('reflexology'),
		changeActiveTab = (tab) => () => setActiveTab(tab)

	return <section className={css.tabbed__section}>
		<div className='content__wrapper'>
			<div className={css.tabbed_tabs}>
				<Btn classes={`btn-accept ${activeTab === 'reflexology' ? 'active' : ''}`}
					func={changeActiveTab('reflexology')}>
					Reflexology
				</Btn>
				<Btn classes={`btn-accept ${activeTab === 'nutrition' ? 'active' : ''}`}
					func={changeActiveTab('nutrition')}>
					Nutrition
				</Btn>
				<Btn classes='btn-accept btn-disabled'>Disabled</Btn>
			</div>
			<div className={css.tabbed_content}>
				<div><img src={tabbedContent[activeTab].imgSrc}/></div>
				<div>
					<div className={css.content_heading}>
						<Heading size='large'>{tabbedContent[activeTab].heading.title}</Heading>
						<p>{tabbedContent[activeTab].heading.content}</p>
					</div>
					{tabbedContent[activeTab].points.map(({title, content}, i) => {
						return <div className={css.content_point} key={`point_${title + i}`}>
							<Heading size='large'>{title}</Heading>
							<p>{content}</p>
						</div>
					})}
				</div>
			</div>
		</div>
	</section>
}

export default Tabbed