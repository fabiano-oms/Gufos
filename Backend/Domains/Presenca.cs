using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("presenca")]
    public partial class Presenca
    {
        [Key]
        [Column("Id_Presenca")]
        public int IdPresenca { get; set; }
        [Required]
        [Column("Status_Pesenca")]
        [StringLength(255)]
        public string StatusPesenca { get; set; }
        [Column("Id_Usuario")]
        public int? IdUsuario { get; set; }
        [Column("Id_Evento")]
        public int? IdEvento { get; set; }

        [ForeignKey(nameof(IdEvento))]
        [InverseProperty(nameof(Evento.Presenca))]
        public virtual Evento IdEventoNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Presenca))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
