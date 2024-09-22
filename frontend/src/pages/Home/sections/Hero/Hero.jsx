import { useState, useEffect, useRef } from 'react'

import Heading from '../../../../components/Heading'
import Btn from '../../../../components/UI/Btn/Btn'

import slidesContent from '../../../../data/slidesContent'
import css from './Hero.module.css'

const Hero = () => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0),
		{ title, description, bgSrc } = slidesContent[currentSlideIndex],
		intervalRef = useRef(null)
		
	const handleIntervalReset = () => {
		intervalRef.current && clearInterval(intervalRef.current)
		intervalRef.current = setInterval(() => { handleSlideChange(1) }, 6000)
	}

	const handleSlideChange = (byIndex) => {
		handleIntervalReset()
		setCurrentSlideIndex(prev => {
	        return (prev + byIndex + slidesContent.length) % slidesContent.length
	    })
	}

	const setSlideByDot = (idx) => {
		handleIntervalReset()
		setCurrentSlideIndex(idx)
	}

	useEffect(() => {
		handleIntervalReset()
		return () => { intervalRef.current && clearInterval(intervalRef.current) }
	}, [])
	
	return <section className={css.hero__section} style={{
		background: `
			linear-gradient(180deg,
				transparent,
				rgb(var(--clr-dp-00))),
				url('${bgSrc}') no-repeat center/cover
			`
	}}>
		<div className='content__wrapper'>
			<div className={css.hero_container}>
				<div>
					<Heading size='massive'>{title}</Heading>
					<p>{description}</p>
				</div>

				<div><Btn link="/profile">Book now!</Btn></div>
			</div>
			<div className={css.control_points_container}>
				<ul>
					{slidesContent.map((elem, i) => {
						return <li onClick={() => setSlideByDot(i)}
								key={'hero_slider_control_item_' + i}>
							{currentSlideIndex === i
								? <>&#9679;</>
								: <>&#9675;</>
						}</li>
					})}
				</ul>
			</div>
		</div>
		<Btn func={() => {handleSlideChange(-1)}}
			 classes={`btn-none ${css.control_arrow_left}`}>
			&#10148;
		</Btn>
		<Btn classes={`btn-none ${css.control_arrow_right}`}
			 func={() => {handleSlideChange(1)}}>
			&#10148;
		</Btn>
	</section>
}

export default Hero