set arg1=%1

dotnet ef migrations add %arg1% --project ..\..\src\CallCheatOnline.Library.Data\CallCheatOnline.Library.Data.csproj --startup-project ..\..\src\CallCheatOnline.Web.API\CallCheatOnline.Web.API.csproj

pause