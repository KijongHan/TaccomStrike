CREATE TABLE app.AppException 
(
	AppExceptionID INT IDENTITY(1,1),
	Message NVARCHAR(MAX),
	StackTrace NVARCHAR(MAX),
	ExceptionString NVARCHAR(MAX),
	WhenCreated DATETIME
);
GO

ALTER TABLE app.AppException
ADD CONSTRAINT PK_AppException PRIMARY KEY(AppExceptionID);
