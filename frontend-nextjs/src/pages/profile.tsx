import {useRef, useState, useEffect, useCallback} from "react";
import axios from "axios";

export default function Profile() {
    const [associateToken, setAssociateToken] = useState(null);
    const refPasskeyAssociate = useRef();

    // @ts-ignore
    const handleEvent = useCallback((event) => {
        switch (event.detail[0].type) {
            case "PASSKEY_CREATION_SUCCESSFUL": {
                console.log("PASSKEY_CREATION_SUCCESSFUL");
                break;
            }
            case "PASSKEY_CREATION_FAILED": {
                console.log("PASSKEY_CREATION_FAILED");
                break;
            }
            case "DEVICE_NOT_PASSKEY_READY": {
                console.log("DEVICE_NOT_PASSKEY_READY");
                break;
            }
            default:
                console.log("default")
        }
    }, []);

    useEffect(() => {
        const element = refPasskeyAssociate.current;
        const events = ['device-not-passkey-ready', 'passkey-creation-successful', 'passkey-creation-failed'];


        if (element) {
            events.forEach(event => {
                // @ts-ignore
                element.addEventListener(event, handleEvent);
            })
        }


        // Cleanup function
        return () => {
            if (element) {
                events.forEach(event => {
                    // @ts-ignore
                    element.removeEventListener(event, handleEvent);
                })
            }

        };
    }, [handleEvent])


    const handleButtonClick = async () => {
        try {
            axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/createAssociationToken", {
                loginIdentifier: "test5@web.de",
                loginIdentifierType: "email"
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

                .then(response => {

                    console.log("associateToken: ", associateToken)
                    // @ts-ignore
                    setAssociateToken(response.data);
                })
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
                    ref={refPasskeyAssociate}
                    project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                    association-token={associateToken}
                ></corbado-passkey-associate>}
        </div>
    )
}
