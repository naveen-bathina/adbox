// User Signup & Profile TDD: First Test (RED)
// This is a high-level integration test for the user signup endpoint.
// Framework: xUnit (C#), can be adapted as needed.

using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace UserService.Tests
{
    public class UserSignupTests
    {
        [Fact]
        public async Task User_Can_Signup_And_Login()
        {
            // Arrange
            using var factory = new TestServerFactory();
            var client = factory.CreateClient();
            var signupRequest = new
            {
                name = "Test User",
                age = 25,
                gender = "male",
                location = "Hyderabad",
                phone = "+911234567890",
                email = "testuser@example.com",
                password = "Test@1234"
            };

            // Act
            var signupResponse = await client.PostAsJsonAsync("/api/users/signup", signupRequest);
            signupResponse.EnsureSuccessStatusCode();

            var loginRequest = new
            {
                email = "testuser@example.com",
                password = "Test@1234"
            };
            var loginResponse = await client.PostAsJsonAsync("/api/users/login", loginRequest);
            loginResponse.EnsureSuccessStatusCode();

            // Assert
            Assert.Equal(HttpStatusCode.OK, signupResponse.StatusCode);
            Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);
            var token = await loginResponse.Content.ReadAsStringAsync();
            Assert.False(string.IsNullOrWhiteSpace(token));
        }
    }
}
