using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Desafio___Dev_FullStack____.Net_e_ReactJS_;

public class SuperHeroDTO
{      
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long id {get;set;}
    [StringLength(120, ErrorMessage = "Real name cannot be longer than 120 characters.")]
    public string RealName { get; set; }
    [StringLength(120, ErrorMessage = "Hero name cannot be longer than 120 characters.")]
    public string HeroName { get; set; }
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]    
    public DateTime? BirthDate { get; set; }
    public float Height { get; set; }
    public float Weight { get; set; }

    public List<HeroSuperPower> heroSuperPowers{get;set;} = new List<HeroSuperPower>();

}
