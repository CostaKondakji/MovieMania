using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieMania.DAL;
using MovieMania.DAL.Model;
using MovieMania.DAL.ModelManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieMania.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : Controller
    {

        private readonly AppConfig configuration;
        private ManageProfile profileManager;

        public ProfileController(IOptions<DAL.AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
            profileManager = new ManageProfile(appConfiguration);
        }

        // GET api/Profile/List/
        [HttpGet("[action]")]
        public JsonResult List()
        {
            try
            {

                List<Profile> profiles = profileManager.List();

                return Json(new { profiles });
            }
            catch (Exception exception)
            {
                return Json(new { profiles = new List<Profile>() });
            }
        }

        // GET api/Profile/Singularity/<username>
        [HttpGet("[action]/{username}")]
        public JsonResult Singularity(string username)
        {
            try
            {
                bool result = profileManager.checkSingularity(username);

                return Json(new { result });
            }
            catch (Exception exception)
            {
                return Json(new { result = false });
            }
        }

        // POST api/Profile/Add
        [HttpPost("[action]")]
        public IActionResult Add([FromBody] string username)
        {
            try
            {
                Profile profile = new Profile();
                if (ModelState.IsValid)
                {
                    profile = profileManager.Create(username);

                    return Ok();
                }
                return Unauthorized();
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
