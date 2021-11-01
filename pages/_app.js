import React from 'react'
import '../styles/globals.css';
import {StoreProvider} from '../utils/store';

function MyApp({ Component, pageProps }) {
  React.useEffect(()=>{ // rmeoving server side rendering of material ui elements
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[])
  return (
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>)
}

export default MyApp
