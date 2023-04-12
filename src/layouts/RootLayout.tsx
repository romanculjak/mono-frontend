import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

type Props = {}

function RootLayout({}: Props) {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default RootLayout