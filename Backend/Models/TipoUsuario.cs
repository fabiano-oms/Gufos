using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("tipo_usuario")]
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Usuario = new HashSet<Usuario>();
        }

        [Key]
        [Column("Id_Tipo_Usuario")]
        public int IdTipoUsuario { get; set; }
        [Required]
        [Column("Tipo_Usuario")]
        [StringLength(255)]
        public string TipoUsuario1 { get; set; }

        [InverseProperty("IdTipoUsuarioNavigation")]
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
