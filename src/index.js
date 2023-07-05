import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './Resources/css/app.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = (props) =>{
  return(
    <Routes {...props}/>
  )
}



onAuthStateChanged(auth,(user)=>{
  console.log(user)
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App user={user}/>
  );
})