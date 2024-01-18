using Desafio___Dev_FullStack____.Models;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.EntityFrameworkCore;

public class HeroesDbContext:DbContext{
    public HeroesDbContext(DbContextOptions<HeroesDbContext> options):base(options)
    {
        
    }
    public DbSet<SuperHero> SuperHero{get;set;}
    public DbSet<SuperHeroDTO> SuperHeroDTO{get;set;}  
    public DbSet<SuperPower> SuperPowers{get;set;}
    public DbSet<HeroSuperPower> HeroSuperPowers{get;set;}
       protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    modelBuilder.Entity<HeroSuperPower>()
        .HasKey(heroSuperPowerKeys => new { heroSuperPowerKeys.HeroId, heroSuperPowerKeys.SuperPowerId });

    modelBuilder.Entity<SuperPower>()
        .HasKey(superPowerKey => superPowerKey.PowerId);

    modelBuilder.Entity<SuperHeroDTO>()
        .HasMany(hero => hero.heroSuperPowers) 
        .WithOne(heroSuperPower => heroSuperPower.SuperHeroDTO) 
        .HasForeignKey(heroSuperPower => heroSuperPower.HeroId);

    modelBuilder.Entity<HeroSuperPower>()
    .HasOne(heroSuperPower => heroSuperPower.SuperHeroDTO)
    .WithMany(superHero => superHero.heroSuperPowers)
    .HasForeignKey(heroSuperPower => heroSuperPower.HeroId); 
}
}