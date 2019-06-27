using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    public interface IForumLikeRepository
    {
        void Add(ForumLike like);

        void Update(ForumLike like);
    }
}
