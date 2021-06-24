using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieMania.DAL.Model
{
    public class ProfileMovie
    {
        public Int64 Id { get; set; }
        public Int64 ProfileId { get; set; }
        public Int64 MovieId { get; set; }
        public int Rating { get; set; }
    }
}
