using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Models
{
    public class PinnedForumThreads
    {

        public int PinnedForumThreadsID { get; set; }

        public ICollection<ForumThread> ForumThreads { get; set; }

    }
}
