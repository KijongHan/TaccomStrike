import { GetGameLobby } from "../../models/rest/getgamelobby";
import { CreateGameLobby } from "../../models/rest/creategamelobby";

export class GameLobbiesService 
{
    static createGameLobby = (createGameLobby: CreateGameLobby) => 
    {
        return fetch("http://localhost:50248" + "/api/gamelobbies", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(createGameLobby)
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetGameLobby>value;
                });
        });
    }

    static getChatRooms = () => 
    {
        return fetch("http://localhost:50248" + "/api/gamelobbies", {
            method: 'GET',
            credentials: 'include'
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetGameLobby[]>value;
                });
        });
    }
}