import AboutHero from '@/components/about-us/AboutHero'
import FacilityFeatures from '@/components/about-us/FaciltyFeature'
import OurStory from '@/components/about-us/OurStory'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <AboutHero />
    <FacilityFeatures />
    <OurStory />
    <Footer />
    </>
  )
}

export default page