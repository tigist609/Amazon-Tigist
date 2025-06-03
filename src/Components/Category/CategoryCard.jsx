import React from 'react'
import './Category.css'
import {Link} from 'react-router-dom'

const CategoryCard = ({data}) => {
  return (
    <div className="category">
      
      <Link to={`/category/${data.name}`}>
        <h2>{data.title}</h2>
        
          <img src={data.imgLink} alt={data.title} />
        

        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard