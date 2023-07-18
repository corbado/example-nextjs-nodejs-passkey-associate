'use client'

import React, {useEffect, useCallback, useState} from "react"
import '@corbado/webcomponent'

interface EventDetail {
    type: string
}

export default function Home() {
    const [ref, setRef] = useState<any | null>(null)

    const onAuthEvent = useCallback((_event: CustomEvent<EventDetail[]>) => {
        switch (_event.detail[0].type) {
            case "PASSKEY_LOGIN_SUCCESSFUL":
                console.log("passkey login successful")
                break
            case "PASSKEY_LOGIN_FAILED":
                console.log("passkey login failed")
                break
            case "PASSKEY_NOT_EXISTS":
                console.log("passkey not exists")
                break
            default:
                console.log("default")
        }
    }, [])

    useEffect(() => {
        // This will run only on client-side

        if (ref) {
            ref.addEventListener('auth', onAuthEvent)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener('auth', onAuthEvent)
            }
        }
    }, [ref, onAuthEvent])

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
