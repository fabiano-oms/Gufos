using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

// Criar base para a API
// dotnet new webapi

// Se instala somente uma vez, pois é global
// Istalamos o Entity Framework
// dotnet tool install --global dotnet-ef
// --------------------------------------


// Se instala sempre que necessário em cada projeto
// -------------------------------------------------
// Baixamos o pacote SQLServer do Entity Framework
// dotnet add package Microsoft.EntityFrameworkCore.SqlServer

// Baixamos o pacote que irá escrever nossos códigos
// dotnet add package Microsoft.EntityFrameworkCore.Design

// Testamos se os pacotes foram instalados
// dotnet restore

// Testamos a instalação do EF
// dotnet ef

// Código que criará o nosso Contexto da Base de Dados e nosso Models
// dotnet ef dbcontext scaffold "Server=DESKTOP-LNH3DKI\SQLEXPRESS; Database=Gufos; User Id=sa; Password=132" Microsoft.EntityFrameworkCore.SqlServer -o Models -d
// -o Identificação dos arquivos de origem
// -d Identifca primary key, foreign key, tamanho dos caracteres

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // Mudamos o:
        // services.AddControllers. PARA:
        // services.AddControllers.WithViews().AddNewtonsoftJson( opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore );
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddNewtonsoftJson(
                opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
