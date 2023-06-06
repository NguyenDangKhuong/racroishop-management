import React from 'react'
import Header from '../Header'
// import './Layout.css'

// Importing all created components
// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";

// Pass the child props
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Attaching all file components */}
      <Header />
      {children}
      {/* <Footer /> Attach if necessary */}
    </>
  )
}
