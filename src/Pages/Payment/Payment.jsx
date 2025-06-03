import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((allocator, item) => {
    return item.price * item.amount + allocator;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  

  const handleChange = (e) => {
    console.log(e?.error?.message);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // backend ...client secret//
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
        data: {
    email: user?.email,
  },
      });
      
      console.log("Stripe response:", response.data);
      // const clientSecret = response.data?.clientPaymentSecret;
      const clientSecret = response.data?.clientSecret;
      console.log("clientSecret:", clientSecret);
      if (!clientSecret) {
        setCardError("Payment could not be initialized. Please try again.");
        setProcessing(false);
        return;
      }

  

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(result);

      if (result.error) {
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = result.paymentIntent;
      if (!paymentIntent) {
        setCardError("Payment failed. Please try again.");
        setProcessing(false);
        return;
      }



      // if (result.error) {
      //   setCardError(result.error.message);
      //   setProcessing(false);
      //   return;
      // }

      // const{ paymentIntent} = result.paymentIntent;
      // if (!paymentIntent) {
      //   setCardError("Payment failed. Please try again.");
      //   setProcessing(false);
      //   return;
      // }

      // after the confirmation ... order fire store database save//
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount, 
          created: paymentIntent.created
        });
      // empty the basket//
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have to place new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__container}>
        <div className={classes.payment__header}>
          Checkout ({totalItem}) items
        </div>
        <hr />
        {/* payment method */}
        <section className={classes.payment}>
          {/* address */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>

            <div className={classes.flex_1}>
              {user?.email}
              <div>123 BLVD Lane</div>
              <div>Austin, TX</div>
            </div>
          </div>
          <hr />

          {/* product */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item, i) => (
                <ProductCard Product={item} flex={true} key={i} />
              ))}
            </div>
          </div>
          <hr />

          {/* card form */}
          <div className={classes.flex}>
            <h3>Payment methods</h3>

            <div className={classes.payment__card__container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {/* error */}
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}

                  {/* card element */}
                  <CardElement onChange={handleChange} />

                  {/* price */}
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order |</p> <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please Wait ...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayOut>
  );
};

export default Payment;
