CREATE TABLE [auth].[UserLogin] (
    [UserLoginID] INT            IDENTITY (1, 1) NOT NULL,
    [Username]           NVARCHAR (100) NOT NULL,
    [PasswordHash]       NVARCHAR (500) NOT NULL,
    [PasswordSalt]       NVARCHAR (500) NOT NULL,
    [WhenCreated]        DATETIME       NULL,
    [WhenDeleted]        DATETIME       NULL,
    CONSTRAINT [PK_UserLogin] PRIMARY KEY CLUSTERED ([UserLoginID] ASC)
);