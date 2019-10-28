using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("evento")]
    public partial class Evento
    {
        public Evento()
        {
            Presenca = new HashSet<Presenca>();
        }

        [Key]
        [Column("Id_Evento")]
        public int IdEvento { get; set; }
        [Required]
        [Column("Titulo_Evento")]
        [StringLength(255)]
        public string TituloEvento { get; set; }
        [Column("Data_Evento", TypeName = "datetime")]
        public DateTime DataEvento { get; set; }
        [Required]
        [Column("Acesso_Livre")]
        public bool? AcessoLivre { get; set; }
        [Column("Id_Categoria")]
        public int? IdCategoria { get; set; }
        [Column("Id_Localizacao")]
        public int? IdLocalizacao { get; set; }

        [ForeignKey(nameof(IdCategoria))]
        [InverseProperty(nameof(Categoria.Evento))]
        public virtual Categoria IdCategoriaNavigation { get; set; }
        [ForeignKey(nameof(IdLocalizacao))]
        [InverseProperty(nameof(Localizacao.Evento))]
        public virtual Localizacao IdLocalizacaoNavigation { get; set; }
        [InverseProperty("IdEventoNavigation")]
        public virtual ICollection<Presenca> Presenca { get; set; }
    }
}
