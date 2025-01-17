using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;

namespace Backend.Interfaces {
    public interface ITipoUsuario {
        Task<List<TipoUsuario>> Listar();

        Task<TipoUsuario> BuscarPorID(int id);

        Task<TipoUsuario> Salvar(TipoUsuario tipo_usuario);

        Task<TipoUsuario> Alterar(TipoUsuario tipo_usuario);

        Task<TipoUsuario> Excluir(TipoUsuario tipo_usuario);
    }
}