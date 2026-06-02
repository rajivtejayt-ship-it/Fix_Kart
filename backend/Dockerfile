# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["FixKartApi.csproj", "./"]
RUN dotnet restore "./FixKartApi.csproj"

# Copy the rest of the files and build
COPY . .
RUN dotnet publish "FixKartApi.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 5000 and tell ASP.NET to listen on it
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "FixKartApi.dll"]
