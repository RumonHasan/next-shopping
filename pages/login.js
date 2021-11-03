import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import React, {useState, useContext} from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/store';
import { useRouter } from 'next/dist/client/router';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const router = useRouter();
    const {redirect} = router.query; // redirect variable will redirect to the appropriate query
    // login infor
    const {userInfo} = state;
    if(userInfo){ // if the user is already logged in... jump back to home
        router.push('/');
    }
    // submitting the login information
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/login', {email, password});
            dispatch({type:'USER_LOGIN', payload:data});
            Cookies.set('userInfo', data); // setting the user data to cookies
            router.push(redirect || '/'); // if redirect is null it will jump to homescreen
            // alert('Successful login'); // posting the login info in order to be checked
        }catch(err){
            alert(err.message)
        }

    }
    return (
        <Layout title='Login'>
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component='h1' variant='h1'>Login</Typography>
                <List>
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
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Dont have an account? <NextLink href={'/register'} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
export default Login;
