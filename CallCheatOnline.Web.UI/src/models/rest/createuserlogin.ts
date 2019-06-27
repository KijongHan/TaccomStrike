export class CreateUserLogin 
{
    username: string;
    confirmPassword: string;
    password: string;
    email: string;

    constructor() 
    {
        this.username = "";
        this.confirmPassword = "";
        this.password = "";
        this.email = "";
    }
}