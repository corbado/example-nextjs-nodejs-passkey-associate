'use client'
import React, {useRef, useEffect, useCallback} from "react";

export default function Home() {
    const refPasskeyAssociateLogin = useRef();

    // @ts-ignore
    const handleEvent = useCallback((event) => {
        switch (event.detail[0].type) {
            case "PASSKEY_LOGIN_SUCCESSFUL": {
                console.log("PASSKEY_LOGIN_SUCCESSFUL");
                break;
            }
            case "PASSKEY_LOGIN_FAILED": {
                console.log("PASSKEY_CREATION_FAILED");
                break;
            }
            case "PASSKEY_NOT_EXISTS": {
                console.log("PASSKEY_NOT_EXISTS");
                break;
            }
            default:
                console.log("default")
        }
    }, []);

    useEffect(() => {
        const element = refPasskeyAssociateLogin.current;
        const events = ['passkey-not-exists', 'passkey-login-successful', 'passkey-login-failed'];


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

    return (
        <div>
            <script src="https://pro-1816608956215787878.frontendapi.corbado.io/auth.js"></script>
            <h1>Welcome</h1>
            <p>This page serves as a login page. Besides passkey login, you can offer also your traditional login with
                e.g. passwords here.</p>
            <corbado-passkey-associate-login
                project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                ref={refPasskeyAssociateLogin}
            />
        </div>

    )
}
