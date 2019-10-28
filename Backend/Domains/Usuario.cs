using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("usuario")]
    public partial class Usuario
    {
        public Usuario()
        {
            Presenca = new HashSet<Presenca>();
        }

        [Key]
        [Column("Id_Usuario")]
        public int IdUsuario { get; set; }
        [Required]
        [Column("Usuario")]
        [StringLength(255)]
        public string UsuarioNome { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Senha { get; set; }
        [Column("Id_Tipo_Usuario")]
        public int? IdTipoUsuario { get; set; }

        [ForeignKey(nameof(IdTipoUsuario))]
        [InverseProperty(nameof(TipoUsuario.Usuario))]
        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Presenca> Presenca { get; set; }
    }
}
