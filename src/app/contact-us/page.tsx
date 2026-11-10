import MapSection from '@/components/contact-us/MapSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <ContactSection />
    <MapSection />
    <Footer />
    </>
  )
}

export default page