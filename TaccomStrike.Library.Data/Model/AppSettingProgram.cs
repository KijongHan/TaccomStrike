using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TaccomStrike.Library.Data.Model {

    [Table("AppSettingProgram", Schema="app")]
    public class AppSettingProgram {

        [Key, Column("AppSettingProgramID")]
        public int AppSettingProgramID {get;set;}

        [Column("ProgramName")]
        public string ProgramName {get;set;}

        [Column("AppConfigFilePath")]
        public string AppConfigFilePath {get;set;}

    }

}