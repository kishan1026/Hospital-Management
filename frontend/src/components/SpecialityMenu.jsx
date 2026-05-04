import React from 'react'
import { specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4px py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium  leading-tight '> Find speciality</h1>
        <p className='w-full sm:w-2/3 md:w-1/3 text-sm text-center leading-6 mt-3 text-gray-600 px-2'>
  Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
</p>
        <div className='flex sm:justify-center gap-4 pt-10 w-full overflow-scroll '>
          { specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2.5  trasition-all duration-500'  key={index} to={`/doctors/${item.speciality}`}>
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
              <p>{item.speciality}</p>
            </Link>

          ))}
        </div>

    </div>
  )
}

export default SpecialityMenu