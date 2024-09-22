export default function ({children, size, uppercase}) {
	size ||= 'normal'
	uppercase ||= false
	
	return <h2 className={`heading heading-${size} ${uppercase && 'font-s-uppercase'}`.trim()}>
		{children}
	</h2>
}