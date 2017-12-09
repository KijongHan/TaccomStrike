public class GetUserLogin 
{
    public int UserLoginID {get;set;}
    public string Username { get; set; }
    public string PasswordSalt { get; set; }
    public string PasswordHash { get; set; }
}