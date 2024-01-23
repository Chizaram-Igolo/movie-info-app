using Microsoft.AspNetCore.Mvc;

namespace MovieInfoApp.Server.Controllers
{
    // MovieSearchBackend/Controllers/MoviesController.cs
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Caching.Memory;
    using MovieInfoApp.Server.Services;

    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowOrigin")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;
        private readonly IMemoryCache _memoryCache;

        public MoviesController(MovieService movieService, IMemoryCache memoryCache)
        {
            _movieService = movieService;
            _memoryCache = memoryCache;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest("Title cannot be empty");
            }

            var result = await _movieService.SearchMoviesAsync(title);

            // Cache the search query
            CacheSearchQuery(title);

            return Ok(result);
        }

        [HttpGet("details/{imdbId}")]
        public async Task<IActionResult> GetMovieDetails(string imdbId)
        {
            if (string.IsNullOrWhiteSpace(imdbId))
            {
                return BadRequest("IMDB ID cannot be empty");
            }

            var details = await _movieService.GetMovieDetailsAsync(imdbId);

            return Ok(details);
        }

        [HttpGet("history")]
        public IActionResult GetSearchHistory()
        {
            var history = _memoryCache.Get<List<string>>("SearchHistory") ?? new List<string>();
            return Ok(history);
        }

        private void CacheSearchQuery(string query)
        {
            var history = _memoryCache.Get<List<string>>("SearchHistory") ?? new List<string>();

            if (history.Count >= 5)
            {
                history.RemoveAt(0);
            }

            history.Add(query);

            _memoryCache.Set("SearchHistory", history);
        }
    }

}
