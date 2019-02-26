const Config = require('Config');

import { CreateUserLogin } from "../../models/rest/createuserlogin";
import { GetUser } from "../../models/rest/getuser";
import { isNullOrUndefined } from "util";
import { GetUserComplete } from "../../models/rest/getusercomplete";

export class UserLoginsService 
{
    static createUserLogin = (createUserLogin: CreateUserLogin) => 
    {
        return fetch(`${Config.apiUrl}/api/users`, {
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
        return fetch(Config.apiUrl + `/api/users?username=${isNullOrUndefined(username) ? "" : username}&email=${isNullOrUndefined(email) ? "" : email}`, {
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

    static getConnectedUsersCount = () => 
    {
        return fetch(`${Config.apiUrl}/api/users/connected/count`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <number>value;
                });
        });
    }

    static getLeaderboard = (top: number) => 
    {
        return fetch(`${Config.apiUrl}/api/users/leaderboard?top=${top}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetUserComplete[]>value;
                });
        });
    }
}