using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvaNet.Models;
using AvaNet.Data;

namespace AvaNet.DataAccessLayer
{
    public class GameUserRepository : IGameUserRepository
    {
        private readonly ApplicationDbContext context;

        public GameUserRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Add(GameUser gameUser)
        {
            context.GameUsers.Add(gameUser);
            context.SaveChanges();
        }

        public GameUser Find(string id)
        {
            return context.GameUsers.FirstOrDefault(t => t.GameUserID.Equals(id));
        }

        public void Update(GameUser gameUser)
        {
            context.GameUsers.Update(gameUser);
            context.SaveChanges();
        }
    }
}
