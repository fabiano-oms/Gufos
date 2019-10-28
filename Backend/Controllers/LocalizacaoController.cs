using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    public class LocalizacaoController : ControllerBase {
        GufosContext _contexto = new GufosContext ();

        // GET: api/Localizacao
        [HttpGet]
        public async Task<ActionResult<List<Localizacao>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var localizacoes = await _contexto.Localizacao.ToListAsync ();

            if (localizacoes == null) {
                return NotFound ();
            }
            return localizacoes;
        }
        
        // GET: api/Localizacao/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Localizacao>> Get (int id) {
            // FindAsync = procura
            var localizacao = await _contexto.Localizacao.FindAsync(id);

            if (localizacao == null) {
                return NotFound ();
            }
            return localizacao;
        }

        // POST api/Localizacao
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Localizacao>> Post(Localizacao localizacao){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(localizacao);
                // Salvamos efetivamente o nosso objeto no banco de dados
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
            }
            return localizacao;
        }

        // PUT api/Localizacao
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Localizacao localizacao){
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if(id != localizacao.IdLocalizacao){
                return BadRequest();
            }

            // Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(localizacao).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var localizacao_valido = await _contexto.Localizacao.FindAsync(id);

                if(localizacao_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/localizacao/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Localizacao>> Delete(int id){
            var localizacao = await _contexto.Localizacao.FindAsync(id);
            if(localizacao == null){
                return NotFound();
            }

            _contexto.Localizacao.Remove(localizacao);
            await _contexto.SaveChangesAsync();

            return localizacao;
        }

    }
}