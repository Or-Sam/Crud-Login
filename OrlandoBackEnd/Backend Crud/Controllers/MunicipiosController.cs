using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Backend_Crud.Models;
using System.Data;
using static Backend_Crud.Models.Municipios;

namespace Backend_Crud.Controllers
{
	[ApiController]
	[Route("/Municipios")]
	public class MunicipiosController : ControllerBase
	{
		private readonly IConfiguration _config;

		public MunicipiosController(IConfiguration config)
		{
			_config = config;
		}

		// Metodo para seleccionar todos los Municipios
		[HttpGet("{EFE_KEY}")]
		public async Task<ActionResult<List<Municipio>>> SelectAllMunicipios(string EFE_KEY)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var muni = await connection.QueryAsync<Municipio>("ObtenerMunicipios", new { @conMun = EFE_KEY }, commandType: CommandType.StoredProcedure);
			return Ok(muni);
		}
	}
}
