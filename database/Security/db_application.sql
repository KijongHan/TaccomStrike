CREATE ROLE [db_application]
    AUTHORIZATION [dbo];


GO
ALTER ROLE [db_application] ADD MEMBER [taccomstrike_website];

GRANT SELECT ON SCHEMA :: [forum] TO db_application;
GRANT SELECT ON SCHEMA :: [auth] TO db_application;

GRANT INSERT ON SCHEMA :: [forum] TO db_application;
GRANT INSERT ON SCHEMA :: [auth] TO db_application;

