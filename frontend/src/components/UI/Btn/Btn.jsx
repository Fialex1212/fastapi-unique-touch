import { HashLink as Link } from 'react-router-hash-link'
import './Btn.css'

const Btn = ({children, classes, link, func, type, isDisabled}) => {
	classes ||= ''
	link ||= null
	type ||= null
	func ||= () => {}

	if (link !== null) {
		return <Link to={link} className={`btn ${classes}`.trim()}>
			{children}
		</Link>
	}

	return (
		<button disabled={isDisabled} onClick={() => {func()}}
			className={`btn ${classes} ${isDisabled ? 'btn-disabled' : ''}`.trim()}
			type={type}>
				{children}
		</button>
	)
}

export default Btn