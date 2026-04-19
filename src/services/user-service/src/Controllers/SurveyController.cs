using Microsoft.AspNetCore.Mvc;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/admin/surveys")]
    public class SurveyController : ControllerBase
    {
        public class SurveyQuestionDto
        {
            public string Text { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public string[] Options { get; set; } = new string[0];
        }

        public class SurveyCreateDto
        {
            public string Title { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string Type { get; set; } = string.Empty;
            public SurveyQuestionDto[] Questions { get; set; } = new SurveyQuestionDto[0];
        }

        private static readonly List<SurveyCreateDto> _surveys = new();

        [HttpPost]
        public IActionResult CreateSurvey([FromBody] SurveyCreateDto survey)
        {
            if (string.IsNullOrWhiteSpace(survey.Title) ||
                string.IsNullOrWhiteSpace(survey.Description) ||
                string.IsNullOrWhiteSpace(survey.Type) ||
                survey.Questions == null || survey.Questions.Length == 0)
            {
                return BadRequest(new { error = "Missing required fields or questions." });
            }
            _surveys.Add(survey);
            // Return the full survey object as the response
            return Created($"/api/admin/surveys/{_surveys.Count}", survey);
        }
    }
}
