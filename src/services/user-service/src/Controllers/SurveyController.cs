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
            // Minimal implementation for TDD: echo back the title
            return Created(string.Empty, new { title = survey.Title });
        }
    }
}
