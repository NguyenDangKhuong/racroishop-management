import Link from 'next/link'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'

const headerLinks = [
  {
    id: 0,
    name: 'Home',
    url: '#',
    child: [
      {
        id: 0,
        name: 'Smartwatch',
        url: '#'
      },
      {
        id: 1,
        name: 'Drone',
        url: '#'
      },
      {
        id: 2,
        name: 'Airpod',
        url: '#'
      }
    ]
  },
  {
    id: 1,
    name: 'About',
    url: '#',
    child: [
      {
        id: 0,
        name: 'Smartwatch',
        url: '#'
      },
      {
        id: 1,
        name: 'Drone',
        url: '#'
      },
      {
        id: 2,
        name: 'Airpod',
        url: '#'
      }
    ]
  },
  {
    id: 2,
    name: 'Home',
    url: '#',
    child: [
      {
        id: 0,
        name: 'Smartwatch',
        url: '#'
      },
      {
        id: 1,
        name: 'Drone',
        url: '#'
      },
      {
        id: 2,
        name: 'Airpod',
        url: '#'
      }
    ]
  }
]

const Header = () => {
  const [isTop, setIsTop] = useState(true)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [window.onscroll])

  const handleScroll = () => {
    window.scrollY > 0 ? setIsTop(false) : setIsTop(true)
  }

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setIsOpenMenu(false))

  return (
    <header
      className={`fixed inset-x-0 top-0 w-full z-20 ${
        isTop ? '' : 'is-sticky'
      }`}>
      <div className='px-4 md:px-10 2xl:px-24 py-6 lg:py-0'>
        <div className='flex items-center lg:relative'>
          <div className='w-6/12 lg:w-2/12'>
            <div className='logo'>
              <Link href='/'>
                <img src='/image/logo.png' alt='logo' loading='lazy' />
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex flex-1 xl:relative'>
            <nav className='main-menu'>
              <ul className='flex flex-wrap items-center'>
                {headerLinks.map(item => (
                  <li className='main-menu__item relative group' key={item.id}>
                    <div className='block py-10 xl:pr-8 md:pr-5 capitalize font-normal text-md text-primary hover:text-orange transition-all'>
                      <Link href={item.url}>{item.name}</Link>
                    </div>
                    <ul className='submenu bg-white py-3 px-8 shadow transition-all absolute left-0 top-full opacity-0 group-hover:opacity-100 invisible group-hover:visible group-hover:-translate-y-3 transform z-10 min-w-max'>
                      {item.child.map(childItem => (
                        <li className='my-3' key={childItem.id}>
                          <a
                            className='text-dark font-normal text-base capitalize transition-all hover:text-orange'
                            href={childItem.url}>
                            {childItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <li className='main-menu__item'>
                  <a
                    className='block py-10 xl:pr-8 md:pr-5 capitalize font-normal text-md text-primary hover:text-orange transition-all'
                    href='contact-us.html'>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className='w-6/12 lg:w-3/12'>
            <ul className='flex items-center justify-end'>
              <li className='ml-6 hidden lg:block'>
                <button
                  className='search-toggle text-right text-primary text-md hover:text-orange transition-all'
                  aria-label='icon-settings'
                  data-ol-has-click-handler=''>
                  <i className='fa-solid fa-magnifying-glass'></i>
                </button>
              </li>
              <li className='ml-6'>
                <a
                  href='#offcanvas-cart'
                  className='text-primary text-md hover:text-orange transition-all relative offcanvas-toggle'
                  data-ol-has-click-handler=''>
                  <span className='w-5 h-5 bg-dark text-white text-sm rounded-full font-normal flex flex-wrap items-center justify-center absolute -top-3 left-2 leading-none'>
                    4
                  </span>
                  <i className='fa-solid fa-cart-shopping'></i>
                </a>
              </li>
              <li className='ml-6'>
                <a
                  href='#signin'
                  className='text-primary text-md hover:text-orange transition-all relative offcanvas-toggle'
                  data-ol-has-click-handler=''>
                  Sign in
                </a>
              </li>
              <li className='ml-6 lg:hidden'>
                <div
                  className='text-primary text-lg'
                  data-ol-has-click-handler=''
                  onClick={() => setIsOpenMenu(true)}>
                  <i className='fa-solid fa-bars'></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <aside
          ref={ref}
          className={classNames(
            'fixed top-0 bottom-0 -right-full w-3/4 md:w-[300px] z-20 bg-white overflow-scroll duration-500 shadow-[0_0_5px_0_black] focus-visible:outline-none',
            {
              '!right-0': isOpenMenu,
              // Note: disables tab-key focus unless sidebar opens.
              'pointer-events-none select-none opacity-50 invisible':
                !isOpenMenu
            }
          )}>
          <div className='px-8 py-12 h-5/6 overflow-y-auto'>
            <form
              className='pb-10 mb-10 border-b border-solid border-gray-600'
              action='#'
              method='get'>
              <div className='relative'>
                <input
                  className='w-full h-12 text-sm py-4 pl-4 pr-16 bg-gray-light text-dark placeholder-current focus:outline-none'
                  type='search'
                  name='search'
                  placeholder='Search our store'
                />
                <button
                  className='w-12 h-full absolute top-0 right-0 flex items-center justify-center text-dark text-md border-l border-solid border-gray-600'
                  type='submit'
                  aria-label='button'>
                  <i className='icon-magnifier'></i>
                </button>
              </div>
            </form>

            <button
              className='offcanvas-close bg-dark group transition-all hover:text-orange text-white w-10 h-10 flex items-center justify-center absolute -left-10 top-0'
              aria-label='offcanvas'
              data-ol-has-click-handler=''>
              <i className='icon-close transition-all transform group-hover:rotate-90'></i>
            </button>

            <nav
              className='offcanvas-menu pb-10 mb-10 border-b border-solid border-gray-600'
              data-ol-has-click-handler=''>
              <ul>
                {headerLinks.map(item => (
                  <li className='relative block' key={item.id}>
                    <span className='menu-expand'></span>
                    <div className='block capitalize font-normal text-base my-2 py-1 font-roboto'>
                      <Link href={item.url}>
                        {item.name}
                      </Link>
                    </div>
                    <ul className='offcanvas-submenu static top-auto hidden w-full visible opacity-100'>
                      {item.child.map(childItem => (
                        <li key={childItem.id}>
                          <a
                            className='text-sm py-2 px-4 text-dark font-light block font-roboto transition-all hover:text-orange'
                            href={childItem.url}>
                            {childItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <ul>
                <li className='block mb-3'>
                  <a
                    className='flex flex-wrap justify-between mb-3 text-base text-dark hover:text-orange'
                    href='javascript:void(0)'
                    data-ol-has-click-handler=''>
                    Currency <i className='icon-arrow-down'></i>
                  </a>
                  <ul className='sub-category hidden py-5 px-6 shadow'>
                    <li className='my-2 block'>
                      <a
                        className='font-light text-sm tracking-wide text-dark block hover:text-orange'
                        href='#'
                        data-ol-has-click-handler=''>
                        EUR €
                      </a>
                    </li>
                    <li className='my-2 block'>
                      <a
                        className='font-light text-sm tracking-wide text-dark block hover:text-orange'
                        href='#'
                        data-ol-has-click-handler=''>
                        USD $
                      </a>
                    </li>
                  </ul>
                </li>
                <li className='block mb-3'>
                  <a
                    className='flex flex-wrap justify-between mb-3 text-base text-dark hover:text-orange'
                    href='javascript:void(0)'
                    data-ol-has-click-handler=''>
                    Account <i className='icon-arrow-down'></i>
                  </a>
                  <ul className='sub-category hidden py-5 px-6 shadow'>
                    <li className='my-2 block'>
                      <a
                        className='font-light text-sm tracking-wide text-dark block hover:text-orange'
                        href='#'
                        data-ol-has-click-handler=''>
                        English
                      </a>
                    </li>
                    <li className='my-2 block'>
                      <a
                        className='font-light text-sm tracking-wide text-dark block hover:text-orange'
                        href='#'
                        data-ol-has-click-handler=''>
                        Français
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Header
