using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    public interface IForumTopicRepository
    {
        void Add(ForumTopic item);

        IEnumerable<ForumTopic> GetAll();

        ForumTopic Find(int id, bool eager);

        ForumTopic Find(string title, bool eager);

        void Remove(int id);

        void Update(ForumTopic item);
    }
}
