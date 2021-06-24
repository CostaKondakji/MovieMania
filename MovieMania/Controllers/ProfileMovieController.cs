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
    public class ProfileMovieController : Controller
    {
        private readonly AppConfig configuration;
        private ManageMovie movieManager;
        private ManageProfileMovie profileMovieManager;

        public ProfileMovieController(IOptions<DAL.AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
            movieManager = new ManageMovie(appConfiguration);
            profileMovieManager = new ManageProfileMovie(appConfiguration);
        }

        // GET api/ProfileMovie/List/
        [HttpGet("[action]/{profileId}")]
        public JsonResult List(int profileId)
        {
            try
            {

                List<Movie> profileMovies = movieManager.ListProfileMovies(profileId);

                return Json(new { profileMovies });
            }
            catch (Exception exception)
            {
                return Json(new { profileMovies = new List<Movie>() });
            }
        }

        // POST api/ProfileMovie/Add
        [HttpPost("[action]/")]
        public JsonResult Add([FromBody] ProfileMovie profilemovie)
        {
            try
            {

                bool result = profileMovieManager.Add(profilemovie.ProfileId, profilemovie.MovieId);

                return Json(new { result });
            }
            catch (Exception exception)
            {
                return Json(new { result = false });
            }
        }

        // POST api/ProfileMovie/Delete
        [HttpDelete("[action]/")]
        public JsonResult Delete([FromBody] ProfileMovie profilemovie)
        {
            try
            {

                bool result = profileMovieManager.Delete(profilemovie.ProfileId, profilemovie.MovieId);

                return Json(new { result });
            }
            catch (Exception exception)
            {
                return Json(new { result = false });
            }
        }

        // POST api/ProfileMovie/Rate
        [HttpPut("[action]/")]
        public JsonResult Rate([FromBody] ProfileMovie profilemovie)
        {
            try
            {

                bool result = profileMovieManager.GiveRating(profilemovie.ProfileId, profilemovie.MovieId, profilemovie.Rating);

                return Json(new { result });
            }
            catch (Exception exception)
            {
                return Json(new { result = false });
            }
        }
    }
}
