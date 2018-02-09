CREATE TABLE app.AppSettingItem
(
	AppSettingItemID INT IDENTITY(1,1),
	AppSettingProgramID INT,
	Environment NVARCHAR(200),
	[Key] NVARCHAR(500),
	Value NVARCHAR(500)
);

ALTER TABLE app.AppSettingItem
ADD CONSTRAINT PK_AppSettingItem PRIMARY KEY (AppSettingItemID);

ALTER TABLE app.AppSettingItem
ADD CONSTRAINT FK_AppSettingItem_AppSettingProgram FOREIGN KEY(AppSettingProgramID)
REFERENCES app.AppSettingProgram(AppSettingProgramID);