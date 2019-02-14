const Config = require('Config');

import { GetChatRoom } from "../../models/rest/getchatroom";

export class ChatRoomsService 
{
    static getChatRooms = () => 
    {
        return fetch(`${Config.apiUrl}/api/chatrooms`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((response: Response) => {
            return response
                .json()
                .then((value: any) => {
                    return <GetChatRoom[]>value;
                });
        });
    }
}