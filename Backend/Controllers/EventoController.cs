using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// Para adicionar a árvore de objetos adicionamos uma nova biblioteca JSON 
// dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

namespace Backend.Controllers {
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[Controller]")]
    [ApiController]
    public class EventoController : ControllerBase {
        // GufosContext _contexto = new GufosContext ();
        EventoRepository _repositorio = new EventoRepository ();

        // GET: api/Evento
        /// <summary>
        /// Pegamos todos os Eventos cadastrados
        /// </summary>
        /// <returns>Lista de Eventos</returns>
        [HttpGet]
        public async Task<ActionResult<List<Evento>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            // Include("") Adiciona
            var eventos = await _repositorio.Listar ();

            if (eventos == null) {
                return NotFound ();
            }
            return eventos;
        }

        // GET: api/Evento/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Evento>> Get (int id) {
            // FindAsync = procura
            // FirstOrDefaultAsync(x => x.IdNomedocampo == id)
            // c => c.IdCategoria
            var evento = await _repositorio.BuscarPorID (id);

            if (evento == null) {
                return NotFound ();
            }
            return evento;
        }

        // POST api/Evento
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Evento>> Post (Evento evento) {
            try {
                await _repositorio.Salvar (evento);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return evento;
        }

        // PUT api/Evento
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Evento evento) {
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if (id != evento.IdEvento) {
                return BadRequest ();
            }
            try {
                await _repositorio.Alterar (evento);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var evento_valido = await _repositorio.BuscarPorID (id);

                if (evento_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return NoContent ();
        }

        // DELETE api/evento/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Evento>> Delete (int id) {
            var evento = await _repositorio.BuscarPorID (id);
            if (evento == null) {
                return NotFound ();
            }
            return evento;
        }

    }
}