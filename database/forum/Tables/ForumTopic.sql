CREATE TABLE [forum].[ForumTopic] (
    [ForumTopicID] INT            IDENTITY (1, 1) NOT NULL,
    [Title]        NVARCHAR (200) NULL,
    [Description]  NVARCHAR (500) NULL,
    [WhenCreated]  DATETIME       NULL,
    [WhenDeleted]  DATETIME       NULL,
    CONSTRAINT [PK_ForumTopic] PRIMARY KEY CLUSTERED ([ForumTopicID] ASC)
);

