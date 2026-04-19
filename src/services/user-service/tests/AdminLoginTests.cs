using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json;

namespace UserService.Tests
{
    public class AdminLoginTests : IClassFixture<TestServerFactory>
    {
        private readonly HttpClient _client;
        public AdminLoginTests(TestServerFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task AdminLogin_InvalidCredentials_ReturnsUnauthorized()
        {
            var payload = new { email = "admin@example.com", password = "wrongpass" };
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("/api/admin/login", content);
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
