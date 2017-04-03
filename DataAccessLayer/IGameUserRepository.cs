using AvaNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvaNet.DataAccessLayer
{
    public interface IGameUserRepository
    {
        GameUser Find(string id);

        void Update(GameUser gameUser);

        void Add(GameUser gameUser);
    }
}
