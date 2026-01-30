"use client";

import React from 'react'
import { GoogleReCaptchaProvider as GRP } from 'react-google-recaptcha-v3'

interface GoogleCapchaProviderProps {
    children: React.ReactNode;
    reCaptchaKey: string;
}

const GoogleCaptchaProvider = ({ children, reCaptchaKey }: GoogleCapchaProviderProps) => {
    return (
        <GRP
            reCaptchaKey={reCaptchaKey}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            {children}
        </GRP>
    )
}

export default GoogleCaptchaProvider