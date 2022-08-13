
const RegisterForm = () => {
  return (
    <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute top-0 w-full h-full bg-gray-800 bg-no-repeat bg-contain"
          style={{ backgroundImage: `url("https://demos.creative-tim.com/notus-nextjs/img/register_bg_2.png")` }}>
        </div>
        <div className="container mx-auto px-4 h-full"><div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 pt-10">
                <div className="text-gray-500 text-center mb-3 font-bold uppercase">
                  <span>Đăng kí</span>
                </div>
                <form >
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">Tên</label>
                    <input className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Tên" />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                    <input type="email" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                    <input type="password" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
                      <span className="ml-2 text-sm font-semibold text-gray-600">Tôi đồng ý với
                        <a href="#" className="text-lightBlue-500 ml-1">Điều khoản của shop</a>
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="button">
                      Tạo tài khoản
                    </button>
                  </div>
                </form>
                <hr className="mt-6 border-b-1 border-gray-300" />
              </div>
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-500 text-sm font-bold">hoặc đăng kí với</h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button className="bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                    <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-nextjs/img/github.svg" />Github
                  </button>
                  <button className="bg-white active:bg-gray-50 text-gray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                    <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-nextjs/img/google.svg" />Google
                  </button></div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <footer className="absolute w-full bottom-0 bg-gray-800 pb-6">
          <div className="container mx-auto px-4">
            <hr className="mb-6 border-b-1 border-gray-600" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4">
                <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left">Copyright © 2022
                  <a href="https://www.creative-tim.com?ref=nnjs-footer-small" className="text-white hover:text-gray-300 text-sm font-semibold ml-5">NDK</a>
                </div>
              </div>
              <div className="w-full md:w-8/12 px-4">
                <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                  <li>
                    <a href="https://www.creative-tim.com?ref=nnjs-footer-small" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">NDK</a>
                  </li>
                  <li>
                    <a href="https://www.creative-tim.com/presentation?ref=nnjs-footer-small" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">About Us</a>
                  </li>
                  <li>
                    <a href="http://blog.creative-tim.com?ref=nnjs-footer-small" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">Blog</a>
                  </li>
                  <li>
                    <a href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-small" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">MIT License</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default RegisterForm