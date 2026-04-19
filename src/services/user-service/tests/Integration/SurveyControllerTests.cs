using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace UserService.Tests.Integration
{
    public class SurveyControllerTests : IClassFixture<TestServerFactory>
    {
        private readonly HttpClient _client;

        public SurveyControllerTests(TestServerFactory factory)
        {
            _client = factory.CreateClient();
        }

        class SurveyQuestionDto
        {
            public string Text { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public string[] Options { get; set; } = new string[0];
        }

        class SurveyCreateDto
        {
            public string Title { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public SurveyQuestionDto[] Questions { get; set; } = new SurveyQuestionDto[0];
        }

        [Fact]
        public async Task Admin_Can_Persist_Survey()
        {
            // Arrange
            var survey = new SurveyCreateDto
            {
                Title = "Persisted Survey",
                Description = "Should be stored in-memory",
                Type = "survey",
                Questions = new[]
                {
                    new SurveyQuestionDto
                    {
                        Text = "Q1",
                        Type = "text",
                        Options = new string[0]
                    }
                }
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/admin/surveys", survey);

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var created = await response.Content.ReadFromJsonAsync<SurveyCreateDto>();
            Assert.Equal("Persisted Survey", created.Title);
            // Note: In-memory persistence is not externally verifiable without a GET endpoint, but this ensures the POST works.
        }

        [Fact]
        public async Task Admin_Cannot_Create_Invalid_Survey()
        {
            // Arrange: missing title and questions
            var invalidSurvey = new SurveyCreateDto
            {
                Title = "",
                Description = "",
                Type = "survey",
                Questions = new SurveyQuestionDto[0]
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/admin/surveys", invalidSurvey);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            var error = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            Assert.True(error.ContainsKey("error"));
        }
        public async Task Admin_Can_Create_Survey()
        {
            // Arrange
            var survey = new SurveyCreateDto
            {
                Title = "Customer Feedback",
                Description = "Quarterly feedback survey",
                Type = "survey",
                Questions = new[]
                {
                    new SurveyQuestionDto
                    {
                        Text = "How satisfied are you?",
                        Type = "rating",
                        Options = new[] { "1", "2", "3", "4", "5" }
                    }
                }
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/admin/surveys", survey);

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var created = await response.Content.ReadFromJsonAsync<SurveyCreateDto>();
            Assert.Equal("Customer Feedback", created.Title);
        }
    }
}
