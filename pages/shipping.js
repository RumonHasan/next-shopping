import React, { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Store } from '../utils/store';

const Shipping = () => {
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {userInfo} = state;
    // redirecting
    if(!userInfo){
        router.push('/login?redirect=/shipping');// all redirects if user is not present goes to shipping
        // if user does not exist redirect user to login and direct to shipping after loggin
    }
    return (
        <div>
            Shipping screen
        </div>
    )
}
export default Shipping;
