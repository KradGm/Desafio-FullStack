using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;

public class SuperPower{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long PowerId{get;set;}
    [StringLength(50, ErrorMessage = "Super poder cannot be longer than 50 characters.")]
    [Column("SuperPoder")]
    public string PowerName{get;set;}
    [StringLength(250, ErrorMessage = "Descricao cannot be longer than 50 characters.")]
    [Column("Descricao")]
    public string Description{get;set;}
    
    public ICollection<HeroSuperPower> HeroSuperPowers { get; set; }
}