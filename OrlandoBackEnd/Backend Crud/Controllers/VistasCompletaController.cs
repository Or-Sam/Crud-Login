using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Backend_Crud.Models;
using System.Data;
using static Backend_Crud.Models.VistasCompleta;

namespace Backend_Crud.Controllers
{
	[ApiController]
	[Route("/Vistacompleta")]
	public class VistasCompletaController : ControllerBase
	{
		private readonly IConfiguration _config;

		public VistasCompletaController(IConfiguration config)
		{
			_config = config;
		}

		// Ver Vista
		[HttpGet]
		public async Task<ActionResult<List<VistaCompleta>>> GetAllEstados()
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var vistacompleta = await connection.QueryAsync<VistaCompleta>("VistaCompleta", commandType: CommandType.StoredProcedure);
			return Ok(vistacompleta);
		}

	}
}
