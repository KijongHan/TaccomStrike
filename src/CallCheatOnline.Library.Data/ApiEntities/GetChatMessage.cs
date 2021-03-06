using System;
using CallCheatOnline.Library.Data.Model;

namespace CallCheatOnline.Library.Data.ViewModel
{
	public class GetChatMessage
	{
		public GetUser User { get; set; }

		public string Message {get;set;}

		public DateTime WhenCreated {get;set;}

		public GetChatMessage() { }

		public GetChatMessage(ChatMessage chatMessage)
		{
			if(chatMessage.User!=null)
			{
				User = new GetUser(chatMessage.User);
			}
			Message = chatMessage.Message;
			WhenCreated = chatMessage.WhenCreated;
		}
	}
}
