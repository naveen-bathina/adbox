using Microsoft.AspNetCore.Mvc;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/admin/surveys")]
    public class SurveyController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateSurvey([FromBody] dynamic survey)
        {
            // Minimal implementation for TDD: echo back the title
            return Created(string.Empty, new { title = (string)survey.title });
        }
    }
}
