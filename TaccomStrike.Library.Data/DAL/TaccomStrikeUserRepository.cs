using library.data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace TaccomStrike.Library.Data.DAL
{
    public class TaccomStrikeUserRepository
    {
        private readonly TaccomStrikeContext context;

        public TaccomStrikeUserRepository(TaccomStrikeContext context)
        {
            this.context = context;
        }


    }
}
