import {UserLogin} from "../viewmodels/userlogin"

export class AuthenticationService
{
    static login = (userLogin: UserLogin) => 
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