using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioController : ControllerBase {
        GufosContext _contexto = new GufosContext ();

        // GET: api/Usuario
        // [Authorize] para requirir autentificação apenas neste metodo
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var usuarios = await _contexto.Usuario.Include("IdTipoUsuarioNavigation").ToListAsync ();

            if (usuarios == null) {
                return NotFound ();
            }
            return usuarios;
        }
        
        // GET: api/Usuario/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            // FindAsync = procura
            var usuario = await _contexto.Usuario.Include("IdTipoUsuarioNavigation").FirstOrDefaultAsync(e => e.IdUsuario == id);

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
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(usuario);
                // Salvamos efetivamente o nosso objeto no banco de dados
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
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

            // Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(usuario).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var usuario_valido = await _contexto.Usuario.FindAsync(id);

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
            var usuario = await _contexto.Usuario.FindAsync(id);
            if(usuario == null){
                return NotFound();
            }

            _contexto.Usuario.Remove(usuario);
            await _contexto.SaveChangesAsync();

            return usuario;
        }

    }
}