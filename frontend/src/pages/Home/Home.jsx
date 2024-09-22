import Hero from './sections/Hero/Hero'
import Features from './sections/Features/Features'
import Services from './sections/Services/Services'
import Tabbed from './sections/Tabbed/Tabbed'
import Gallery from './sections/Gallery/Gallery'

import FAQ from '../../components/sections/FAQ/FAQ'

const Home = () => {
	return <>
		<Hero/>
		<Features/>
		<Services/>
		<Tabbed/>
		<FAQ/>
		<Gallery/>
	</>
}

export default Home