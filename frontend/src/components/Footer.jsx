import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left side  */}
        <div>
            <img  className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>We are dedicated to providing compassionate, world-class healthcare to every patient. With experienced doctors, advanced medical facilities, and 24/7 support, our priority is your health and well-being. Together, we care for you and your family at every stage of life.</p>
        </div>
        {/* center side  */}
        <div>
            <p className='text-xl font-medium mb-6'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact</li>
                <li>Privacy</li>
            </ul>
        </div>
        {/* right side  */}
        <div>
            <p className='text-xl font-medium mb-6'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 9518479849</li>
                <li> kishanpandey.dev@gmail.com</li>
            </ul>
        </div>
       
    </div>
     {/* last section  */}
     <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 @ Kishan.dev - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer