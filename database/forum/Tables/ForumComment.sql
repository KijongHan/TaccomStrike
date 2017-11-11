CREATE TABLE [forum].[ForumComment] (
    [ForumCommentID]     INT             IDENTITY (1, 1) NOT NULL,
    [CommentContent]     NVARCHAR (1000) NULL,
    [WhenCreated]        DATETIME        NOT NULL,
    [WhenDeleted]        DATETIME        NULL,
    [ForumThreadID]      INT             NULL,
    [TaccomStrikeUserID] INT             NULL,
    CONSTRAINT [PK_ForumComment] PRIMARY KEY CLUSTERED ([ForumCommentID] ASC),
    CONSTRAINT [FK_ForumComment_ForumThread] FOREIGN KEY ([ForumThreadID]) REFERENCES [forum].[ForumThread] ([ForumThreadID]),
    CONSTRAINT [FK_ForumComment_TaccomStrikeUser] FOREIGN KEY ([TaccomStrikeUserID]) REFERENCES [dbo].[TaccomStrikeUser] ([TaccomStrikeUserID])
);



