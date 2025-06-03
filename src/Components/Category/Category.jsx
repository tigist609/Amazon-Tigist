import React from 'react'
import { catagoryInfos } from './CategoryFullInfos'
import CategoryCard from './CategoryCard'
import './Category.css'



const Category = () => {
  return (
    <section className='category_container'>
{
    catagoryInfos.map((infos,index)=>(
        <CategoryCard key = {infos.name || index}data={infos} />
    ))
}
    </section>
  )
}

export default Category