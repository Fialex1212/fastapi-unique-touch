import Heading from '../../../../components/Heading'
import Btn from '../../../../components/UI/Btn/Btn'

import css from './Gallery.module.css'

const Gallery = () => {
	return <section className={css.gallery__section}>
		<div className='content__wrapper'>
			<div>
				<Heading size='massive'>Photo Gallery</Heading>
				<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel tortor hendrerit dapibus. Quisque vestibulum nisl turpis, vel auctor lorem malesuada at. Donec volutpat aliquam elit sed consequat. Pellentesque tristique, ex in dignissim ultricies, ex ex maximus ex, a efficitur sem felis vel lacus. Morbi nec elementum nunc. In hac habitasse platea dictumst.</p></div>
			</div>
			<div className={css.gallery_controls}>
				<Btn classes='btn-accept' link="/gallery#">View gallery</Btn>
				<Btn link='https://www.instagram.com/'>Instagram</Btn>
			</div>
		</div>
		<div className={css.gallery_photos}>
			<div><img src='https://i.pinimg.com/564x/c9/fe/c2/c9fec2aad2b61a9cf4180a1a5ae8b7d4.jpg' alt="Gallery Photo 1"/></div>
			<div><img src='https://i.pinimg.com/564x/33/03/e4/3303e4efa502da2bdeb872c3cb93a856.jpg' alt="Gallery Photo 2"/></div>
			<div><img src='https://i.pinimg.com/564x/f7/8d/02/f78d0219f9e2373c571de8058a430094.jpg' alt="Gallery Photo 3"/></div>
			<div><img src='https://i.pinimg.com/736x/78/da/34/78da346b7d288269383865ee5b20eb70.jpg' alt="Gallery Photo 4"/></div>
		</div>
	</section>
}

export default Gallery