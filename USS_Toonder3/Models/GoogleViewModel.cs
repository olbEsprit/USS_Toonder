using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USS_Toonder.Models
{
    public class GoogleViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
        public string LastName { get; set; }
        public string FirtstName { get; set; }
        public string PictureUrl { get; set; }
    }
}
