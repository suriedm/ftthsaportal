"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function PaymentSuccess() {
    const parameters = useParams();
    const { replace } = useRouter();

    useEffect(() => {
        console.log(parameters)
        if (parameters?.device_reference) {
            try {
                window.localStorage.setItem("device", JSON.stringify(parameters.device_reference))
                replace("/")
            } catch (error) {

                console.error(error);
            }
        } else {
            console.warn("No device info was found, please contact service provider for assistance");

        }
    }, []);

    return (
        <div>New user lands here for payment</div>
    );
}
