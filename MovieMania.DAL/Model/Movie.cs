using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieMania.DAL.Model
{
    public class Movie
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public int? Rating { get; set; }
    }
}
