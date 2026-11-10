import EnrollmentBanner from '@/components/enrollment/EnrollmentBanner'
import WhyChooseUs from '@/components/enrollment/WhyChooseUs'
import EnrollmentSection from '@/components/EnrollmentSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <EnrollmentBanner />
    <WhyChooseUs />
    <Footer />
    </>
  )
}

export default page