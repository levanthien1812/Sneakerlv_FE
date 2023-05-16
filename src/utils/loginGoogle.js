import {
    actions as authActions
} from "../store/auth";
import jwt_decode from "jwt-decode";
import { setToken } from "./auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as cartActions } from "../store/cart";
import { fetchCartItems } from "../store/cart";
import { Stack } from "@mui/material";

export function LoginGoogle() {
    const dispatch = useDispatch()
    const loginGoogleHandler = async (response) => {
        const userDecoded = jwt_decode(response.credential);

        const user = {
            name: userDecoded.name,
            email: userDecoded.email,
            picture: userDecoded.picture,
        };

        try {
            const response = await fetch(
                "http://localhost:3000/api/users/create-google-user", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user))
            dispatch(authActions.setAuthen())
            dispatch(authActions.setIsLoggingIn(false));
            dispatch(fetchCartItems())
            dispatch(_fetchAddresses());
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "396993378300-o0fcpjn2394autvsiksa0rvvqf1suooq.apps.googleusercontent.com",
            callback: loginGoogleHandler,
        });

        google.accounts.id.renderButton(
            document.getElementById("signInByGoogleDiv"), {
                theme: "outline",
                size: "large"
            }
        );
    }, [])

    return <Stack id="signInByGoogleDiv"></Stack>
}

