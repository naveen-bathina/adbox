using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace UserService.Tests.Integration
{
    public class SurveyControllerTests : IClassFixture<TestWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public SurveyControllerTests(TestWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Admin_Can_Create_Survey()
        {
            // Arrange
            var survey = new {
                title = "Customer Feedback",
                description = "Quarterly feedback survey",
                type = "survey",
                questions = new[] {
                    new { text = "How satisfied are you?", type = "rating", options = new[] { "1", "2", "3", "4", "5" } }
                }
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/admin/surveys", survey);

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var created = await response.Content.ReadFromJsonAsync<dynamic>();
            Assert.Equal("Customer Feedback", (string)created.title);
        }
    }
}
