CREATE TABLE [forum].[ForumUser] (
    [ForumUserID] INT IDENTITY(1,1) NOT NULL,
    [WhenCreated] DATETIME,
    [WhenDeleted] DATETIME,
    CONSTRAINT [PK_ForumUser] PRIMARY KEY CLUSTERED ([ForumUserID])
);