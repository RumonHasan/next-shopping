import { Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell,
TableBody, Link, Select, MenuItem, Button, List, ListItem } from '@material-ui/core';
import React, {useContext} from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';

 const CartScreen = () => {
     const { state, dispatch } = useContext(Store);
     const {cart} = state;
     console.log(cart.cartItems);

     // adding the items directly to the cart
     const updateCartHandler = async (item, number)=>{
        const { data } = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock < number){
            window.alert('product not in stock');
            return;
        }
        dispatch({type:'CART_ADD_ITEM', payload: {...item, quantity: number}})
     }
     // removing an item
     const removeItemHandler = (item)=>{
        dispatch({type:'CART_REMOVE_ITEM', payload:item})
     }
    return (
        <Layout title='Shopping Cart'>
            <Typography variant='h1' component='h1'>Shopping Cart</Typography>
            {cart.cartItems.length === 0 ? (<div>
                cart is empty. <NextLink href='/' passHref><Link>Go shopping</Link></NextLink>
            </div>) : 
            (<Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>name</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Price</TableCell>
                                    <TableCell align='right'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.cartItems.map((item)=>(
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`}>
                                                <Link>
                                                    <Image src={item.image} alt={item.name} width={50} height={50}/>
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

                                        <Select value={item.quantity} onChange={(e)=>updateCartHandler(item, e.target.value)}>
                                            {[...Array(item.countInStock).keys()].map((x)=>
                                            (<MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>))}
                                        </Select>

                                        <TableCell>
                                                <Typography>$ {item.price}</Typography>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Button onClick={()=>removeItemHandler(item)} variant='contained' color='secondary'>x</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid md={3} xs={12}>
                        <List>
                            <ListItem>
                                <Typography variant='h2'>
                                    Subtotal ({cart.cartItems.reduce((a,c)=> a + c.quantity, 0)}{' '}items)
                                    : ${' '} {cart.cartItems.reduce((a,c)=> a + c.quantity * c.price, 0)}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button variant='contained' color='primary' fullwidth>CheckOut</Button>
                            </ListItem>
                        </List>
                </Grid>
            </Grid>)}
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false});
// cart items not requried to be one the server side hence it is only presented on teh client side
