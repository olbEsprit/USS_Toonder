using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace USS_Toonder3.Models
{
    public class MyPageViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public string Gender { get; set; }
        public string Location { get; set; }
        public DateTime Birthday { get; set; }
    }
}
