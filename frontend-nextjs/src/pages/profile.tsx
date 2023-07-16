import {useState, useEffect, useCallback} from "react";
import axios from "axios";

export default function Profile() {
    const [associateToken, setAssociateToken] = useState();
    const [ref, setRef] = useState()

    const onDeviceNotPasskeyReady = useCallback((_event) => {
        console.log("device is not ready for passkeys")
    }, [])

    const onPasskeyCreationFailed = useCallback((event) => {
        console.log("passkey could not be created due to this error")
        console.error(event.detail)
    }, [])

    const onPasskeyCreationSuccessful = useCallback((_event) => {
        console.log("passkey was created successfully")
    }, [])

    useEffect(() => {
        if (ref) {
            ref.addEventListener('device-not-passkey-ready', onDeviceNotPasskeyReady)
            ref.addEventListener('passkey-creation-successful', onPasskeyCreationSuccessful)
            ref.addEventListener('passkey-creation-failed', onPasskeyCreationFailed)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener('device-not-passkey-ready', onDeviceNotPasskeyReady)
                ref.removeEventListener('passkey-creation-successful', onPasskeyCreationSuccessful)
                ref.removeEventListener('passkey-creation-failed', onPasskeyCreationFailed)
            }
        };

    }, [ref, onDeviceNotPasskeyReady, onPasskeyCreationSuccessful, onPasskeyCreationFailed])


    const handleButtonClick = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/createAssociationToken", {
                loginIdentifier: "test5@web.de",
                loginIdentifierType: "email"
            })

            // @ts-ignore
            setAssociateToken(response.data);
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
            {associateToken &&
                <corbado-passkey-associate
                    ref={setRef}
                    project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                    association-token={associateToken}
                />}
        </div>
    )
}
