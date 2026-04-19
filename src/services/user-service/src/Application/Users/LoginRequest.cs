// DTO for login request
namespace UserService.Application.Users
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
