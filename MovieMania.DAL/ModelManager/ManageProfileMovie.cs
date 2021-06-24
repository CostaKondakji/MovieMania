using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieMania.DAL.ModelManager
{
    public class ManageProfileMovie
    {
        private readonly AppConfig configuration;

        public ManageProfileMovie(IOptions<AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
        }

        public bool Add(long profileId, long movieId)
        {

            bool result = false;
            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;


                string query = "INSERT INTO ProfileMovie([MovieId],[ProfileId],[Rating]) OUTPUT INSERTED.Id VALUES (@MovieId,@ProfileId, @Rating)";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ProfileId", profileId);
                cmd.Parameters.AddWithValue("@MovieId", movieId);
                cmd.Parameters.AddWithValue("@Rating", 0);

                object profileMovieObject = cmd.ExecuteScalar();

                if (profileMovieObject != null)
                {
                    long profileMovieId = (Int64)profileMovieObject;

                    if (profileMovieId >= 0)
                    {
                        result = true;
                    }
                }
                connection.Close();
            }
            return result;
        }

        public bool Delete(long profileId, long movieId)
        {

            bool result = false;
            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;


                string query = "DELETE FROM ProfileMovie OUTPUT deleted.Id WHERE ProfileId=@ProfileId AND MovieId=@MovieId";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ProfileId", profileId);
                cmd.Parameters.AddWithValue("@MovieId", movieId);

                object profileMovieObject = cmd.ExecuteScalar();

                if (profileMovieObject != null)
                {
                    long profileMovieId = (Int64)profileMovieObject;

                    if (profileMovieId >= 0)
                    {
                        result = true;
                    }
                }
                connection.Close();
            }
            return result;
        }


        public bool GiveRating(long profileId, long movieId, int rating)
        {

            bool result = false;
            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;


                string query = "UPDATE ProfileMovie SET Rating=@Rating OUTPUT Inserted.Id WHERE ProfileId=@ProfileId AND MovieId=@MovieId";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Rating", rating);
                cmd.Parameters.AddWithValue("@ProfileId", profileId);
                cmd.Parameters.AddWithValue("@MovieId", movieId);

                object profileMovieObject = cmd.ExecuteScalar();

                if (profileMovieObject != null)
                {
                    long profileMovieId = (Int64)profileMovieObject;

                    if (profileMovieId >= 0)
                    {
                        result = true;
                    }
                }
                connection.Close();
            }
            return result;
        }
    }
}
