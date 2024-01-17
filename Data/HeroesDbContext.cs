using Desafio___Dev_FullStack____.Models;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.EntityFrameworkCore;

public class HeroesDbContext:DbContext{
    public HeroesDbContext(DbContextOptions<HeroesDbContext> options):base(options)
    {
        
    }
    public DbSet<SuperHero> SuperHeroes{get;set;}  
    public DbSet<SuperPower> SuperPowers{get;set;}
    public DbSet<HeroSuperPower> HeroSuperPowers{get;set;}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HeroSuperPower>()
            .HasKey(ss => new { ss.HeroId, ss.SuperPowerId});
    }
}
