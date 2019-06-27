CREATE VIEW [auth].[UserComplete]
AS 
SELECT
	[auth].[UserLogin].[UserLoginID],
	[auth].[UserLogin].[Username],
	[game].[GameUser].[GameScore]
FROM
	[auth].[UserLogin]
INNER JOIN
	[game].[GameUser] ON
	[auth].[UserLogin].[GameUserID] = [game].[GameUser].[GameUserID]
INNER JOIN
	[forum].[ForumUser] ON
	[auth].[UserLogin].[ForumUserID] = [forum].[ForumUser].[ForumUserID]