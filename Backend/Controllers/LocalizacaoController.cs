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
    public class LocalizacaoController : ControllerBase {
        LocalizacaoRepository _repositorio = new LocalizacaoRepository ();
        // GET: api/Localizacao
        [HttpGet]
        public async Task<ActionResult<List<Localizacao>>> Get () {
            // O que é metodo assincrono: possibilidade de executar varios métodos em simultâneo
            var localizacoes = await _repositorio.Listar();

            if (localizacoes == null) {
                return NotFound ();
            }
            return localizacoes;
        }

        // GET: api/Localizacao/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Localizacao>> Get (int id) {
            // FindAsync = procura
            var localizacao = await _repositorio.BuscarPorID (id);

            if (localizacao == null) {
                return NotFound ();
            }
            return localizacao;
        }

        // POST api/Localizacao
        [HttpPost]
        // Post(Objeto atributo)
        public async Task<ActionResult<Localizacao>> Post (Localizacao localizacao) {
            try {
                await _repositorio.Salvar(localizacao);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return localizacao;
        }

        // PUT api/Localizacao
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Localizacao localizacao) {
            // Se o Id do objeto não existir, ele retorna o "erro 404"
            if (id != localizacao.IdLocalizacao) {
                return BadRequest ();
            }
            try {
                await _repositorio.Alterar (localizacao);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var localizacao_valido = await _repositorio.BuscarPorID (id);

                if (localizacao_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            return NoContent ();
        }

        // DELETE api/localizacao/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Localizacao>> Delete (int id) {
            var localizacao = await _repositorio.BuscarPorID (id);
            if (localizacao == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (localizacao);

            return localizacao;
        }

    }
}