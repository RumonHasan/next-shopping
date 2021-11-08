import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

// stringify conversions in order to parse data
const userInfoParse = JSON.stringify(Cookies.get('userInfo'));
const shipAddress = JSON.stringify(Cookies.get('shippingAddress'));
const initialState = {
    darkMode:Cookies.get('darkMode') === 'ON' ? true: false, // getting the user preference frmo the cookie
    cart:{
        cartItems:Cookies.get('cartItems')? JSON.parse(Cookies.get('cartItems')): [],
        shippingAddress: Cookies.get('shippingAddress') ? JSON.parse(shipAddress): {},
        paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod'): '',
    },
    userInfo: Cookies.get('userInfo')
    ? JSON.parse(userInfoParse)
    : null,
};

const reducer = (state, action)=>{
    switch(action.type){
        case 'DARK_MODE_ON':
            return{
                ...state,
                darkMode: true
            }
        case 'DARK_MODE_OFF':
            return{
                ...state,
                darkMode: false
            }
        case 'CART_ADD_ITEM':{
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id);
            const cartItems = existItem ? 
            state.cart.cartItems.map((item)=>
            item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems', JSON.stringify(cartItems)); // loading the cart items in the cookies
            return {
                ...state,
                cart: {...state.cart,
                    cartItems
                }
            }
        }
        case 'CART_REMOVE_ITEM':
            const cartItems = state.cart.cartItems.filter((item)=>item._id !== action.payload._id);
            return {
                ...state,
                cart: {...state.cart, cartItems}
            }
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart:{
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart:{
                    ...state.cart,
                    paymentMethod: action.payload,
                }
            }
        // login
        case 'USER_LOGIN':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartItems:[]
                }
            }
        default:
            return state;
    }
}
// primary store provider for state distribution
export const StoreProvider = (props)=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch}; // storing state and dispatch within value
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}