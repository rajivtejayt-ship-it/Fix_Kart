using Microsoft.EntityFrameworkCore;
using FixKartApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var rawUrl = Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("No database connection string found.");

string connectionString = rawUrl;

if (!string.IsNullOrEmpty(rawUrl) && rawUrl.StartsWith("postgres://"))
{
    var databaseUri = new Uri(rawUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    connectionString = $"Host={databaseUri.Host};" +
                       $"Port={databaseUri.Port};" +
                       $"Username={userInfo[0]};" +
                       $"Password={userInfo[1]};" +
                       $"Database={databaseUri.LocalPath.TrimStart('/')};" +
                       "Pooling=true;" +
                       "SSL Mode=Require;Trust Server Certificate=true;";
}

builder.Services.AddDbContext<FixKartDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(int.Parse(port));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FixKartDbContext>();
    db.Database.EnsureCreated();
    DbInitializer.Initialize(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
