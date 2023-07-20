'use client'

import React, {useState, useEffect, useCallback} from "react"
import axios from "axios"
import Layout from '../components/Layout';

// Needed to use the Corbado passkey associate web components
import ('@corbado/webcomponent')

const PASSKEY_CREATION_SUCCESSFUL = "PASSKEY_CREATION_SUCCESSFUL"
const PASSKEY_CREATION_FAILED = "PASSKEY_CREATION_FAILED"
const DEVICE_NOT_PASSKEY_READY = "DEVICE_NOT_PASSKEY_READY"

// neeeded for TypeScript
interface AssociationToken {
    associationToken: string
}

interface EventDetail {
    type: string
}

export default function Profile() {
    const [associationToken, setAssociationToken] = useState<AssociationToken | null>(null)
    const [ref, setRef] = useState<any | null>(null)


    // The following event handlers can be used to react to different events from the web component
    const onPasskeyCreationSuccessful = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onPasskeyCreationFailed = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])

    const onDeviceNotPasskeyReady = useCallback((_event: CustomEvent<EventDetail>) => {
        console.log(_event)
    }, [])


    // Create and remove the event listeners
    useEffect(() => {
        if (ref) {
            ref.addEventListener(PASSKEY_CREATION_SUCCESSFUL, onPasskeyCreationSuccessful)
            ref.addEventListener(PASSKEY_CREATION_FAILED, onPasskeyCreationFailed)
            ref.addEventListener(DEVICE_NOT_PASSKEY_READY, onDeviceNotPasskeyReady)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener(PASSKEY_CREATION_SUCCESSFUL, onPasskeyCreationSuccessful)
                ref.removeEventListener(PASSKEY_CREATION_FAILED, onPasskeyCreationFailed)
                ref.removeEventListener(DEVICE_NOT_PASSKEY_READY, onDeviceNotPasskeyReady)
            }
        };
    }, [ref, onPasskeyCreationSuccessful, onPasskeyCreationFailed, onDeviceNotPasskeyReady])


    // Instead of clicking on a button, you can also start the backend API call, when the user opens a new page
    // It's only important to note, that you can only use the <corbado-passkey-associate/> web component if
    // an association token has been created before.
    const handleButtonClick = async () => {
        try {
            // loginIdentifier needs to be obtained via a backend call or your current state / session management
            // it should be a dynamic value depending on the current logged-in user
            const response = await axios.post<AssociationToken>(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/createAssociationToken", {
                loginIdentifier: "vincent+19@corbado.com",
                loginIdentifierType: "email"
            })
            setAssociationToken(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Layout>
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
        </Layout>
    )
}