using Desafio___Dev_FullStack____.Models;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Este é o controlador principal para ações relacionadas a API.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SuperHeroController : ControllerBase
{
    private readonly HeroesDbContext _context;
    /// <summary>
    /// Esse é o controlador de todas as ações na API.
    /// </summary>
    public SuperHeroController(HeroesDbContext context)
    {
        _context = context;
    }
    /// <summary>
    /// Retorna a lista de todos os herois.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<SuperHeroDTO>>> GetAllHeroes()
    {
    return Ok(await _context.SuperHeroDTO.Include(h => h.heroSuperPowers).ToListAsync());
    }
    /// <summary>
    /// Retorna um heroi pelo id especifico.
    /// </summary>
    /// <param name="id">Digite o id do heroi.</param>
    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400, Type = typeof(string))]
    public async Task<ActionResult<SuperHeroDTO>> GetHeroById(long id)
    {
        var hero = await _context.SuperHeroDTO
            .Include(h => h.heroSuperPowers)
            .FirstOrDefaultAsync(h => h.id == id);

        if (hero == null)
            return BadRequest("Heroi não encontrado");

        return Ok(hero);
    }
    /// <summary>
    /// Deleta um heroi pelo seu Id.
    /// </summary>
    /// <param name="id">Digite o Id do heroi a ser deletado.</param>
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
            return Conflict($"Heroi com Id = {id} não encontrado");

        return Ok("Heroi deletado com sucesso");
    }

    /// <summary>
    /// Cria um novo Heroi.
    /// </summary>
    /// <param name="superHeroDto">Digite os dados do novo heroi, .</param>
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
        };
        _context.SuperHeroDTO.Add(superHero);
        _context.SaveChanges();
        foreach (var superPowerId in superHeroDto.heroSuperPowers.Select(hsp => hsp.SuperPowerId))
        {
            var heroSuperPower = new HeroSuperPower
            {
                HeroId = superHero.id,
                SuperPowerId = superPowerId
            };
            _context.HeroSuperPowers.Add(heroSuperPower);
        }
        _context.SaveChanges();
        return Ok(superHero);
    }

    /// <summary>
    /// Cria uma nova interação entre Heroi e SuperPoder.
    /// </summary>
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

        hero.heroSuperPowers.Add(heroSuperPower);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSuperHeroPower), new { id = heroSuperPower.HeroId }, heroSuperPower);
    }
    /// <summary>
    /// Atualiza um heroi ja existente pelo ID.
    /// </summary>
    /// <param name="hero">Heroi atualizado.</param>
    [HttpPatch("UpdateHero/{id}")]
    [ProducesResponseType(200)]
    public async Task<SuperHeroDTO> UpdateHero(SuperHeroDTO hero)
    {
        _context.Entry(hero).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return hero;
    }
    /// <summary>
    /// Retorna a lista de todos os poderes no banco de dados.
    /// </summary>
    [HttpGet("SuperPowers")]
    [ProducesResponseType(200)]
    public IActionResult GetSuperPowers()
    {
        var superPowers = _context.SuperPowers.ToList();
        return Ok(superPowers);
    }
    /// <summary>
    /// Utilizado para testar a interação HeroisSuperPoderes com Herois e SuperPoder
    /// </summary>
    [HttpGet("SuperHeroPowers")]
    public IActionResult GetSuperHeroPower()
    {
        var superHeroPowers = _context.HeroSuperPowers.ToList();
        return Ok(superHeroPowers);
    }

}