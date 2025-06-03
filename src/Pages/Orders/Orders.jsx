import React,{useContext, useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import './Orders.css'
import {db} from "../../Utility/firebase";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';


const Orders = () => {
const[{user},_dispatch] = useContext(DataContext);
const [orders, setOrders] = useState([])

useEffect(()=>{
if(user){
db.collection("users")
.doc(user.uid)
.collection("orders")
.orderBy("created","desc")
.onSnapshot((snapshot)=>{
  console.log(snapshot);
  setOrders(
    snapshot.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()
    }))
  )
});
}else{
setOrders([]);
}


// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

return (
    <LayOut>
      <section className="container">
        <div className="orders__container">
          <h2>your Orders</h2>
          {orders?.length == 0 && <div style={{padding:"20px"}}>you don't have orders yet.</div>}
          {/* ordered items */}
          <div>
            {
              orders?.map((eachOrder,i)=>{
                return(
                  <div key={i}>
                    <hr />
                    <p>Order ID: {eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map(order=>{

return(
                        <ProductCard
                        flex={true}
                        Product={order}
                        key={order.id}
                          />
);
                      })
                    }
                  </div>

                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders