using Desafio___Dev_FullStack____.Models;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SuperHeroController : ControllerBase
{
    private readonly HeroesDbContext _context;

    public SuperHeroController(HeroesDbContext context)
    {
        _context = context;
    }
    [HttpGet]
        public async Task<ActionResult<List<SuperHero>>> Get()
        {
            return Ok(await _context.SuperHeroes.ToListAsync());
        }
        
    [HttpGet("id")]
        public async Task<ActionResult<SuperHero>> Get(int id)
        {
            var hero = await _context.SuperHeroes.FindAsync(id);
            if (hero == null)
                return BadRequest("Hero not found");
            return Ok(hero);
        }

    [HttpPost]
    public IActionResult CreateSuperHero([FromBody] SuperHeroDTO superHeroDto)
    {
        if (_context.SuperHeroes.Any(h => h.HeroName == superHeroDto.HeroName))
        {
            return Conflict("Já existe um super-herói com este nome.");
        }

        var superHero = new SuperHero
        {
            RealName = superHeroDto.Name,
            HeroName = superHeroDto.HeroName,
            BirthDate = superHeroDto.DateOfBirth,
            Height = superHeroDto.Height,
            Weight = superHeroDto.Weight
        };

        _context.SuperHeroes.Add(superHero);
        _context.SaveChanges();

        return Ok(superHero.Id);
    }
}