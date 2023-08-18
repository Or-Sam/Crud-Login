using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Backend_Crud.Models;
using System.Data;
using static Backend_Crud.Models.Localidades;

namespace Backend_Crud.Controllers
{
	[ApiController]
	[Route("/Localidades")]
	public class LocalidadesController : ControllerBase
	{
		private readonly IConfiguration _config;

		public LocalidadesController(IConfiguration config)
		{
			_config = config;
		}

		[HttpGet("{CVE_ENT}/{CVE_MUN}")]
		// Metodo para seleccionar todas las Localidades
		public async Task<ActionResult<List<Localidad>>> SelectAllLocalidades(string CVE_ENT, string CVE_MUN)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var loc = await connection.QueryAsync<Localidad>("ObtenerLocalidad", new { @conEstE = CVE_ENT, @conEstM = CVE_MUN }, commandType: CommandType.StoredProcedure);
			return Ok(loc);
		}
	}
}
