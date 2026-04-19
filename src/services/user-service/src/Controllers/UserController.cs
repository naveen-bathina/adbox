// UserController stub for CQRS + Clean Architecture
using Microsoft.AspNetCore.Mvc;

namespace UserService.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        // In-memory user store for demo/testing
        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, Application.Users.SignupUserCommand> Users = new();

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] Application.Users.SignupUserCommand request)
        {
            if (Users.ContainsKey(request.Email))
                return Conflict("User already exists");
            Users[request.Email] = request;
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Application.Users.LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Invalid login request");
            if (Users.TryGetValue(request.Email, out var user) && user.Password == request.Password)
            {
                // Return a fake JWT for now
                return Ok(System.Guid.NewGuid().ToString());
            }
            return Unauthorized();
        }
    }
}
