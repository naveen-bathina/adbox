// UserController stub for CQRS + Clean Architecture
using Microsoft.AspNetCore.Mvc;

namespace UserService.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        // In-memory user store for demo/testing
        private class UserWithPoints
        {
            public Application.Users.SignupUserCommand User { get; set; }
            public int Points { get; set; } = 0;
        }

        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, UserWithPoints> Users = new();


        [HttpPost("signup")]
        public IActionResult Signup([FromBody] Application.Users.SignupUserCommand request)
        {
            if (Users.ContainsKey(request.Email))
                return Conflict("User already exists");
            Users[request.Email] = new UserWithPoints { User = request, Points = 0 };
            return Ok();
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] Application.Users.LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Invalid login request");
            if (Users.TryGetValue(request.Email, out var user) && user.User.Password == request.Password)
            {
                // Return a fake JWT for now
                return Ok(System.Guid.NewGuid().ToString());
            }
            return Unauthorized();
        }

        [HttpGet("{email}/points")]
        public IActionResult GetPoints(string email)
        {
            if (Users.TryGetValue(email, out var user))
                return Ok(new { points = user.Points });
            return NotFound();
        }

        [HttpPost("{email}/points/add")]
        public IActionResult AddPoints(string email, [FromBody] int amount)
        {
            if (amount <= 0) return BadRequest("Amount must be positive");
            if (Users.TryGetValue(email, out var user))
            {
                user.Points += amount;
                return Ok(new { points = user.Points });
            }
            return NotFound();
        }

        [HttpPost("{email}/points/redeem")]
        public IActionResult RedeemPoints(string email, [FromBody] int amount)
        {
            if (amount <= 0) return BadRequest("Amount must be positive");
            if (Users.TryGetValue(email, out var user))
            {
                if (user.Points < amount) return BadRequest("Not enough points");
                user.Points -= amount;
                return Ok(new { points = user.Points });
            }
            return NotFound();
        }
    }
}
