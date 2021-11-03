import React, { useContext } from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Link, createTheme, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';


const Layout = ({children, title, description}) => {
    const classes = useStyles();
    const {state, dispatch} = useContext(Store);
    const {darkMode, cart, userInfo} = state;
    // dark mode change function
    const darkModeChangeHandler = ()=>{
        dispatch({type:darkMode ? 'DARK_MODE_OFF': 'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON': 'OFF');
    }
    // loginmenu close handler
    const loginMenuCloseHandler = ()=>{
        
    }
    const theme = createTheme({
        typography:{
            h1:{
                fontSize:'1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h2:{
                fontSize:'1.4rem',
                fontWeight: 400,
                margin: '1rem 0'
            }
        },
        palette:{
            type:darkMode ? 'dark' :'light',
            primary:{
                main: "#f0c000"
            },
            secondary:{
                main:'#208080'
            }
        }
    })
    return (
        <div>
            <Head>
                <title>{title ? `${title}-Next HomieShop`: 'Next Homie Shop'}</title>
                {description && <meta name='description' content={description}/>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.navBar}>
                    <Toolbar>
                    <NextLink href='/' passHref>
                        <Link>
                            <Typography className={classes.brand}>Homie Shop</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}>

                    </div>
                    <Switch checked={darkMode} onChange={darkModeChangeHandler}>
                    </Switch>
                    <div>
                        <NextLink href='/cart' passHref>
                            <Link>
                                {cart.cartItems.length > 0 ? <Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge> : 'cart'}
                            </Link>
                        </NextLink>
                        {userInfo ? <><Button 
                        aria-controls='simple-menu'
                        aria-haspopup = 'true'
                        onClick={handleClick}
                        className={classes.navbarBtn}>{userInfo.name}</Button> 
                               <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={loginMenuCloseHandler}
                            >
                            <MenuItem onClick={loginMenuCloseHandler}></MenuItem>
                        </Menu>
                        </>
                        :
                            <NextLink href='/login' passHref>
                            <Link>Login</Link>
                        </NextLink>
                        }
                        
                    </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>All rights reserved Homies Shop</Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}

export default Layout;
