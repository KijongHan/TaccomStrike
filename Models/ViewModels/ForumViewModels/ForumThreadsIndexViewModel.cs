using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models.ViewModels.ForumViewModels
{
    public class ForumThreadsIndexViewModel
    {
        public string ForumTopicTitle { get; set; }

        public int ForumTopicID { get; set; }

        public IEnumerable<ForumThread> ForumThreads { get; set; }
    }
}
