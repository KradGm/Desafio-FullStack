namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;

public class SuperPowerService : ISuperPowerService
{
    private readonly HeroesDbContext _dbContext;

    public SuperPowerService(HeroesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task SeedSuperPowersAsync()
    {
        if (!_dbContext.SuperPowers.Any())
        {
            var superPowers = new List<SuperPower>
            {
                new SuperPower { PowerName = "Fly",
                Description = "Teste" },
                new SuperPower { PowerName = "Super Strenght",
                 Description = "Teste" },
                new SuperPower { PowerName = "Super Speed",
                 Description = "Teste" },
                new SuperPower { PowerName = "Laser",
                 Description = "Teste" },
                new SuperPower { PowerName = "Regeneration",
                 Description = "Teste" },
            };

            _dbContext.SuperPowers.AddRange(superPowers);
            await _dbContext.SaveChangesAsync();
        }
    }
}