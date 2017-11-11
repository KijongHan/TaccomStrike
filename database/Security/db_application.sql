CREATE ROLE [db_application]
    AUTHORIZATION [dbo];


GO
ALTER ROLE [db_application] ADD MEMBER [taccomstrike_website];

