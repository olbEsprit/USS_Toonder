using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace USS_Toonder3.Models.Entities
{
    public class AppUserRole : IdentityRole
    {
        public string description { get; set; }
    }
}
