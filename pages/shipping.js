import React, { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Store } from '../utils/store';

const Shipping = () => {
    const router = useRouter();
    router.push('/login');
    const {state, dispatch} = useContext(Store);
    const {userInfo} = state;
    // redirecting
    if(!userInfo){
        router.push('/login?redirect=/shipping');
    }
    return (
        <div>
            Shipping screen
        </div>
    )
}
export default Shipping;
