import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import React, {useState, useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/store';
import { useRouter } from 'next/dist/client/router';
import Cookies from 'js-cookie';

const Register = () => {
    // input states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const router = useRouter();
    const {redirect} = router.query; // redirect variable will redirect to the appropriate query
    // login infor
    const {userInfo} = state; // userInfo
    useEffect(()=>{
        if(userInfo){ // if the user is already logged in... jump back to home
            router.push('/');
        }
    },[])
  
    // submitting the login information
    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('password is not confirmed');
            return;
        }// alert if
        try {
            const {data} = await axios.post('/api/users/register', { name:name,email:email, password:password,});
            dispatch({type:'USER_LOGIN', payload:data});
            Cookies.set('userInfo', data); // setting the user data to cookies
            router.push(redirect || '/'); // if redirect is null it will jump to homescreen
            // alert('Successful login'); // posting the login info in order to be checked
        }catch(err){
            alert(err.message); // alert message
        }

    }
    return (
        <Layout title='Register'>
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component='h1' variant='h1'>Login</Typography>
                <List>
                    <ListItem>
                        <TextField variant='outlined' fullWidth id='name' label='Name'
                        inputProps={{type:'text'}} onChange={e=> setName(e.target.value)}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant='outlined' fullWidth id='email' label='Email'
                        inputProps={{type:'email'}} onChange={e=> setEmail(e.target.value)}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant='outlined' fullWidth id='password' label='Password' inputProps={{type:'password'}}
                        onChange={e=>setPassword(e.target.value)}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant='outlined' fullWidth id='confirmPassword' label='Confirm Password' inputProps={{type:'password'}}
                        onChange={e=>setConfirmPassword(e.target.value)}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already Have an Account? <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
export default Register;
