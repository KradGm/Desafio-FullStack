using Desafio___Dev_FullStack____.Models;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// This is the main controller for handling Heroes-related actions.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SuperHeroController : ControllerBase
{
    private readonly HeroesDbContext _context;
    /// <summary>
    ///
    /// </summary>
    public SuperHeroController(HeroesDbContext context)
    {
        _context = context;
    }
    /// <summary>
    /// Gets the list of all SuperHeroes.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<SuperHeroDTO>>> Get()
    {
        return Ok(await _context.SuperHeroDTO.ToListAsync());
    }
    /// <summary>
    /// Gets a specific SuperHero by ID.
    /// </summary>
    /// <param name="id">The ID of the SuperHero.</param>
    [HttpGet("id")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400, Type = typeof(string))]
    public async Task<ActionResult<SuperHeroDTO>> Get(long id)
    {
        var hero = await _context.SuperHeroDTO.FindAsync(id);
        if (hero == null)
            return BadRequest("Hero not found");
        return Ok(hero);
    }
    /// <summary>
    /// Deletes a SuperHero by ID.
    /// </summary>
    /// <param name="id">The ID of the SuperHero to delete.</param>
    [HttpDelete("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404, Type = typeof(string))]
    public IActionResult DeleteHero(long id)
    {
        var hero = _context.SuperHeroDTO.Find(id);
        if (hero != null)
        {
            _context.Entry(hero).State = EntityState.Deleted;
            _context.SaveChanges();
        }
        else
        return Conflict($"Hero with Id = {id} not found");

        return Ok("Hero deleted with success");
    }

    /// <summary>
    /// Creates a new SuperHero.
    /// </summary>
    /// <param name="superHeroDto">The data for the new SuperHero.</param>
[HttpPost]
[ProducesResponseType(200)]
[ProducesResponseType(409, Type = typeof(string))]
public IActionResult PostSuperHero([FromBody] SuperHeroDTO superHeroDto)
{
    if (_context.SuperHeroDTO.Any(h => h.HeroName == superHeroDto.HeroName))
    {
        return Conflict("Já existe um super-herói com este nome.");
    }

    var superHero = new SuperHeroDTO
    {
        RealName = superHeroDto.RealName,
        HeroName = superHeroDto.HeroName,
        BirthDate = superHeroDto.BirthDate,
        Height = superHeroDto.Height,
        Weight = superHeroDto.Weight,
        heroSuperPowers = new List<HeroSuperPower>()
    };


    _context.SuperHeroDTO.Add(superHero);
    _context.SaveChanges();

    return Ok(superHero);
}
[HttpPost("CreateHeroSuperPower")]
[ProducesResponseType(200)]
[ProducesResponseType(409, Type = typeof(string))]
public async Task<ActionResult<HeroSuperPower>> CreateHeroSuperPower(long heroId, long superPowerId)
{
    var hero = await _context.SuperHeroDTO
        .Include(h => h.heroSuperPowers)
        .FirstOrDefaultAsync(h => h.id == heroId);

    var superPower = await _context.SuperPowers.FindAsync(superPowerId);

    if (hero == null || superPower == null)
    {
        return NotFound();
    }

    var heroSuperPower = new HeroSuperPower
    {
        HeroId = heroId,
        SuperPowerId = superPowerId
    };

    if (hero.heroSuperPowers == null)
    {
        hero.heroSuperPowers = new List<HeroSuperPower>();
    }

    hero.heroSuperPowers.Add(heroSuperPower);

    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetSuperPowers), new { id = heroSuperPower.HeroId }, heroSuperPower);
}
        /// <summary>
        /// Updates an existing SuperHero.
        /// </summary>
        /// <param name="hero">The updated SuperHero.</param>
        [HttpPatch("UpdateHero/{id}")]
        [ProducesResponseType(200)]
        public async Task<SuperHeroDTO> UpdateHero(SuperHeroDTO hero)
        {
            _context.Entry(hero).State= EntityState.Modified;
            await _context.SaveChangesAsync();
            return hero;
        }
        /// <summary>
        /// Gets the list of all SuperPowers.
        /// </summary>
        [HttpGet("SuperPowers")]
        [ProducesResponseType(200)]
        public IActionResult GetSuperPowers()
        {
            var superPowers = _context.SuperPowers.ToList();
            return Ok(superPowers);
        }
        [HttpGet("SuperHeroPowers")]
        public IActionResult GetSuperHeroPower(){
            var superHeroPowers = _context.HeroSuperPowers.ToList();
            return Ok(superHeroPowers);
        }
     
}