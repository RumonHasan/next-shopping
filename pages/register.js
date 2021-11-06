import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core';
import React, {useState, useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/store';
import { useRouter } from 'next/dist/client/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const Register = () => {
    // react hook form
    const {handleSubmit, control, formState:{errors}} = useForm();
    // snack bar
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const router = useRouter();
    const {redirect} = router.query; // redirect variable will redirect to the appropriate query
    // login infor
    const {userInfo} = state; // userInfo checking  
    useEffect(()=>{
        if(userInfo){ // if the user is already logged in... jump back to home
            router.push('/');
        }
    },[])
  
    // submitting the login information
    const submitHandler = async ({name, email, password, confirmPassword})=>{
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
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component='h1' variant='h1'>Login</Typography>
                <List>
                    <ListItem>
                        <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            rules={{
                                required:true,
                                minLength: 2
                            }}
                            render={({field})=>(
                                <TextField 
                                variant='outlined' 
                                fullWidth 
                                id='name' 
                                label='Name'
                                error={Boolean(errors.name)}
                                inputProps={{type:'name'}}
                                helperText={
                                    errors.name ?
                                        errors.name.type === 'minLength' ? 
                                        'Name is too short':
                                        'Name is required'
                                        : ''
                                }
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                    </ListItem>

                    <ListItem>
                        <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                        }}
                        render={({field})=>(
                        <TextField 
                            variant='outlined' 
                            fullWidth id='email' 
                            label='Email'
                            error={Boolean(errors.email)}
                            helperText={
                            errors.email ? 
                            errors.email.type === 'pattern'
                                ?'Email is not valid'
                                :'Email is required'
                            : ''}
                            inputProps={{type:'email'}} 
                            {...field}>
                        </TextField>
                        )}></Controller>
                    </ListItem>

                    <ListItem>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field }) => (
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password
                                ? errors.password.type === 'minLength'
                                    ? 'Password length is more than 5'
                                    : 'Password is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                            )}
                    ></Controller>
                    </ListItem>

                    <ListItem>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field }) => (
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="confirmPassword"
                            label="confirmPassword"
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password
                                ? errors.password.type === 'minLength'
                                    ? 'Password length is more than 5'
                                    : 'Password is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                         )}
                    ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button variant='contained' type='submit' fullWidth color='primary'>
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already Have an Account? <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
export default Register;
