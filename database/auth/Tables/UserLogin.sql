CREATE TABLE [auth].[UserLogin] (
    [UserLoginID] INT            IDENTITY (1, 1) NOT NULL,
    [Username]           NVARCHAR (100) NOT NULL,
    [Email]              NVARCHAR (200),
    [PasswordHash]       NVARCHAR (500) NOT NULL,
    [PasswordSalt]       NVARCHAR (500) NOT NULL,
    [WhenCreated]        DATETIME       NULL,
    [WhenDeleted]        DATETIME       NULL,
    CONSTRAINT [PK_UserLogin] PRIMARY KEY CLUSTERED ([UserLoginID] ASC)
);  

ALTER TABLE [auth].[UserLogin]
ADD CONSTRAINT FK_UserLogin_ForumUser FOREIGN KEY ([ForumUserID])
REFERENCES [forum].[ForumUser] ([ForumUserID]);