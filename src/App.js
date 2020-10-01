import React, { useState } from 'react';
import './App.css';
import DefaultContainer from './container/DefaultContainer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {get} from 'lodash'

const App = () => {
  const [count,setCount] = useState(get(JSON.parse(localStorage.getItem('products')),'length',0))
    
  return ( 
    <>
    <ToastContainer/>
      <DefaultContainer count={count} setCount={setCount}/>
    </>
   );
}
 
export default App;
