using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.Domains
{
    public partial class GufosContext : DbContext
    {
        public GufosContext()
        {
        }

        public GufosContext(DbContextOptions<GufosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Evento> Evento { get; set; }
        public virtual DbSet<Localizacao> Localizacao { get; set; }
        public virtual DbSet<Presenca> Presenca { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuario { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-LNH3DKI\\SQLEXPRESS; Database=Gufos; User Id=sa; Password=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.IdCategoria)
                    .HasName("PK__categori__CB90334900958CE5");

                entity.Property(e => e.TituloCategoria).IsUnicode(false);
            });

            modelBuilder.Entity<Evento>(entity =>
            {
                entity.HasKey(e => e.IdEvento)
                    .HasName("PK__evento__BCC709732A220A9A");

                entity.Property(e => e.AcessoLivre).HasDefaultValueSql("((1))");

                entity.Property(e => e.TituloEvento).IsUnicode(false);

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Evento)
                    .HasForeignKey(d => d.IdCategoria)
                    .HasConstraintName("FK__evento__Id_Categ__440B1D61");

                entity.HasOne(d => d.IdLocalizacaoNavigation)
                    .WithMany(p => p.Evento)
                    .HasForeignKey(d => d.IdLocalizacao)
                    .HasConstraintName("FK__evento__Id_Local__44FF419A");
            });

            modelBuilder.Entity<Localizacao>(entity =>
            {
                entity.HasKey(e => e.IdLocalizacao)
                    .HasName("PK__localiza__1F014ED1711B7D6A");

                entity.HasIndex(e => e.Cnpj)
                    .HasName("UQ__localiza__AA57D6B4EBF3CAC4")
                    .IsUnique();

                entity.Property(e => e.Cnpj)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Endereco).IsUnicode(false);

                entity.Property(e => e.RazaoSocial).IsUnicode(false);
            });

            modelBuilder.Entity<Presenca>(entity =>
            {
                entity.HasKey(e => e.IdPresenca)
                    .HasName("PK__presenca__CD5319F5061499B5");

                entity.Property(e => e.StatusPesenca).IsUnicode(false);

                entity.HasOne(d => d.IdEventoNavigation)
                    .WithMany(p => p.Presenca)
                    .HasForeignKey(d => d.IdEvento)
                    .HasConstraintName("FK__presenca__Id_Eve__48CFD27E");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Presenca)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__presenca__Id_Usu__47DBAE45");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__tipo_usu__689D5FEA0BB9589E");

                entity.HasIndex(e => e.TipoUsuarioNome)
                    .HasName("UQ__tipo_usu__CBC5E6FBE0D7BBF2")
                    .IsUnique();

                entity.Property(e => e.TipoUsuarioNome).IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__usuario__63C76BE2866924E6");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__usuario__A9D10534DC130617")
                    .IsUnique();

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Senha).IsUnicode(false);

                entity.Property(e => e.UsuarioNome).IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__usuario__Id_Tipo__3B75D760");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
