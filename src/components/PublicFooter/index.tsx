const PublicFooter = () => {
  return (
    <div className='relative h-full w-full'>
      <footer className='absolute w-full bottom-0 bg-gray-800 pb-6'>
        <div className='container mx-auto px-4'>
          <hr className='mb-6 border-b-1 border-gray-600' />
          <div className='flex flex-wrap items-center md:justify-between justify-center'>
            <div className='w-full md:w-4/12 px-4'>
              <div className='text-sm text-gray-500 font-semibold py-1 text-center md:text-left'>
                Copyright © 2022
                <a
                  href='https://www.creative-tim.com?ref=nnjs-footer-small'
                  className='text-white hover:text-gray-300 text-sm font-semibold ml-5'>
                  NDK
                </a>
              </div>
            </div>
            <div className='w-full md:w-8/12 px-4'>
              <ul className='flex flex-wrap list-none md:justify-end  justify-center'>
                <li>
                  <a
                    href='https://www.creative-tim.com?ref=nnjs-footer-small'
                    className='text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3'>
                    NDK
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.creative-tim.com/presentation?ref=nnjs-footer-small'
                    className='text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3'>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href='http://blog.creative-tim.com?ref=nnjs-footer-small'
                    className='text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3'>
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-small'
                    className='text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3'>
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicFooter
