using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json;

namespace UserService.Tests.Integration
{
    public class UserPointsControllerTests : IClassFixture<TestServerFactory>
    {
        private readonly HttpClient _client;
        public UserPointsControllerTests(TestServerFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task CanAddAndRedeemPoints()
        {
            // Always use a unique email for each test run
            var email = $"testuser_{System.Guid.NewGuid()}@example.com";
            var signup = new
            {
                Email = email,
                Password = "pass",
                Name = "Test User",
                Age = 25,
                Gender = "Other",
                Location = "Global",
                Phone = "1234567890"
            };
            var signupContent = new StringContent(JsonConvert.SerializeObject(signup), Encoding.UTF8, "application/json");
            var signupResp = await _client.PostAsync("/api/users/signup", signupContent);
            signupResp.EnsureSuccessStatusCode();

            // Add points
            var addContent = new StringContent("10", Encoding.UTF8, "application/json");
            var addResp = await _client.PostAsync($"/api/users/{email}/points/add", addContent);
            addResp.EnsureSuccessStatusCode();
            var addJson = await addResp.Content.ReadAsStringAsync();
            Assert.Contains("10", addJson);

            // Redeem points
            var redeemContent = new StringContent("5", Encoding.UTF8, "application/json");
            var redeemResp = await _client.PostAsync($"/api/users/{email}/points/redeem", redeemContent);
            redeemResp.EnsureSuccessStatusCode();
            var redeemJson = await redeemResp.Content.ReadAsStringAsync();
            Assert.Contains("5", redeemJson);

            // Get points
            var getResp = await _client.GetAsync($"/api/users/{email}/points");
            getResp.EnsureSuccessStatusCode();
            var getJson = await getResp.Content.ReadAsStringAsync();
            Assert.Contains("5", getJson);
        }
    }
}

