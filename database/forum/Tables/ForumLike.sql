CREATE TABLE [forum].[ForumLike] (
    [ForumlikeID]        INT      IDENTITY (1, 1) NOT NULL,
    [LikeWeight]         INT      NOT NULL,
    [ForumCommentID]     INT      NULL,
    [WhenCreated]        DATETIME NULL,
    [WhenDeleted]        DATETIME NULL,
    [ForumThreadID]      INT      NULL,
    [TaccomStrikeUserID] INT      NULL,
    CONSTRAINT [PK_ForumLike] PRIMARY KEY CLUSTERED ([ForumlikeID] ASC),
    CONSTRAINT [FK_ForumLike_ForumComment] FOREIGN KEY ([ForumCommentID]) REFERENCES [forum].[ForumComment] ([ForumCommentID]),
    CONSTRAINT [FK_ForumLike_ForumThread] FOREIGN KEY ([ForumThreadID]) REFERENCES [forum].[ForumThread] ([ForumThreadID]),
    CONSTRAINT [FK_ForumLike_TaccomStrikeUser] FOREIGN KEY ([TaccomStrikeUserID]) REFERENCES [dbo].[TaccomStrikeUser] ([TaccomStrikeUserID])
);



