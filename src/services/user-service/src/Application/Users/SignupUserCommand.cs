// SignupUserCommand for CQRS
namespace UserService.Application.Users
{
    public class SignupUserCommand
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
