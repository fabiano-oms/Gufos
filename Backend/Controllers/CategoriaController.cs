using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        GufosContext _contexto = new GufosContext ();

        // GET: api/Categoria
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var categorias = await _contexto.Categoria.ToListAsync ();

            if (categorias == null) {
                return NotFound ();
            }
            return categorias;
        }
        
        // GET: api/Categoria/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {
            // FindAsync = procura
            var categoria = await _contexto.Categoria.FindAsync(id);

            if (categoria == null) {
                return NotFound ();
            }
            return categoria;
        }

        // POST api/Categoria
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Categoria>> Post(Categoria categoria){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(categoria);
                // Salvamos efetivamente o nosso objeto no banco de dados
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
            }
            return categoria;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Categoria categoria){
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if(id != categoria.IdCategoria){
                return BadRequest();
            }

            // Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(categoria).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var categoria_valido = await _contexto.Categoria.FindAsync(id);

                if(categoria_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/categoria/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categoria>> Delete(int id){
            var categoria = await _contexto.Categoria.FindAsync(id);
            if(categoria == null){
                return NotFound();
            }

            _contexto.Categoria.Remove(categoria);
            await _contexto.SaveChangesAsync();

            return categoria;
        }

    }
}