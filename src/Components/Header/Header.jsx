import React,{useContext} from "react";
import "./Header.css";
import { IoLocationOutline } from "react-icons/io5";
import LowerHeader from "../LowerHeader";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase'




const Header = () => {
  const [{user,basket},_dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section>
      <div className="header_container">
        <div className="logo_container">
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
              className="amazon_logo"
            />
          </Link>
          <div className="delivery">
            <span>
              {" "}
              <IoLocationOutline />
            </span>
            <div>
              <p> Deliver to</p>
             <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className="search_bar">
          <select name="" id="">
            <option value="">All</option>
          </select>
          <span className="down_arrow">&#9662;</span>

          <input type="text" placeholder="Search product" />

          <button className="search_button">
            <img
              src="https://img.icons8.com/ios-filled/24/000000/search--v1.png"
              alt="Search"
            />
          </button>
        </div>

        <div className="header_right">
          <div className="language_selector">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
              alt="Flag"
            />
            <select>
              <option value="EN">EN</option>
            </select>
          </div>

          <Link to={!user && "/auth"}>
            <div className="account_info">
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders" className="returns_orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className="cart_link">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/shopping-cart.png"
              alt="Cart"
              className="cart_icon"
            />
            <span className="cart_count">{totalItem}</span>
          </Link>
          <div className="cart_name"></div>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
};

export default Header;
