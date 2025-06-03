import React, { useContext, useState } from 'react'
// import LayOut from '../../Components/LayOut/LayOut';
import  './Signup.css';
import {Link,useNavigate,useLocation} from "react-router-dom"
import{auth} from '../../Utility/firebase';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {DataContext} from "../../Components/DataProvider/DataProvider"
import{Type} from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'

const Auth=() => {
  const [email,setEmail]= useState("");
  const [password,setPassword]=useState("");
    const [error,setError] = useState("");
    const [{user},dispatch]=useContext(DataContext)  
   const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
   })
   const navigate = useNavigate();
   const navStateData = useLocation();
   console.log(navStateData);
  
const authHandler = (e)=>{
  e.preventDefault()
  console.log(user);
  if(e.target.name =="signin"){
    // firebase auth
    setLoading({...loading,signIn:true})
signInWithEmailAndPassword(auth,email,password)
.then((userInfo)=>{
   dispatch({
    type: Type.SET_USER,
    user: userInfo.user,
  });
  setLoading({ ...loading, signIn: false }); 
  navigate(navStateData?.state?.redirect || "/")
})
.catch((err)=>{
 setError(err.message)
})
  }else{
    setLoading({ ...loading, signUp: true });
    createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
       dispatch({
        type:Type.SET_USER,
        user:userInfo.user,
      });
    
    setLoading({ ...loading, signUp: false })
    navigate(navStateData?.state?.redirect || "/");
  })
    .catch((err) => {
      setError(err.message);
    });
  }
}
  return (
    <section className="Login">
      <div className="Login-box">
        <Link to="/">
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="" />
        </Link>
        <div className="Login-container">
          <h1>Sign In</h1>
          {navStateData?.state?.msg &&(
            <small
              style={{
                padding:"5px",
                textAlign:"center",
                color:"red",
                fontWeight:"bold",
              }}
              >
                {navStateData?.state?.msg}
            </small>
          )}
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="signin"
              className='Login-signIn_button'
            >
              {loading.signIn ? (
                <ClipLoader color="#000" size={15}></ClipLoader>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
            sale.please see our Privacy Notice,our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button
            type="submit"
            onClick={authHandler}
            name="signup"
            className="Login-register_button"
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Create your Amazon Account"
            )}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </div>
      </div>
    </section>
  );
}

export default Auth;