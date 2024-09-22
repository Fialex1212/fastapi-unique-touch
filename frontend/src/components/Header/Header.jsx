import {
	useRef,
	useState,
	useContext,
} from 'react'

import { userContext } from '../../contexts/userContext'

import { HashLink as Link } from 'react-router-hash-link'

import Icon from '../UI/Icon/Icon'
import Heading from '../Heading'
import Btn from '../UI/Btn/Btn'

import css from './Header.module.css'

const Header = () => {
	const { user } = useContext(userContext)
	
	const [isMenuOpened, setMenuOpen] = useState(false),
		menuRef = useRef(),
		handleMenuOpenChange = () => { setMenuOpen(menuRef.current.checked) }
	
	const handleMenuCollapse = (event) => {
		event.target.tagName === 'LI' || event.target.tagName === 'A'
			&& menuRef.current.click()
	}

	const headerList = (
			<ul className={css.header_list} onClick={handleMenuCollapse}>
				<li><Link to="/#">Home</Link></li>
				<li><Link to="/#services">Services</Link></li>
				<li><Link to="/gallery">Gallery</Link></li>
				<li><Link to="/contacts">Contacts</Link></li>
				<li><Link to="/blog">Blog</Link></li>
				<li><Link to="/#about">About</Link></li>
			</ul>
		)

	return (
		<header className={css.header}>
			<nav>
				<Link to="/">
					<Heading uppercase="true">Unique Touch</Heading>
				</Link>
				{ headerList }
				<div className={css.header_account}>
					{ user
						? <span>
							Hello, <Btn classes="btn-none" link="/profile">{ user?.username }</Btn>
						</span>
						: <Btn link="/auth">Sign Up</Btn> }
				</div>
			</nav>
			<nav className={css.header_dropdown}>
				<Link to="/">
					<Heading size="large">Unique Touch</Heading>
				</Link>
				<div>
					<input
						ref={menuRef}
						type="checkbox"
						id="dropdown_btn"
						onChange={handleMenuOpenChange}
					/>
					<label htmlFor="dropdown_btn">
						<Icon id={isMenuOpened ? 'cross' : 'menu'}/>
					</label>
					{/* Shit-code */}
					<div>
						{ headerList }
						<div style={{
							position: 'absolute',
							top: '90dvh',
							right: '50%',
							transform: 'translateX(50%)'
						}} className={css.header_account}>
							{ user
								? <span>
									Hello, <Btn classes="btn-none" link="/profile">{ user?.username }</Btn>
								</span>
								: <Btn link="/auth">Sign Up</Btn> }
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header