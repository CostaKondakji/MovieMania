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
    public class ManageProfile
    {
        private readonly AppConfig configuration;

        public ManageProfile(IOptions<AppConfig> appConfiguration)
        {
            configuration = appConfiguration.Value;
        }

        public List<Profile> List() //Lists all profiles
        {
            List<Profile> profileList = new List<Profile>();

            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;

                string query = "SELECT * FROM [Profile]";
                cmd.CommandText = query;

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {
                        Profile profile = new Profile();
                        profile.Id = Convert.ToInt64(reader["Id"].ToString());
                        profile.Username = reader["Username"] == DBNull.Value ? "Unavailable" : reader["Username"].ToString();

                        profileList.Add(profile);
                    }
                }
                connection.Close();
            }
            return profileList;
        }

        public Profile Find(long Id)    //Find a specific profile based on its Id
        {
            Profile profile = new();

            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;

                string query = "SELECT TOP 1 * FROM [Profile] where Id=@Id";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Id", Id);

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {
                        profile.Id = Convert.ToInt64(reader["Id"].ToString());
                        profile.Username = reader["Username"] == DBNull.Value ? "Unavailable" : reader["Username"].ToString();
                    }
                }
                connection.Close();
            }
            return profile;
        }

        public bool checkSingularity(string username)   //Check if a username is already present in the Profile Table
        {
            bool isUnique = true;


            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {

                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;

                string query = "SELECT TOP 1 * FROM [Profile] where Username=@Username";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Username", username);

                object rowsAffectedObject = cmd.ExecuteScalar();

                if (rowsAffectedObject != null)
                {
                    long rowsAffected = (Int64)rowsAffectedObject;

                    if (rowsAffected >= 1)
                        isUnique = false;
                    else
                        isUnique = true;
                }

                connection.Close();
            }
            return isUnique;
        }

        public Profile Create(string username)
        {
            Profile user = new Profile();

            using (SqlConnection connection = new SqlConnection(configuration.ConnectionString))
            {
                connection.Open();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = connection;

                string query = "INSERT INTO [Profile]([Username]) OUTPUT INSERTED.Id Values(@Username)";
                cmd.CommandText = query;

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Username", username);

                object userIdObject = cmd.ExecuteScalar();

                if (userIdObject != null)
                {
                    long userId = (Int64)userIdObject;

                    if (userId >= 0)
                    {
                        user = Find(userId);
                    }
                }
                connection.Close();
            }
            return user;
        }
    }
}
