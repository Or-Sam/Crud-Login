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
	[Route("/Usuarios")]
	public class UsuariosController : ControllerBase
	{
		private readonly IConfiguration _config;

		public UsuariosController(IConfiguration config) 
		{
			_config = config;
		}
		// Buscar todos los usuarios
		[HttpGet]
		public async Task<ActionResult<List<Usuario>>> GetAllUsuarios()
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			IEnumerable<Usuario> nombres = await SelectAllUsuarios(connection); 
			return Ok(nombres);
		}
		// Buscar un usuario en base al Idusuario
		[HttpGet("buscar/{Idusuario}")]
		public async Task<ActionResult<Usuario>> GetUsuarios(int Idusuario)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			var nombre = await connection.QueryAsync<Usuario>("SelectUsuario",
				new { @Idusuario = Idusuario}, commandType: CommandType.StoredProcedure);
			return Ok(nombre);
		}
		//Añadir usuario
		[HttpPost("crear")]
		public async Task<ActionResult<List<Usuario>>> CreateUsuario(Usuario nombre)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			await connection.ExecuteAsync("CrearUsuario", new
			{
				@Nombre = nombre.Nombre,
				@Direccion = nombre.Direccion,
				@Telefono = nombre.Telefono,
				@CodPostal = nombre.Codpostal,
				@TipoUsuario = nombre.Tipousuario,
				@Estado = nombre.Estado,
				@Roll = nombre.Roll,
				@Localidad = nombre.Localidad,
				@Municipio = nombre.Municipio
			}, commandType: CommandType.StoredProcedure);
			return Ok(await SelectAllUsuarios(connection));
		}
		//Actualizar Usuario
		[HttpPut("actualizar")]
		public async Task<ActionResult<List<Usuario>>> ActualizarUsuario(Usuario nombre)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			await connection.ExecuteAsync("ActualizarUsuario", new
			{
				@IdUsuario = nombre.Idusuario,
				@Nombre = nombre.Nombre,
				@Direccion = nombre.Direccion,
				@Telefono = nombre.Telefono,
				@CodPostal = nombre.Codpostal,
				@TipoUsuario = nombre.Tipousuario,
				@Estado = nombre.Estado,
				@Roll = nombre.Roll,
				@Localidad = nombre.Localidad,
				@Municipio = nombre.Municipio
			}, commandType: CommandType.StoredProcedure);
			return Ok(await SelectAllUsuarios(connection));
		}
		// Eliminar Usuario
		[HttpGet("eliminar/{Idusuario}")]
		public async Task<ActionResult<List<Usuario>>> DeleteUsuarios(int Idusuario)
		{
			using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
			await connection.ExecuteAsync("EliminarUsuario" , new { @Idusuario = Idusuario }, commandType: CommandType.StoredProcedure);
			return Ok(await SelectAllUsuarios(connection));
		}
		
		// Metodo para seleccionar todos los usuarios
		private static async Task<IEnumerable<Usuario>> SelectAllUsuarios(SqlConnection connection)
		{
			return await connection.QueryAsync<Usuario>("select * from Usuarios");
		}

	}
}
