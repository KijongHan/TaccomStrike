using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    public interface IForumThreadRepository
    {
        void Add(ForumThread item);

        IEnumerable<ForumThread> GetAll();

        ForumThread Find(int id);

        void Remove(int id);

        void Update(ForumThread item);
    }
}
