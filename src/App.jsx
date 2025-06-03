// import './App.css'
import React,{useContext,useEffect}from "react";
import Routering from "./Router.jsx";
import{Type} from './Utility/action.type.js'
import {auth} from './Utility/firebase.js'
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
function App() {
  const [{ _user }, dispatch] = useContext(DataContext);
  
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
if(authUser){
  dispatch({
    type:Type.SET_USER,
    user:authUser,
  })
}else{
  dispatch({
    type: Type.SET_USER,
    user: null,
  });
  
}
});

  },[dispatch]);
  return <Routering />;
}

export default App;
