import linkedin from '../assets/imgs/linkedin.png'
import github from '../assets/imgs/github.png'
import andre from '../assets/imgs/andre.png'
import indexWriteUp from '../assets/data/writeUp'


const Footer = () => {
	return (
	<section id='footer' className='bg-light text-dark'>
		<div className='container-fluid p-5 py-2 d-flex flex-row justify-content-between align-items-center'>
			<div className='about_me d-flex flex-row justify-content-between align-items-center'>
				<img className='d-none d-sm-block' src={andre} height='50px' width='50px'/>
				<div className='mx-3 row'>
					<small className='about_me-text col-12 col-md-8'>{indexWriteUp[3]}</small><br/>
					<small className='about_me-text col-12 col-md-10'>{indexWriteUp[5]}</small><br/>
				</div>
			</div>	
			<div className='follow_me'>
				<a href='https://www.linkedin.com/in/andre-tong-51b9044/'><img src={linkedin} height='50px' width='50px' className='m-2'/></a>
				<a href='https://github.com/andretdr/CareerPlus_BackEnd'><img src={github} height='50px' width='50px' className='m-2'/></a>
			</div>	
		</div>

		<div className='container-lg'>
			<hr className='w-75 ms-auto me-auto'/>
		</div>

		<div className='container-lg d-flex flex-row justify-content-center align-items-center'>
			{/* <p className='ms-5 me-3 my-1 fw-bold'> Other projects </p> */}
			<div>
				<a className='mx-3 fw-bold text-secondary' href='https://financeplus-cfec3ff5d154.herokuapp.com/landing'>Finance +</a>
                <a className='mx-3 fw-bold text-secondary' href='https://front-end-suites.vercel.app/'>Front End Suites</a>
			</div>
		</div>
		<div>
			<p className='padding_footer m-0'></p>
		</div>
	</section>
	)
}

export default Footer