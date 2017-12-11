using System;
using TaccomStrike.Library.Utility.Security;
using Microsoft.AspNetCore.SignalR.Client;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:50249/chat")
                .WithConsoleLogger()
                .Build();

            connection.On<string>("Send", data =>
            {
                Console.WriteLine($"Received: {data}");
            });

            Test(connection);
            Console.ReadLine();
        }

        static async void Test(HubConnection connection) {
            await connection.StartAsync();

            await connection.InvokeAsync("Send", "Hello");
        }
    }
}
