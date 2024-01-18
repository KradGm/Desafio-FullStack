using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Desafio___Dev_FullStack____.Models;

namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;

public class HeroSuperPower
{   
    
    [ForeignKey("SuperHeroDTO")]
    public long? HeroId{get;set;}
    [ForeignKey("SuperPower")]
    public long SuperPowerId{get;set;}

    public SuperHeroDTO SuperHeroDTO;

}
