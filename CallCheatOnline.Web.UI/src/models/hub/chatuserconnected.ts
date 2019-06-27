import { GetUser } from "../rest/getuser";

export class ChatUserConnected 
{
    newUser: GetUser;
    connectedUsers: GetUser[];
}