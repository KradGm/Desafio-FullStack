using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder.Services);
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SuperHeroesApi v1");
    });

    await Configure(app, app.Environment, app.Services);
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();

app.MapControllers();
app.Run();

async Task Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
{
    using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
    {
        var scopedServices = scope.ServiceProvider;
        var superPowerService = scopedServices.GetRequiredService<ISuperPowerService>();

        try
        {
            if (!scopedServices.GetRequiredService<HeroesDbContext>().SuperPowers.Any())
            {
                await superPowerService.SeedSuperPowersAsync();
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Erro ao semear superpoderes: {ex.Message}");
        }
    }

    app.UseCors(builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
}

void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "SuperHeroesApi",
            Description = "API para gerenciamento de superherois",
        });

        var filePath = Path.Combine(AppContext.BaseDirectory, "Desafio - Dev FullStack - (.Net e ReactJS).xml");
        options.IncludeXmlComments(filePath);
    });

    services.AddDbContext<HeroesDbContext>(options =>
        options.UseInMemoryDatabase("InMemoryDatabase"));

    services.AddScoped<ISuperPowerService, SuperPowerService>();

    services.AddCors();
}