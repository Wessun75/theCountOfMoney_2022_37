import React from 'react';
import Lottie from 'react-lottie';
import animationData from './404.json'

export default function NotFoundAnimation() {
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={350}
                width={350}
            />
        </div>
    );
}