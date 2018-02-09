CREATE TABLE [app].AppSettingProgram 
(
	AppSettingProgramID INT IDENTITY(1,1),
	ProgramName NVARCHAR(200),
	AppConfigFilePath NVARCHAR(500)
);

ALTER TABLE app.AppSettingProgram
ADD CONSTRAINT PK_AppSettingProgram PRIMARY KEY(AppSettingProgramID);