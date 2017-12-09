CREATE TABLE [app].[Session] (
	[SessionID] INT IDENTITY(1,1) NOT NULL,
	[UserLoginID] INT NOT NULL,
    [ProtectedSessionID] NVARCHAR(4000),
    [UnprotectedSessionID] NVARCHAR(4000),
    [WhenCreated] DATETIME,
    [WhenBanned] DATETIME,
	CONSTRAINT PK_Session PRIMARY KEY ([SessionID]),
);

ALTER TABLE [app].[Session]
ADD CONSTRAINT FK_Session_UserLogin FOREIGN kEY ([UserLoginID])
REFERENCES [auth].[UserLogin] ([UserLoginID]);