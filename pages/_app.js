import { SnackbarProvider } from 'notistack';
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
  <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal:'center'}}>
    <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
  </SnackbarProvider>
  );
}

export default MyApp
