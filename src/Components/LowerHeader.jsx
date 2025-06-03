import React from 'react'
import { IoIosMenu } from "react-icons/io";
function LowerHeader() {
  return (
    <div className="lower_container">
      <ul className="lower_inner">
        <li>
          <p>
            {" "}
            <IoIosMenu />
            All
          </p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Sercice</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;