'use client'

import React, {useState, useEffect, useCallback} from "react"
import axios from "axios"
import ('@corbado/webcomponent')

const PASSKEY_CREATION_SUCCESSFUL = "PASSKEY_CREATION_SUCCESSFUL"
const PASSKEY_CREATION_FAILED = "PASSKEY_CREATION_FAILED"
const DEVICE_NOT_PASSKEY_READY = "DEVICE_NOT_PASSKEY_READY"

interface AssociationToken {
    associationToken: string
}

interface EventDetail {
    type: string
}

export default function Profile() {
    const [associationToken, setAssociationToken] = useState<AssociationToken | null>(null)
    const [ref, setRef] = useState<any | null>(null)

    const onAuthEvent = useCallback((_event: CustomEvent<EventDetail[]>) => {
        switch (_event.detail[0].type) {
            case "PASSKEY_CREATION_SUCCESSFUL":
                console.log("passkey creation successful")
                break
            case "PASSKEY_CREATION_FAILED":
                console.log("passkey creation failed")
                break
            case "DEVICE_NOT_PASSKEY_READY":
                console.log("device not passkey ready")
                break
            default:
                console.log("default")
        }
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


    const handleButtonClick = async () => {
        try {
            // loginIdentifier & loginIdentifierType need to be obtained via a backend call or your current state / session management
            const response = await axios.post<AssociationToken>(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/createAssociationToken", {
                loginIdentifier: "vincent+16@corbado.com",
                loginIdentifierType: "email"
            })
            setAssociationToken(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>This page is only accessible for users that have been authenticated with your existing authentication
                system.</p>
            <button onClick={handleButtonClick}>Add passkey to my account</button>

            {associationToken &&
                <corbado-passkey-associate
                    project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                    association-token={associationToken}
                    ref={setRef}
                />}

        </div>
    )
}