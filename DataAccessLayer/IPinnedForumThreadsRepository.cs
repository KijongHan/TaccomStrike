using AvaNet.Models;
using AvaNet.Models.ViewModels.ForumViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    /// <summary>
    /// There will only be one instance of this view model in the database
    /// </summary>
    public interface IPinnedForumThreadsRepository
    {
        void Add(PinnedForumThreads pinnedForumThreads);

        void Update(PinnedForumThreads pinnedForumThreads);

        PinnedForumThreads Find();
    }
}
