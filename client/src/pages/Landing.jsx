import { Logo } from "../components"
import { Link } from "react-router-dom"
import landingImg from "../assets/images/landing_img.svg"

const Landing = () => {
  return (
    <div className='w-[85%] h-[100dvh] m-auto flex py-5 overflow-auto'>
      {/* left part */}
      <div className='w-full lg:w-[50%]'>
        <Logo container='w-[100px] md:w-[150px] bg-white rounded-full shadow-md' />
        <div>
          <h1 className='text-4xl lg:text-6xl font-bold text-blue-900 mt-10'>
            TGN <span className='text-cyan-500 capitalize'>records</span> APP
          </h1>

          <p className='mt-10 text-slate-700 leading-7 text-sm md:text-base lg:leading-8'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            earum. Officiis ratione sunt, maxime iure deleniti alias dolores in
            illum mollitia velit! Minima blanditiis laborum mollitia error
            officia temporibus obcaecati. Repellendus inventore natus nulla
            eaque, maxime quod non consequatur saepe aperiam aut, officia
            numquam recusandae dolorem id? Sapiente, similique veritatis.
          </p>
          <div className='mt-10'>
            <Link
              to='/register'
              className='bg-cyan-500 py-2 px-4 rounded text-white text-lg mr-4 hover:bg-cyan-800 ease-in-out duration-300'
            >
              Create Account
            </Link>
            <Link
              to='/login'
              className='bg-cyan-500 py-2 px-4 rounded text-white text-lg hover:bg-cyan-800 ease-in-out duration-300'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* right part */}
      <div className='hidden lg:block w-[50%]'>
        <div className='w-[75%] m-auto mt-40 '>
          <img src={landingImg} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Landing
