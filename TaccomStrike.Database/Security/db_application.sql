CREATE ROLE [db_application]
    AUTHORIZATION [dbo];


GO
ALTER ROLE [db_application] ADD MEMBER [taccomstrike_website];
GO

GRANT SELECT ON SCHEMA :: [forum] TO db_application;
GO
GRANT SELECT ON SCHEMA :: [auth] TO db_application;
GO
GRANT SELECT ON SCHEMA :: [app] TO db_application;
GO

GRANT INSERT ON SCHEMA :: [forum] TO db_application;
GO
GRANT INSERT ON SCHEMA :: [auth] TO db_application;
GO
GRANT INSERT ON SCHEMA :: [app] TO db_application;
GO