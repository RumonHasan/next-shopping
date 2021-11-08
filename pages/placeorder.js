import { Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell,
    TableBody, Link, Select, MenuItem, Button, List, ListItem, Card } from '@material-ui/core';
    import React, {useContext} from 'react';
    import Layout from '../components/Layout';
    import { Store } from '../utils/store';
    import NextLink from 'next/link';
    import Image from 'next/image';
    import dynamic from 'next/dynamic';
    import { useRouter } from 'next/dist/client/router';
import useStyles from '../utils/styles';
    
     const Placeorder = () => {
         const { state, dispatch } = useContext(Store);
         const { cart:{shippingAddress, cartItems, paymentMethod}} = state;
         const router = useRouter();
        const classes = useStyles();
        return (
            <Layout title='Shopping Cart'>
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
    