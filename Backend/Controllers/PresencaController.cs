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
    public class PresencaController : ControllerBase {
        PresencaRepository _repositorio = new PresencaRepository ();
        // GET: api/Presenca
        [HttpGet]
        public async Task<ActionResult<List<Presenca>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var presencas = await _repositorio.Listar ();

            if (presencas == null) {
                return NotFound ();
            }
            return presencas;
        }

        // GET: api/Presenca/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Presenca>> Get (int id) {
            // FindAsync = procura
            var presenca = await _repositorio.BuscarPorID (id);

            if (presenca == null) {
                return NotFound ();
            }
            return presenca;
        }

        // POST api/Presenca
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Presenca>> Post (Presenca presenca) {
            try {
                await _repositorio.Salvar (presenca);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return presenca;
        }

        // PUT api/Presenca
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Presenca presenca) {
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if (id != presenca.IdPresenca) {
                return BadRequest ();
            }
            try {
                await _repositorio.Alterar (presenca);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var presenca_valido = await _repositorio.BuscarPorID (id);

                if (presenca_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return NoContent ();
        }

        // DELETE api/presenca/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Presenca>> Delete (int id) {
            var presenca = await _repositorio.BuscarPorID (id);
            if (presenca == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (presenca);

            return presenca;
        }

    }
}