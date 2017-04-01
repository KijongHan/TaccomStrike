using AvaNet.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models;

namespace AvaNet.DataAccessLayer
{
    public class GameLoreRepository : IGameLoreRepository
    {
        private readonly ApplicationDbContext context;

        public GameLoreRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(GameLore gameLore)
        {
            context.GameLores.Add(gameLore);
            context.SaveChanges();
        }

        public GameLore Find(string title)
        {
            return context.GameLores.FirstOrDefault(t => t.Title == title);
        }

        public GameLore Find(int id)
        {
            return context.GameLores.FirstOrDefault(t => t.GameLoreID==id);
        }

        public IEnumerable<GameLore> GetAll()
        {
            return context.GameLores.ToList();
        }

        public void Remove(int id)
        {
            GameLore gameLore = context.GameLores.First(t => t.GameLoreID==id);
            context.GameLores.Remove(gameLore);
            context.SaveChanges();
        }

        public void Update(GameLore item)
        {
            context.GameLores.Update(item);
            context.SaveChanges();
        }
    }
}
