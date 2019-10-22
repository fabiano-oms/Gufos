using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace Backend.Controllers {
    [Route ("api/[Controller]")]
    [ApiController]
    public class LoginController : ControllerBase {
        // Chamamos nosso contexto da base de dados
        GufosContext _context = new GufosContext ();

        // Definimos uma variável para percorrer nossos métodos com as configurações obtidas no appsettings.json
        private IConfiguration _config;

        // Definimos um método construtor para poder acessar estas configs
        public LoginController (IConfiguration config) {
            _config = config;
        }

        // Chamamos nosso método para validar o usuário na aplicação
        private Usuario ValidaUsuario (Usuario login) {
            var usuario = _context.Usuario.FirstOrDefault (
                u => u.Email == login.Email && u.Senha == login.Senha
            );

            // confirmando se o usuario ja está no banco de dados
            if (usuario != null) {
                usuario = login;
            }

            return usuario;
        }

        // Gerar o Token
        private string GerarToken (Usuario userInfo) {

            // Definimos a criptografia do nosso Token
            var securityKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_config["Jwt:key"]));

            var credentials = new SigningCredentials (securityKey, SecurityAlgorithms.HmacSha256);

            // Definimos nossas Claims (dados da sessão)
            var claims = new [] {
                new Claim (JwtRegisteredClaimNames.NameId, userInfo.UsuarioNome),
                new Claim (JwtRegisteredClaimNames.Email, userInfo.Email),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ()),
            };

            var token = new JwtSecurityToken (
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials : credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Usamos essa anotação para ignorar a autentificação nesse método
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]Usuario login){
            IActionResult response = Unauthorized();
            var user = ValidaUsuario(login);
            if(user != null){
                var tokenString = GerarToken (user);
                response = Ok(new { token = tokenString });
            }
        return response;
        }
    }
}