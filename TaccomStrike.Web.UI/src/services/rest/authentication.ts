import { PostUserLogin } from "../../models/rest/postuserlogin"
import { GetUser } from "../../models/rest/getuser";

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
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetUser>value;
                });
        });
    }
}