import Link from 'next/link'
import { getYear } from 'date-fns'

const ProfilePage = () => {
  return (
    <>
      <main className='profile-page'>
        <section className='relative block h-[500px]'>
          <div
            className='absolute top-0 w-full h-full bg-center bg-cover'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}>
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-50 bg-black'></span>
          </div>
          <div
            className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'
            style={{ transform: 'translateZ(0)' }}>
            <svg
              className='absolute bottom-0 overflow-hidden'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'>
              <polygon
                className='text-gray-200 fill-current'
                points='2560 0 2560 100 0 100'></polygon>
            </svg>
          </div>
        </section>
        <section className='relative py-16 bg-gray-200'>
          <div className='container mx-auto px-4'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                    <div className='relative'>
                      <img
                        alt='...'
                        src='/img/team-2-800x800.jpg'
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                      />
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                    <div className='py-6 px-3 mt-32 sm:mt-0'>
                      <Link href='/cv'>
                        <button
                          className='bg-gray-700 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                          type='button'>
                          My CV
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                          22
                        </span>
                        <span className='text-sm text-gray-400'>Friends</span>
                      </div>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                          10
                        </span>
                        <span className='text-sm text-gray-400'>Photos</span>
                      </div>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                          89
                        </span>
                        <span className='text-sm text-gray-400'>Comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-12'>
                  <h3 className='text-4xl font-semibold leading-normal mb-2 text-gray-700 mb-2'>
                    NGUYEN DANG KHUONG
                  </h3>
                  <div className='text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase'>
                    <i className='fas fa-map-marker-alt mr-2 text-lg text-gray-400'></i>{' '}
                    Ho Chi Minh City, Viet Nam
                  </div>
                  <div className='mb-2 text-gray-600 mt-10'>
                    <i className='fas fa-briefcase mr-2 text-lg text-gray-400'></i>
                    Senior Software Engineer - HCL Technology Vietnam
                  </div>
                  <div className='mb-2 text-gray-600'>
                    <i className='fas fa-university mr-2 text-lg text-gray-400'></i>
                    Ho Chi Minh University of Science
                  </div>
                </div>
                <div className='mt-10 py-10 border-t border-gray-200 text-center'>
                  <div className='flex flex-wrap justify-center'>
                    <div className='w-full lg:w-9/12 px-4'>
                      <p className='mb-4 text-lg leading-relaxed text-gray-700'>
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href='#pablo'
                        className='font-normal text-lightBlue-500'
                        onClick={e => e.preventDefault()}>
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='relative bg-gray-200 pt-8 pb-6'>
        <div
          className='bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20'
          style={{ transform: 'translateZ(0)' }}>
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'>
            <polygon
              className='text-gray-200 fill-current'
              points='2560 0 2560 100 0 100'></polygon>
          </svg>
        </div>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap text-center lg:text-left'>
            <div className='w-full lg:w-6/12 px-4'>
              <h4 className='text-3xl font-semibold'>{`Let's keep in touch!`}</h4>
              <h5 className='text-lg mt-0 mb-2 text-gray-600'>
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className='mt-6 lg:mb-0 mb-6'>
                <button
                  className='bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2'
                  type='button'>
                  <i className='fab fa-twitter'></i>
                </button>
                <button
                  className='bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2'
                  type='button'>
                  <i className='fab fa-facebook-square'></i>
                </button>
                <button
                  className='bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2'
                  type='button'>
                  <i className='fab fa-dribbble'></i>
                </button>
                <button
                  className='bg-white text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2'
                  type='button'>
                  <i className='fab fa-github'></i>
                </button>
              </div>
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='flex flex-wrap items-top mb-6'>
                <div className='w-full lg:w-4/12 px-4 ml-auto'>
                  <span className='block uppercase text-gray-500 text-sm font-semibold mb-2'>
                    Useful Links
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://www.creative-tim.com/presentation?ref=nnjs-footer'>
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://blog.creative-tim.com?ref=nnjs-footer'>
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://www.github.com/creativetimofficial?ref=nnjs-footer'>
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://www.creative-tim.com/bootstrap-themes/free?ref=nnjs-footer'>
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='w-full lg:w-4/12 px-4'>
                  <span className='block uppercase text-gray-500 text-sm font-semibold mb-2'>
                    Other Resources
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer'>
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://creative-tim.com/terms?ref=nnjs-footer'>
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://creative-tim.com/privacy?ref=nnjs-footer'>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className='text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm'
                        href='https://creative-tim.com/contact-us?ref=nnjs-footer'>
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className='my-6 border-gray-300' />
          <div className='flex flex-wrap items-center md:justify-between justify-center'>
            <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
              <div className='text-sm text-gray-500 font-semibold py-1'>
                Copyright © {getYear(new Date())} Yumy Shop by{' '}
                <a
                  href='https://www.creative-tim.com?ref=nnjs-footer'
                  className='text-gray-500 hover:text-gray-800'>
                  NDK
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ProfilePage
