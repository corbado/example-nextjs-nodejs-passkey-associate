'use client'

import React, {useEffect, useCallback, useState} from "react"

const PASSKEY_LOGIN_SUCCESSFUL = "PASSKEY_LOGIN_SUCCESSFUL"
const PASSKEY_LOGIN_FAILED = "PASSKEY_LOGIN_FAILED"
const PASSKEY_NOT_EXISTS = "PASSKEY_NOT_EXISTS"

interface EventDetail {
    type: any;
}

export default function Home() {
    const [ref, setRef] = useState<any | null>(null)

    const onPasskeyLoginSuccessful = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onPasskeyLoginFailed = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onPasskeyNotExists = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    useEffect(() => {
        import ('@corbado/webcomponent')

        if (ref) {
            ref.addEventListener(PASSKEY_LOGIN_SUCCESSFUL, onPasskeyLoginSuccessful)
            ref.addEventListener(PASSKEY_LOGIN_FAILED, onPasskeyLoginFailed)
            ref.addEventListener(PASSKEY_NOT_EXISTS, onPasskeyNotExists)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener(PASSKEY_LOGIN_SUCCESSFUL, onPasskeyLoginSuccessful)
                ref.removeEventListener(PASSKEY_LOGIN_FAILED, onPasskeyLoginFailed)
                ref.removeEventListener(PASSKEY_NOT_EXISTS, onPasskeyNotExists)
            }

        };
    }, [ref, onPasskeyLoginSuccessful, onPasskeyLoginFailed, onPasskeyNotExists])

    return (
        <div>
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
