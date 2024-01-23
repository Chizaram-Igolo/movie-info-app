namespace MovieInfoApp.Server.Services
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    public class MovieService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "9e6ea953";
        private readonly string _imdbId = "tt3896198";

        public MovieService(HttpClient httpClient)
        {
            _httpClient = httpClient; 
        }

        public async Task<MovieSearchResult> SearchMoviesAsync(string title)
        {
            var url = $"http://www.omdbapi.com/?s={title}&apikey={_apiKey}";
            var response = await _httpClient.GetStringAsync(url);
            return JsonConvert.DeserializeObject<MovieSearchResult>(response);
        }

        public async Task<MovieDetails> GetMovieDetailsAsync(string imdbId)
        {
            var url = $"http://www.omdbapi.com/?i={imdbId}&apikey={_apiKey}";
            var response = await _httpClient.GetStringAsync(url);
            return JsonConvert.DeserializeObject<MovieDetails>(response);
        }
    }

    public class MovieSearchResult
    {
        public SearchItem[] Search { get; set; }
    }

    public class SearchItem
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string ImdbId { get; set; }
        public string Type { get; set; }
        public string Poster { get; set; }
    }

    public class MovieDetails
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string ImdbId { get; set; }
        public string Type { get; set; }
        public string Poster { get; set; }
        public string Plot { get; set; }
        public string ImdbRating { get; set; }
        // Add other properties as needed
    }

}
