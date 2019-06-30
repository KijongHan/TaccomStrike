using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CallCheatOnline.Library.Data.Model;

namespace CallCheatOnline.Library.Data.DAL {

    public class AppSettingProgramRepository {

        private readonly CallCheatOnlineContext context;

        public AppSettingProgramRepository(CallCheatOnlineContext context)
        {
            this.context = context;
        }

        public List<AppSettingProgram> GetAppSettingPrograms() {
            var list = context.AppSettingProgram.ToList();
            return list;
        }
    }

}