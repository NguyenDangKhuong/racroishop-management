import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='mt-20'>{children}</div>
      <Footer />
    </>
  )
}
