using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Dapper;
using Backend_Crud.Models;
using System.Data;
using static Backend_Crud.Models.Cuentas;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Backend_Crud.Controllers
{
	[ApiController]
	[Route("Logeo")]
	public class CuentasController : ControllerBase
	{

		private readonly IConfiguration _config;
		public CuentasController(IConfiguration config)
		{
			_config = config;
		}
		// Metodo de obtencion del usuario 
		public Cuentas Login2(string EMAIL, string Password)
		{
			using (SqlConnection conn = new SqlConnection(
				_config.GetConnectionString("DefaultConnection")))
			{
				
				var qry = "SELECT * FROM Cuentas WHERE Cuenta = @usr AND PCuenta = @pwd";
				return conn.QueryFirstOrDefault<Cuentas>(qry, new { usr = EMAIL, pwd = Password });
			}
		}
		// Logear Usuario
		[HttpPut]
		public bool GetLogeoUsuario(Cuentas cuenta)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var log = connection.QueryFirstOrDefault<Cuentas>("Select * From Cuentas where @Cuenta = Cuenta and @PCuenta = PCuenta", new { @Cuenta = cuenta.Cuenta, @PCuenta = cuenta.PCuenta });
			if (log == null)
			{
				return false;
			}
			return true;

		}
		//auntentificador
		[HttpPost("login")]
		[ProducesResponseType(200, Type = typeof(JwtSecurityTokenHandler))]
		[ProducesResponseType(400)]
		public IActionResult Login([FromBody] Cuentas cuentas)
		{
			Cuentas user = this.Login2(cuentas.Cuenta, cuentas.PCuenta);

			if (user == null)
			
				return BadRequest(new { message = "Username or password is incorrect" });
			
			var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySecretKey010203"));
			var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

			var tokenOptions = new JwtSecurityToken(
				claims: new List<Claim> {
				new Claim(ClaimTypes.Email,user.Cuenta),

				},
				expires: DateTime.Now.AddDays(2),
				signingCredentials: signinCredentials
			);

			var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
			return Ok( new { Token = tokenString});

		}
		//Añadir usuario
		[HttpPost("registrar")]
		public async Task<ActionResult<List<Cuentas>>> CreateCuenta(Cuentas cuentas)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			await connection.ExecuteAsync("CrearCuenta", new
			{
				@Cuenta = cuentas.Cuenta,
				@PCuenta = cuentas.PCuenta
			}, commandType: CommandType.StoredProcedure);
			return Ok();
		}
	}
}
