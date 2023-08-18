using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Backend_Crud.Models;
using System.Data;
using static Backend_Crud.Models.Estados;

namespace Backend_Crud.Controllers
{
	[ApiController]
	[Route("/Estados")]
	public class EstadosController : ControllerBase
	{
		private readonly IConfiguration _config;

		public EstadosController(IConfiguration config)
		{
			_config = config;
		}
		// Buscar todos los Estados
		[HttpGet]
		public async Task<ActionResult<List<Estado>>> GetAllEstados()
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var estados = await connection.QueryAsync<Estado>("select ENTIDAD_FEDERATIVA, CATALOG_KEY, abreviatura From CatEntidadesFederativas");
			return Ok(estados);
		}

		// Buscar todos los EstadoNombre
		[HttpGet("Estadonombre/{CATALOG_KEY}")]
		public async Task<ActionResult<List<Estadonombre>>> GetEstados(string CATALOG_KEY)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var Estadonombre = await connection.QueryAsync<Estadonombre>("ObtenerEstadoNombre", new { @conEst = CATALOG_KEY }, commandType: CommandType.StoredProcedure);
			return Ok(Estadonombre);
		}
	}
}
