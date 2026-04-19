using Microsoft.AspNetCore.Mvc;

namespace UserService.Api.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] dynamic request)
        {
            // For now, always return Unauthorized for test
            return Unauthorized();
        }
    }
}
