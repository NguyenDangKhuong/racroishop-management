import Link from 'next/link'

const PublicNavbar = () => {
  return (
    <nav className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <Link href='/'>
            <a className='text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'>
              Rac Roi Shop
            </a>
          </Link>
          <button
            className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'>
            <i className='text-white fas fa-bars'></i>
          </button>
        </div>
        <div
          className='lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden'
          id='example-navbar-warning'>
          <ul className='flex flex-col lg:flex-row list-none mr-auto'>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                  <i className='lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2'></i>{' '}
                  Docs
                </a>
              </Link>
            </li>
          </ul>
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                  Demo Pages
                </a>
              </Link>
              <div className='hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'>
                <span className='text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'>
                  Admin Layout
                </span>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Dashboard
                  </a>
                </Link>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Settings
                  </a>
                </Link>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Tables
                  </a>
                </Link>
                <div className='h-0 mx-4 my-2 border border-solid border-blueGray-100'></div>
                <span className='text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'>
                  Auth Layout
                </span>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Login
                  </a>
                </Link>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Register
                  </a>
                </Link>
                <div className='h-0 mx-4 my-2 border border-solid border-blueGray-100'></div>
                <span className='text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400'>
                  No Layout
                </span>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Landing
                  </a>
                </Link>
                <Link href='/'>
                  <a className='text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'>
                    Profile
                  </a>
                </Link>
              </div>
            </li>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                  <i className='lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg '></i>
                  <span className='lg:hidden inline-block ml-2'>Share</span>
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                  <i className='lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg '></i>
                  <span className='lg:hidden inline-block ml-2'>Tweet</span>
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'>
                  <i className='lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg '></i>
                  <span className='lg:hidden inline-block ml-2'>Star</span>
                </a>
              </Link>
            </li>
            <li className='flex items-center'>
              <Link href='/'>
                <a className='bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'>
                  <i className='fas fa-arrow-alt-circle-down'></i> Download
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default PublicNavbar
