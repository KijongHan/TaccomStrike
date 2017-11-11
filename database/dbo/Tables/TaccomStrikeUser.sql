CREATE TABLE [dbo].[TaccomStrikeUser] (
    [Username]           NVARCHAR (100) NOT NULL,
    [PasswordHash]       NVARCHAR (500) NOT NULL,
    [PasswordSalt]       NVARCHAR (500) NOT NULL,
    [WhenCreated]        DATETIME       NULL,
    [WhenDeleted]        DATETIME       NULL,
    [TaccomStrikeUserID] INT            IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [PK_TaccomStrikeUser] PRIMARY KEY CLUSTERED ([TaccomStrikeUserID] ASC)
);


GO
GRANT SELECT
    ON OBJECT::[dbo].[TaccomStrikeUser] TO [taccomstrike_website]
    AS [dbo];

