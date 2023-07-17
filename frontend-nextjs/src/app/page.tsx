'use client'
import React, {useEffect, useCallback, useState} from "react";

export default function Home() {
    const [ref, setRef] = useState()

    const onPasskeyNotExists = useCallback((_event) => {
        console.log("passkey for this user and device does not exists")
    }, [])

    const onPasskeyLoginFailed = useCallback((event) => {
        console.log("passkey login not successful due to this error")
        console.error(event.detail)
    }, [])

    const onPasskeyLoginSuccessful = useCallback((_event) => {
        console.log("passkey login successful")
    }, [])

    useEffect(() => {
        if (ref) {
            ref.addEventListener('passkey-not-exists', onPasskeyNotExists)
            ref.addEventListener('passkey-login-successful', onPasskeyLoginSuccessful)
            ref.addEventListener('passkey-login-failed', onPasskeyLoginFailed)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener('passkey-not-exists', onPasskeyNotExists)
                ref.removeEventListener('passkey-login-successful', onPasskeyLoginSuccessful)
                ref.removeEventListener('passkey-login-failed', onPasskeyLoginFailed)
            }
        };

    }, [ref, onPasskeyNotExists, onPasskeyLoginSuccessful, onPasskeyLoginFailed])

    return (
        <div>
            <script src="https://pro-1816608956215787878.frontendapi.corbado.io/auth.js"></script>
            <h1>Welcome</h1>
            <p>This page serves as a login page. Besides passkey login, you can offer also your traditional login with
                e.g. passwords here.</p>
            <corbado-passkey-associate-login
                project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                ref={setRef}
            />
        </div>

    )
}
