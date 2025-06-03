import React,{useContext} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import './Cart.css'
import{DataContext} from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const [{basket},dispatch] = useContext(DataContext);
  console.log("Basket:",basket);
  const total = basket.reduce((amount,item)=>{
   return item.price *item.amount + amount;
  },0);
  console.log(basket);
  const increment = (item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
    <LayOut>
      <section className="cart-container">
        <div className="inner-cart-container">
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p> Oops ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className="cart-container-amount">
                  <ProductCard
                    key={i}
                    Product={item}
                    renderAdd={true}
                    renderDesc={true}
                    flex={true}
                  />
                  <div className="button-amount">
                    <button className="btn" onClick={() => increment(item)}>
                     < IoIosArrowUp size={20}/>
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                     < IoIosArrowDown size={20}/>
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className="subtotal-container">
            <div>
              <p>Subtotal({basket?.length}item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments" className="checkout-link">
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart