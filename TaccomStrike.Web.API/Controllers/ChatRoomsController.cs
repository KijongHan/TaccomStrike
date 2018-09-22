using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.IO;
using System.Text;
using TaccomStrike.Library.Utility.Security;
using TaccomStrike.Library.Data.Services;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Utility;

namespace TaccomStrike.Web.API.Controllers
{
	
	[Route("api/chatrooms")]
	[EnableCors("AllowSpecificOrigin")]
	public class ChatRoomsController : Controller
	{
		private ChatRoomService chatRoomService;

		public ChatRoomsController(ChatRoomService chatRoomService)
		{
			this.chatRoomService = chatRoomService;
		}

		[Route("")]
		[HttpGet]
		public IActionResult GetChatRooms()
		{
			var chatRooms = chatRoomService
				.GetChatRooms()
				.Where((item) => item.RoomType == ChatRoom.Type.Public)
				.ApiChatRooms();

			return Ok(chatRooms);
		}
	}
}