using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("localizacao")]
    public partial class Localizacao
    {
        public Localizacao()
        {
            Evento = new HashSet<Evento>();
        }

        [Key]
        [Column("Id_Localizacao")]
        public int IdLocalizacao { get; set; }
        [Required]
        [StringLength(255)]
        public string Endereco { get; set; }
        [Required]
        [Column("CNPJ")]
        [StringLength(14)]
        public string Cnpj { get; set; }
        [Required]
        [Column("Razao_Social")]
        [StringLength(255)]
        public string RazaoSocial { get; set; }

        [InverseProperty("IdLocalizacaoNavigation")]
        public virtual ICollection<Evento> Evento { get; set; }
    }
}
