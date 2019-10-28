using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories {
    public class TipoUsuarioRepository : ITipoUsuario {
        public async Task<TipoUsuario> Alterar (TipoUsuario tipo_usuario) {
            using (GufosContext _contexto = new GufosContext ()){
                _contexto.Entry(tipo_usuario).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
            }
            return tipo_usuario;
        }

        public async Task<TipoUsuario> BuscarPorID (int id) {
            using (GufosContext _contexto = new GufosContext ()){
                return await _contexto.TipoUsuario.FindAsync(id);
            }
        }

        public async Task<TipoUsuario> Excluir (TipoUsuario tipo_usuario) {
            using (GufosContext _contexto = new GufosContext ()){
                _contexto.TipoUsuario.Remove (tipo_usuario);
                await _contexto.SaveChangesAsync ();
                return tipo_usuario;
            }
        }

        public async Task<List<TipoUsuario>> Listar () {
            using (GufosContext _contexto = new GufosContext ()){
                return await _contexto.TipoUsuario.ToListAsync ();
            }
        }

        public async Task<TipoUsuario> Salvar (TipoUsuario tipo_usuario) {
            using (GufosContext _contexto = new GufosContext ()){
                await _contexto.AddAsync(tipo_usuario);
                await _contexto.SaveChangesAsync();
                return tipo_usuario;
            }
        }
    }
}