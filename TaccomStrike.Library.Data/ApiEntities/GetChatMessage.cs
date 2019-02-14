using System;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.ViewModel
{
	public class GetChatMessage
	{
		public GetUser User { get; set; }

		public string Message {get;set;}

		public DateTime WhenCreated {get;set;}

		public GetChatMessage() { }

		public GetChatMessage(ChatMessage chatMessage)
		{
			User = new GetUser(chatMessage.User);
			Message = chatMessage.Message;
			WhenCreated = chatMessage.WhenCreated;
		}
	}
}
