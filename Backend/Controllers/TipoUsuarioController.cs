using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase {
        TipoUsuarioRepository _repositorio = new TipoUsuarioRepository ();
        // GET: api/TipoUsuario
        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var tipos_usuario = await _repositorio.Listar ();

            if (tipos_usuario == null) {
                return NotFound ();
            }
            return tipos_usuario;
        }

        // GET: api/TipoUsuario/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Get (int id) {
            // FindAsync = procura
            var tipo_usuario = await _repositorio.BuscarPorID (id);

            if (tipo_usuario == null) {
                return NotFound ();
            }
            return tipo_usuario;
        }

        // POST api/TipoUsuario
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<TipoUsuario>> Post (TipoUsuario tipo_usuario) {
            try {
                await _repositorio.Salvar (tipo_usuario);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return tipo_usuario;
        }

        // PUT api/TipoUsuario
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, TipoUsuario tipo_usuario) {
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if (id != tipo_usuario.IdTipoUsuario) {
                return BadRequest ();
            }
            try {
                await _repositorio.Alterar (tipo_usuario);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var tipo_usuario_valido = await _repositorio.BuscarPorID (id);

                if (tipo_usuario_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return NoContent ();
        }

        // DELETE api/tipo_usuario/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Delete (int id) {
            var tipo_usuario = await _repositorio.BuscarPorID (id);
            if (tipo_usuario == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (tipo_usuario);

            return tipo_usuario;
        }

    }
}