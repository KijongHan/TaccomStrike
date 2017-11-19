using library.data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaccomStrike.Library.Data.ViewModel;

namespace TaccomStrike.Library.Data.DAL
{
    public class TaccomStrikeUserRepository
    {
        private readonly TaccomStrikeContext context;

        public TaccomStrikeUserRepository(TaccomStrikeContext context)
        {
            this.context = context;
        }

        public GetTaccomStrikeUser GetTaccomStrikeUser(string username)
        {
            var user = context.TaccomStrikeUser
                .Where((item) => item.Username == username)
                .Select((item) =>
                new GetTaccomStrikeUser()
                {
                    Username = item.Username,
                    PasswordSalt = item.PasswordSalt,
                    PasswordHash = item.PasswordHash
                })
                .FirstOrDefault();
            return user;
        }

        public int CreateTaccomStrikeUser(CreateTaccomStrikeUser user, string passwordSalt, string passwordHash)
        {
            TaccomStrikeUser insertUser = new TaccomStrikeUser()
            {
                Username = user.Username,
                PasswordSalt = passwordSalt,
                PasswordHash = passwordHash
            };
            context.TaccomStrikeUser.Add(insertUser);
            context.SaveChanges();
            return insertUser.TaccomStrikeUserId;
        }
    }
}
