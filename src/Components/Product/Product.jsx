import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
function Product() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="product-container mt-10">
          {Products?.map((singleProduct) => {
            return (
              <ProductCard
                renderAdd={true}
                Product={singleProduct}
                key={singleProduct.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
