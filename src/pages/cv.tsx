import Head from 'next/head'

const CV = () => {
  return (
    <div>
      <Head>
        <title>{`Nguyen Dang Khuong 's CV`}</title>
      </Head>
      <div>
        <iframe
          className='w-full h-screen'
          src='/NguyenDangKhuong_CV.pdf'
          frameBorder='0'
          allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default CV
