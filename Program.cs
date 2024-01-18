using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
{
    using var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope();
    var scopedServices = scope.ServiceProvider;

    var superPowerService = scopedServices.GetRequiredService<ISuperPowerService>();

    try
    {
        if (!scopedServices.GetRequiredService<HeroesDbContext>().SuperPowers.Any())
        {
            superPowerService.SeedSuperPowersAsync().Wait();
        }
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Erro ao semear superpoderes: {ex.Message}");
    }
     app.UseCors(builder =>
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod()
     );
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "SuperHeroesApi",
        Description = "An ASP.NET Core Web API for managing SuperHeroes",
    });
    var filePath = Path.Combine(System.AppContext.BaseDirectory, "Desafio - Dev FullStack - (.Net e ReactJS).xml");
    options.IncludeXmlComments(filePath);
});

builder.Services.AddDbContext<HeroesDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDatabase"));

services.AddScoped<ISuperPowerService, SuperPowerService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Chama o Configure para adicionar superpoderes
    Configure(app, app.Environment, app.Services);
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();
app.Run();