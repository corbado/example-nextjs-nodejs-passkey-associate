import React, {useState, useEffect, useCallback, useRef} from "react";
import axios from "axios";

interface AssociationToken {
    associationToken: string;
}

interface EventDetail {
    type: string;
}

export default function Profile() {
    const [associationToken, setAssociationToken] = useState<AssociationToken | null>(null);
    const [ref, setRef] = useState<any | null>(null);

    const onAuthEvent = useCallback((_event: CustomEvent<EventDetail[]>) => {
        switch (_event.detail[0].type) {
            case "PASSKEY_CREATION_SUCCESSFUL":
                console.log("passkey creation successful");
                break;
            case "PASSKEY_CREATION_FAILED":
                console.log("passkey creation failed");
                break;
            case "DEVICE_NOT_PASSKEY_READY":
                console.log("device not passkey ready");
                break;
            default:
                console.log("default")
        }
    }, [])


    useEffect(() => {
        if (ref) {
            ref.addEventListener('auth', onAuthEvent)
        }

        // Cleanup function
        return () => {
            if (ref) {
                ref.removeEventListener('auth', onAuthEvent)
            }
        };
    }, [ref, onAuthEvent])


    const handleButtonClick = async () => {
        try {
            // loginIdentifier & loginIdentifierType need to be obtained via a backend call or your current state / session management
            const response = await axios.post<AssociationToken>(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/createAssociationToken", {
                loginIdentifier: "vincent+12@corbado.com",
                loginIdentifierType: "email"
            })
            setAssociationToken(response.data);
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