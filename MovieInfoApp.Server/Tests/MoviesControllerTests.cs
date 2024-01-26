namespace MovieInfoApp.Server.Tests
{
    // MovieSearchBackend.Tests/MoviesControllerTests.cs

    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Caching.Memory;
    using Moq;
    using MovieInfoApp.Server.Controllers;
    using MovieInfoApp.Server.Services;
    using Xunit;

    public class MoviesControllerTests
    {
        public async Task SearchMovies_ReturnsOkResult()
        {
            var movieServiceMock = new Mock<MovieService>();
            var memoryCacheMock = new Mock<IMemoryCache>();

            var controller = new MoviesController(movieServiceMock.Object, memoryCacheMock.Object);

            var result = await controller.SearchMovies("Inception");

            Assert.IsType<OkObjectResult>(result);
        }

        public async Task GetMovieDetails_ReturnsOkResult()
        {
            var movieServiceMock = new Mock<MovieService>();
            var memoryCacheMock = new Mock<IMemoryCache>();

            var controller = new MoviesController(movieServiceMock.Object, memoryCacheMock.Object);

            var result = await controller.GetMovieDetails("tt1375666");

            Assert.IsType<OkObjectResult>(result);
        }
    }

}
