CREATE TABLE [auth].[UserFriendship]
(
	[UserFromID] INT NOT NULL,
	[UserToID] INT NOT NULL,
	[WhenCreated] DATETIME NULL,
	[WhenDeleted] DATETIME NULL,
	CONSTRAINT [PK_UserFriendship] PRIMARY KEY CLUSTERED ([UserFromID] ASC, [UserToID] ASC)
);
GO

ALTER TABLE [auth].[UserFriendship]
ADD CONSTRAINT FK_UserFriendship_UserFrom FOREIGN KEY ([UserFromID])
REFERENCES [auth].[UserLogin] ([UserLoginID]);
GO

ALTER TABLE [auth].[UserFriendship]
ADD CONSTRAINT FK_UserFriendship_UserTo FOREIGN KEY ([UserToID])
REFERENCES [auth].[UserLogin] ([UserLoginID]);
GO