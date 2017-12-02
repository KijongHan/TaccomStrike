CREATE TABLE [auth].[UserRole] 
(
    [UserRoleID] INT IDENTITY (1,1) NOT NULL,
    [RoleName] NVARCHAR(100) NOT NULL,
    [WhenCreated] DATETIME,
    [WhenDeleted] DATETIME,
    CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED ([UserRoleID] ASC)
);

