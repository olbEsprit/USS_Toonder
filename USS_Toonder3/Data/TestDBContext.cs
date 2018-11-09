using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using USS_Toonder3.Models.Entities;

namespace USS_Toonder3.Models
{
    public partial class TestDBContext : IdentityDbContext<AppUser>
    {
        public TestDBContext(DbContextOptions options)
              : base(options)
        {
        }

        //public DbSet<Person> People { get; set; }
    }
}
