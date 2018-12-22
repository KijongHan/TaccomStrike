import { GetChatRoom } from "../../models/rest/getchatroom";

export class ChatRoomsService 
{
    static getChatRooms = () => 
    {
        return fetch("http://localhost:50248" + "/api/chatrooms", {
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