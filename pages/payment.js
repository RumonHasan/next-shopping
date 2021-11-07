import React,{useState, useEffect, useContext} from 'react';
import { Store } from '../utils/store';
import { useRouter } from 'next/dist/client/router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/checkoutWizard';
import { useSnackbar } from 'notistack';
import useStyles from '../utils/styles';
import { Typography, List, ListItem, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const Payment = () => {
    const classes = useStyles();
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {cart:{shippingAddress}} = state;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();// notifications bar

    // main payment method state
    const [paymentMethod, setPaymentMethod] = useState('');
    useEffect(()=>{
        if(!shippingAddress.address){
            router.push('/shipping');
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || ''); // checking whether payment methodis present or not
        }
    },[])
    // submit handler
    const submitHandler = (e)=>{
        e.preventDefault();
        if(!paymentMethod){
            enqueueSnackbar('Payment method is required in order to proceed', {variant:'error'})
        }else{
            dispatch({type:'SAVE_PAYMENT_METHOD', payload:paymentMethod});
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeorder');// jump to place order page
        }
    }
    return (
        <Layout title='Payment Method'>
            <CheckoutWizard activeStep={2}/>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography variant='h1' component='h1'>Payment</Typography>
                <List>
                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                aria-label='Payment Method'
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={(e)=>setPaymentMethod(e.target.value)}>
                                    <FormControlLabel
                                        label='stripe'
                                        value='stripe'
                                        control={<Radio/>}>
                                    </FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>

                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Payment;
