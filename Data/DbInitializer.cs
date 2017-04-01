using AvaNet.DataAccessLayer;
using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Data
{
    public class DbInitializer
    {
        public static void Initialize(IForumTopicRepository forumTopicRepository, IGameLoreRepository gameLoreRepository)
        {
            var topics = new ForumTopic[]
            {
                new ForumTopic { Title="Game News and Updates", Description="Discussion about the latest news topics or game updates"},
                new ForumTopic { Title="General Discussion", Description="Discussion about just general topics that don't belong anywhere else" },
                new ForumTopic { Title="Ideas and Suggestions", Description="Discussion about game ideas and other suggestions" },
                new ForumTopic { Title="Gameplay", Description="Discussion about the gameplay" },
                new ForumTopic { Title="Story", Description="Discussion about the story" }
            };

            var gameLores = new GameLore[]
            {
                new GameLore { Title="NetSEC", ImageURL=Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "gamelores", "netsec.jpg"), Content="write here." },
                new GameLore { Title="Nationalist Frontier", ImageURL=Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "gamelores", "nationalistfrontier.jpg"), Content="write here." },
                new GameLore { Title="The Old Republic", ImageURL=Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "gamelores", "theoldrepublic.jpg"), Content="write here." },
            };

            foreach (ForumTopic topic in topics)
            {
                //There is currently no topic with the specified title, so create forum topic
                if (forumTopicRepository.Find(topic.Title) == null)
                {
                    forumTopicRepository.Add(topic);
                }
            }

            foreach (GameLore gameLore in gameLores)
            {
                //There is currently no game lore with the specified title, so create game lore
                if (gameLoreRepository.Find(gameLore.Title) == null)
                {
                    gameLoreRepository.Add(gameLore);
                }
            }
        }
    }
}
