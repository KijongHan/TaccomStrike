CREATE TABLE [game].[GameUser] 
(
    [GameUserID] INT IDENTITY(1,1) NOT NULL,
	[GameScore] INT NOT NULL,
    [WhenCreated] DATETIME,
    [WhenDeleted] DATETIME,
    CONSTRAINT [PK_GameUser] PRIMARY KEY CLUSTERED ([GameUserID])
);