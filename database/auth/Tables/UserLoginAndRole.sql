CREATE TABLE [auth].[UserLoginAndRole] 
(
    [UserLoginID] INT NOT NULL,
    [UserRoleID] INT NOT NULL,
    [WhenCreated] DATETIME,
    [WhenDeleted] DATETIME,
    CONSTRAINT [PK_UserLoginAndRole] PRIMARY KEY CLUSTERED ([UserLoginID], [UserRoleID])
);

ALTER TABLE [auth].[UserLoginAndRole]
ADD CONSTRAINT [FK_UserLoginAndRole_UserLogin] FOREIGN KEY ([UserLoginID])
REFERENCES [auth].[UserLogin] ([UserLoginID]);

ALTER TABLE [auth].[UserLoginAndRole]
ADD CONSTRAINT [FK_UserLoginAndRole_UserRole] FOREIGN KEY ([UserRoleID])
REFERENCES [auth].[UserRole] ([UserRoleID]);
