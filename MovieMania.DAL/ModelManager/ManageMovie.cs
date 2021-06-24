using Microsoft.Extensions.Options;
using MovieMania.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieMania.DAL.ModelManager
{
    public class ManageMovie
    {
        private readonly AppConfig configuration;

        public ManageMovie(IOptions<AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
        }

        public List<Movie> List(long profileId)
        {
            //Lists only the movies that aren't part of a profile's movies

            List<Movie> movieList = new List<Movie>();

            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;


                string query = "SELECT m.Id, m.Name, g.Name as Genre, m.Description, m.image FROM Movie m LEFT JOIN Genre g ON g.Id = m.GenreId  WHERE m.Id NOT IN (SELECT MovieId from ProfileMovie where ProfileId = @ProfileId)";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ProfileId", profileId);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {
                        Movie movie = new Movie();
                        movie.Id = Convert.ToInt64(reader["Id"].ToString());
                        movie.Name = reader["Name"] == DBNull.Value ? "Unavailable" : reader["Name"].ToString();
                        movie.Genre = reader["Genre"] == DBNull.Value ? "Unavailable" : reader["Genre"].ToString();
                        movie.Description = reader["Description"] == DBNull.Value ? "Unavailable" : reader["Description"].ToString();
                        movie.Image = reader["Image"] == DBNull.Value ? new byte[2] : (byte[])reader["Image"];

                        movieList.Add(movie);
                    }
                }
                connection.Close();
            }
            return movieList;
        }

        public List<Movie> ListProfileMovies(long profileId)
        {
            //List the movies of a specific profile

            List<Movie> movieList = new List<Movie>();

            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;


                string query = "SELECT m.Id, m.Name, g.Name as Genre, m.Description, m.image, pm.Rating FROM Movie m LEFT JOIN Genre g ON g.Id = m.GenreId left join ProfileMovie pm on pm.MovieId = m.Id  WHERE m.Id IN (SELECT MovieId from ProfileMovie where ProfileId = @ProfileId)";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ProfileId", profileId);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {
                        Movie movie = new Movie();
                        movie.Id = Convert.ToInt64(reader["Id"].ToString());
                        movie.Name = reader["Name"] == DBNull.Value ? "Unavailable" : reader["Name"].ToString();
                        movie.Genre = reader["Genre"] == DBNull.Value ? "Unavailable" : reader["Genre"].ToString();
                        movie.Description = reader["Description"] == DBNull.Value ? "Unavailable" : reader["Description"].ToString();
                        movie.Image = reader["Image"] == DBNull.Value ? new byte[2] : (byte[])reader["Image"];
                        movie.Rating = reader["Rating"] == DBNull.Value ? 0 : Convert.ToInt32(reader["Rating"].ToString());

                        movieList.Add(movie);
                    }
                }
                connection.Close();
            }
            return movieList;
        }
    }
}
