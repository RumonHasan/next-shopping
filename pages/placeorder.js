import { Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell,
    TableBody, Link, Select, MenuItem, Button, List, ListItem, Card } from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/checkoutWizard';
    
     const Placeorder = () => {
         const { state, dispatch } = useContext(Store);
         const { cart:{shippingAddress, cartItems, paymentMethod}} = state;
         const router = useRouter();
        const classes = useStyles();

        const round2 = num => Math.round(num*100 + Number.EPSILON)/100;
        const itemsPrice = round2(cartItems.reduce((a, c) => a+ c.price *c.quantity, 0));
        const shippingPrice = itemsPrice > 200 ? 0 : 15;
        const taxPrice = round2(itemsPrice * 0.15);
        const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
        useEffect(()=>{
            if(!paymentMethod){ // if the user is already logged in... jump back to home
                router.push('/payment');
            }
        },[])
        return (
            <Layout title='Shopping Cart'>
                <CheckoutWizard activeStep={3}/>
                <Typography variant='h1' component='h1'>Placeorder</Typography>
                
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>

                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component='h2' variant='h2'>
                                        Shipping Address
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {shippingAddress.fullName}, {shippingAddress.address}, {' '},
                                    {shippingAddress.city}, {shippingAddress.postalCode}, {' '},
                                    {shippingAddress.country}
                                </ListItem>
                            </List>
                        </Card>

                        <Card className={classes.section}>
                            <List>
                                <ListItem>
                                    <Typography component='h2' variant='h2'>
                                        Payment method
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {paymentMethod}
                                </ListItem>
                            </List>
                        </Card>

                        <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography components="h2" variant="h2">Order Items</Typography>
                            </ListItem>
                            <ListItem>
                            <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='right'>name</TableCell>
                                        <TableCell align='right'>Quantity</TableCell>
                                        <TableCell align='right'>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item)=>(
                                        <TableRow key={item.id}>
                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`} passHref>
                                            <Link>
                                                <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                ></Image>
                                            </Link>
                                            </NextLink>
                                        </TableCell>

                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`}>
                                                    <Link>
                                                        <Typography>{item.name}</Typography>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>

                                            <TableCell>
                                                    <Typography>{item.quantity}</Typography>
                                            </TableCell>
    
                                            <TableCell>
                                                    <Typography>$ {item.price}</Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </ListItem>
                        </List>
                        </Card>
                    </Grid>
                    <Grid md={3} xs={12}>
                            <List>
                                <ListItem>
                                    <Typography variant='h2'>
                                        Order Summary
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                        <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Items:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">${itemsPrice}</Typography>
                                        </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Tax:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">${taxPrice}</Typography>
                                        </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Shipping:</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">${shippingPrice}</Typography>
                                        </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>
                                            <strong>Total:</strong>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography align="right">
                                            <strong>${totalPrice}</strong>
                                            </Typography>
                                        </Grid>
                                        </Grid>
                                    </ListItem>
                                <ListItem>
                                    <Button variant='contained' color='primary' fullwidth>Place Order</Button>
                                </ListItem>
                            </List>
                    </Grid>
                </Grid>
            </Layout>
        )
    }
export default dynamic(()=> Promise.resolve(Placeorder), {ssr:false});
// cart items not requried to be one the server side hence it is only presented on teh client side
    