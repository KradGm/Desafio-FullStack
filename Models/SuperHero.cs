using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using Desafio___Dev_FullStack____.Net_e_ReactJS_;
using Microsoft.EntityFrameworkCore;

namespace Desafio___Dev_FullStack____.Models;
public class SuperHero{
        [Key]
        public Guid Id{get;set;}
        public String RealName{get;set;} = string.Empty;
        public String HeroName{get;set;} = string.Empty;
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate{get;set;}
        public float Height{get;set;}
        public float Weight{get;set;}

        public ICollection<HeroSuperPower> HeroSuperPowers{get;set;}
}