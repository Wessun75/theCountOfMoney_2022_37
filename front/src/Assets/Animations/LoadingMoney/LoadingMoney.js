import React from 'react';
import Lottie from 'react-lottie';
import animationData from './LoadingMoney.json'

export default function LoadingMoney() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
            />
            <p>Loading...</p>
        </div>
    );
}