import React from 'react';
import { Stepper, StepLabel, Step } from '@material-ui/core';

// this components shows the highlighted of every stage of the order process
const CheckoutWizard = ({activeStep = 0}) => { // initial step is set to 0
    const paymentSteps = ['Login', 'Shipping', 'Payment Method', 'Place Order'];
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {paymentSteps.map((step)=>(
                <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default CheckoutWizard;
