using System;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GetChatMessage
	{
		public GetUser UserViewmodel { get; set; }

		public string Message {get;set;}

		public DateTime WhenCreated {get;set;}

		public GetChatMessage() { }

		public GetChatMessage(ChatMessage chatMessage)
		{
			UserViewmodel = new GetUser(chatMessage.User);
			Message = chatMessage.Message;
			WhenCreated = chatMessage.WhenCreated;
		}
	}
}
