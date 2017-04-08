using AvaNet.DataAccessLayer;
using AvaNet.Models;
using AvaNet.Models.ViewModels.ForumViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.Data
{
    public class DbInitializer
    {
        public static async void Initialize(
            IPinnedForumThreadsRepository pinnedForumThreadsRepository, 
            IForumTopicRepository forumTopicRepository, 
            IGameLoreRepository gameLoreRepository, 
            RoleManager<IdentityRole> roleManager)
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
                new GameLore { Title="NetSEC", ImageURL="/images/gamelores/netsec.jpg", Content="write here." },
                new GameLore { Title="Nationalist Frontier", ImageURL="/images/gamelores/nationalistfrontier.jpg", Content="write here." },
                new GameLore { Title="Unified Republic", ImageURL="/images/gamelores/unifiedrepublic.jpg", Content="write here." },
            };

            var roles = new string[]
            {
                "Administrator",
                "Moderator"
            };

            foreach (ForumTopic topic in topics)
            {
                //There is currently no topic with the specified title, so create forum topic
                if (forumTopicRepository.Find(topic.Title, false) == null)
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

            foreach (string role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            pinnedForumThreadsRepository.Add(new PinnedForumThreads());
        }
    }
}
