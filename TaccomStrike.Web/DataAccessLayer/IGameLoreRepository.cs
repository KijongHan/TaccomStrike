using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    public interface IGameLoreRepository
    {
        void Add(GameLore gameLore);

        IEnumerable<GameLore> GetAll();

        void Remove(int id);

        void Update(GameLore item);

        GameLore Find(int id);

        GameLore Find(string title);
    }
}
