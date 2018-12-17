import { PostUserLogin } from "../models/rest/postuserlogin"

export class AuthenticationService
{
    static userLogin = (userLogin: PostUserLogin) => 
    {
        return fetch("http://localhost:50248" + "/api/authentication/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userLogin)
        })
    }
}