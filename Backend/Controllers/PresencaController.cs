using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    public class PresencaController : ControllerBase {
        GufosContext _contexto = new GufosContext ();

        // GET: api/Presenca
        [HttpGet]
        public async Task<ActionResult<List<Presenca>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var presencas = await _contexto.Presenca.Include("IdUsuarioNavigation").Include("IdEventoNavigation").ToListAsync ();

            if (presencas == null) {
                return NotFound ();
            }
            return presencas;
        }
        
        // GET: api/Presenca/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Presenca>> Get (int id) {
            // FindAsync = procura
            var presenca = await _contexto.Presenca.Include("IdUsuarioNavigation").Include("IdEventoNavigation").FirstOrDefaultAsync(e => e.IdPresenca == id);

            if (presenca == null) {
                return NotFound ();
            }
            return presenca;
        }

        // POST api/Presenca
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Presenca>> Post(Presenca presenca){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(presenca);
                // Salvamos efetivamente o nosso objeto no banco de dados
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
            }
            return presenca;
        }

        // PUT api/Presenca
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Presenca presenca){
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if(id != presenca.IdPresenca){
                return BadRequest();
            }

            // Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(presenca).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var presenca_valido = await _contexto.Presenca.FindAsync(id);

                if(presenca_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/presenca/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Presenca>> Delete(int id){
            var presenca = await _contexto.Presenca.FindAsync(id);
            if(presenca == null){
                return NotFound();
            }

            _contexto.Presenca.Remove(presenca);
            await _contexto.SaveChangesAsync();

            return presenca;
        }

    }
}