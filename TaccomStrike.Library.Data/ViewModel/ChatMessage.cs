using System;

namespace TaccomStrike.Library.Data.ViewModel {
    public class ChatMessage {

        public int UserID {get;set;}

        public string UserName {get;set;}

        public string MessageContent {get;set;}

        public DateTime WhenCreated {get;set;}

    }
}
