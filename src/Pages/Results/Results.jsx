import React,{useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import './Results.css'
import{useParams} from 'react-router-dom'
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'

function Results () {
    const [results,setResults]= useState();
    const [isLoading,setIsLoading]=useState(false)
    const {categoryName}= useParams()
    useEffect(()=>{
        setIsLoading(true);
        axios
          .get(`${productUrl}/Products/category/${categoryName}`)
          .then((res) => {
            setResults(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
     
    },[categoryName]);
  
  return (
    <LayOut>
      <section className="electronics_result">
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="products_container">
            {results?.map((Product) => (
              <ProductCard key={Product.id} 
              Product={Product}
              renderDesc={false}
              renderAdd={true}
              
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results