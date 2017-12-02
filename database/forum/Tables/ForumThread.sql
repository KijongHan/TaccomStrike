CREATE TABLE [forum].[ForumThread] (
    [ForumThreadID]      INT             IDENTITY (1, 1) NOT NULL,
    [Title]              NVARCHAR (500)  NULL,
    [Content]            NVARCHAR (2000) NULL,
    [WhenCreated]        DATETIME        NULL,
    [WhenDeleted]        DATETIME        NULL,
    [ForumUserID]        INT             NULL,
    [ForumTopicID]       INT             NULL,
    CONSTRAINT [PK_ForumThread] PRIMARY KEY CLUSTERED ([ForumThreadID] ASC),
    CONSTRAINT [FK_ForumThread_ForumTopic] FOREIGN KEY ([ForumTopicID]) REFERENCES [forum].[ForumTopic] ([ForumTopicID]),
    CONSTRAINT [FK_ForumThread_ForumUser] FOREIGN KEY ([ForumUserID]) REFERENCES [forum].[ForumUser] ([ForumUserID])
);



