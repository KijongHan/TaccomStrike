using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaccomStrike.Library.Data.Model;

namespace TaccomStrike.Library.Data.DAL {

    public class AppSettingProgramRepository {

        private readonly TaccomStrikeContext context;

        public AppSettingProgramRepository(TaccomStrikeContext context)
        {
            this.context = context;
        }

        public List<AppSettingProgram> GetAppSettingPrograms() {
            var list = context.AppSettingProgram.ToList();
            return list;
        }
    }

}