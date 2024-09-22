import { HashLink as Link } from 'react-router-hash-link'

import Icon from '../UI/Icon/Icon'
import Heading from '../Heading'
import css from './Footer.module.css'

const Footer = () => {
	const currentDate = new Date()
	return <footer className={css.footer__section}>
		<div className='content__wrapper'>
			<div>
				<div className={css.footer_description}>
					<Heading>Contact us</Heading>
					<p data-font-accent="medium"><Icon id="mail"/>email@example.com</p>
					<p data-font-accent="medium"><Icon id="phone"/>+1 1234 567 892</p>
					<p data-font-accent="medium"><Icon id="location"/>Direct address</p>
				</div>
				<div className={css.footer_description}>
					<Heading size="large">Final Title</Heading>
					<p data-font-accent="medium">Lorem ipsum dolor sit amet, consectetur adipscing elit Lorem ipsum dolor sit amet, consectetur adipscing elitLorem ipsum dolor sit amet, consectetur adipscing elitLorem ipsum dolor sit amet, consectetur adipscing elit</p>
				</div>
			</div>
			<hr/>
			<div className={css.footer_links}>
				<div>
					<Link to="/">Home</Link>
					<Link to="/#services">Services</Link>
					<Link to="/gallery">Gallery</Link>
					<Link to="">Contacts</Link>
					<Link to="/blog#">Blog</Link>
					<Link to="/#about">About</Link>
				</div>
				<div>
					<a href="https://instagram.com"><Icon id="instagram"/></a>
					<a href=""><Icon id="linkedin"/></a>
				</div>
			</div>
			<p data-font-accent="medium">&copy; {currentDate.getFullYear()} Unique Touch. All rights reserved.</p>
		</div>
	</footer>
}

export default Footer