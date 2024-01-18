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
                new SuperPower { PowerName = "Voar",
                Description = "O heroi pode voar" },
                new SuperPower { PowerName = "Super Força",
                Description = "O heroi tem a força de um elefante" },
                new SuperPower { PowerName = "Super Velocidade",
                Description = "O heroi é mais rapido do que o som" },
                new SuperPower { PowerName = "Laser",
                Description = "O Heroi pode disparar laser pelos olhos." },
                new SuperPower { PowerName = "Regeneração",
                Description = "Esse Heroi tem uma regeneração super acelerada" },
                new SuperPower { PowerName = "Ler mentes",
                Description = "Esse Heroi consegue ler a mente de outros humanos e herois"},
                new SuperPower { PowerName = "Super Visão",
                Description = "Esse Heroi consegue ler a mente de outros humanos e herois"},
                new SuperPower { PowerName = "Transformação",
                Description = "Esse Heroi pode se transformar em animais e outros seres"},
                new SuperPower { PowerName = "Invisibilidade",
                Description = "O Heroi pode ficar invisivel por tempo indeterminado"},
                new SuperPower { PowerName = "Controle do magnetismo",
                Description = "A Habilidade de controlar os campos magneticos"},
            };
            _dbContext.SuperPowers.AddRange(superPowers);
            await _dbContext.SaveChangesAsync();
        }
    }
}