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
    public class MovieController : Controller
    {
        private readonly AppConfig configuration;
        private ManageMovie movieManager;

        public MovieController(IOptions<DAL.AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
            movieManager = new ManageMovie(appConfiguration);
        }

        // GET api/Profile/List/
        [HttpGet("[action]/{profileId}")]
        public JsonResult List(int profileId)
        {
            try
            {

                List<Movie> movies = movieManager.List(profileId);

                return Json(new { movies });
            }
            catch (Exception exception)
            {
                return Json(new { profiles = new List<Movie>() });
            }
        }
    }
}
