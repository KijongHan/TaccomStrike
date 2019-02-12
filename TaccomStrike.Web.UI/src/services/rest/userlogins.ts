import { CreateUserLogin } from "../../models/rest/createuserlogin";
import { GetUser } from "../../models/rest/getuser";
import { isNullOrUndefined } from "util";

export class UserLoginsService 
{
    static createUserLogin = (createUserLogin: CreateUserLogin) => 
    {
        return fetch("http://localhost:50248" + "/api/users", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(createUserLogin)
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetUser>value;
                });
        });
    }

    static getUsers = (username: string, email: string) => 
    {
        console.log(username + "|" + email);
        return fetch("http://localhost:50248" + `/api/users?username=${isNullOrUndefined(username) ? "" : username}&email=${isNullOrUndefined(email) ? "" : email}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetUser[]>value;
                });
        });
    }
}