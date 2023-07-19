'use client'

import React, {useEffect, useCallback, useState} from "react"
import '@corbado/webcomponent'

const PASSKEY_CREATION_SUCCESSFUL = "PASSKEY_CREATION_SUCCESSFUL"
const PASSKEY_CREATION_FAILED = "PASSKEY_CREATION_FAILED"
const DEVICE_NOT_PASSKEY_READY = "DEVICE_NOT_PASSKEY_READY"

interface EventDetail {


    type: any;
}

export default function Home() {
    const [ref, setRef] = useState<any | null>(null)

    const onPasskeyLoginSuccessful = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onPasskeyLoginnFailed = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onPasskeyNotExists = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    useEffect(() => {
        // This will run only on client-side

        if (ref) {
            ref.addEventListener(PASSKEY_CREATION_SUCCESSFUL, onPasskeyCreationSuccessful)
            ref.addEventListener(PASSKEY_CREATION_FAILED,onPasskeyCreationFailed)
            ref.addEventListener(DEVICE_NOT_PASSKEY_READY, onPasskeyNotExists)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener(PASSKEY_CREATION_SUCCESSFUL, onPasskeyCreationSuccessful)
                ref.removeEventListener(PASSKEY_CREATION_FAILED,onPasskeyCreationFailed)
                ref.removeEventListener(DEVICE_NOT_PASSKEY_READY, onPasskeyNotExists)
            }

        };
    }, [ref, onPasskeyCreationSuccessful, onPasskeyCreationFailed, onDeviceNotPasskeyReady])

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
