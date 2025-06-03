import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";

import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

const ProductDetail = () => {
  const { ProductId } = useParams();
  const [Product, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/Products/${ProductId}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [ProductId]);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          Product={Product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
};

export default ProductDetail;
