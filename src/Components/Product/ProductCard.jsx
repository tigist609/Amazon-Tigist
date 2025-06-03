import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import './Product.css'
import {Link} from 'react-router-dom'
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { Type } from '../../Utility/action.type'

function ProductCard ({Product,flex,renderDesc,renderAdd}) {
    
  const [_state, dispatch] = useContext(DataContext);
  if (!Product) return null;
  const { image, title, id, rating, price, description } = Product;

  // isInCart to decide whether to show or disable the Add to Cart button.
  const isInCart = _state.basket.some((item) => item.id === id);
  

const addToCart =()=>{
  console.log("Dispatching item:", { image, title, id, price }); 
  dispatch({
    type:Type.ADD_TO_BASKET,
    item:{
      image,
      title,
      id,
      rating,
      price,
      description,

    }
  })
}



  return (
    <div className={`product-card ${flex ? "product-flexed" : ""}`}>
      <div className="product-image">
        <Link to={`/Products/${id}`}>
          <img src={image} alt={title} />
        </Link>
      </div>
      <div className="product-info">
        <h3>{title}</h3>
        <div>
          {renderDesc && <div style={{ maxWidth: "500px" }}>{description}</div>}
          <Rating value={rating?.rate} precision={0.1} readOnly />

          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {/* {renderAdd && !isInCart && (
          <button onClick={addToCart}>add to Cart</button>
        )} */}
        {renderAdd && (
          <button onClick={addToCart}>
            {isInCart ? "Add More" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard