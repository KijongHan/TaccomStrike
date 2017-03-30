using AvaNet.DataAccessLayer;
using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Data
{
    public class DbInitializer
    {
        public static void Initialize(IForumTopicRepository forumTopicRepository)
        {
            var topics = new ForumTopic[]
            {
                new ForumTopic { Title="General Discussion", Description="General discussion topics" }
            };

            foreach (ForumTopic topic in forumTopicRepository.GetAll())
            {
                forumTopicRepository.Remove(topic.ForumTopicID);
            }

            foreach (ForumTopic topic in topics)
            {
                //There is currently no topic with the specified title, so create forum topic
                if (forumTopicRepository.Find(topic.Title) == null)
                {
                    forumTopicRepository.Add(topic);
                }
            }
        }
    }
}
