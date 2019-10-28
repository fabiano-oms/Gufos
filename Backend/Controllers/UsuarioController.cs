using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioController : ControllerBase {
        UsuarioRepository _repositorio = new UsuarioRepository();

        // GET: api/Usuario
        // [Authorize] para requirir autentificação apenas neste metodo
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var usuarios = await _repositorio.Listar();

            if (usuarios == null) {
                return NotFound ();
            }
            return usuarios;
        }
        
        // GET: api/Usuario/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            // FindAsync = procura
            var usuario = await _repositorio.BuscarPorID (id);

            if (usuario == null) {
                return NotFound ();
            }
            return usuario;
        }

        // POST api/Usuario
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Usuario>> Post(Usuario usuario){
            try{
                await _repositorio.Salvar (usuario);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return usuario;
        }

        // PUT api/Usuario
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Usuario usuario){
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if(id != usuario.IdUsuario){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar (usuario);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var usuario_valido = await _repositorio.BuscarPorID (id);
                if(usuario_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/usuario/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> Delete(int id){
            var usuario = await _repositorio.BuscarPorID (id);
            if(usuario == null){
                return NotFound();
            }
            return usuario;
        }

    }
}