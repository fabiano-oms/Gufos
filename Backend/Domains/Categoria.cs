using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("categoria")]
    public partial class Categoria
    {
        public Categoria()
        {
            Evento = new HashSet<Evento>();
        }

        [Key]
        [Column("Id_Categoria")]
        public int IdCategoria { get; set; }
        [Required]
        [Column("Titulo_Categoria")]
        [StringLength(255)]
        public string TituloCategoria { get; set; }

        [InverseProperty("IdCategoriaNavigation")]
        public virtual ICollection<Evento> Evento { get; set; }
    }
}
