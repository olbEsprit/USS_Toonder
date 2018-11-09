
using Microsoft.AspNetCore.Identity;
using System;

namespace USS_Toonder3.Models.Entities
{
    // Add profile data for application users by adding properties to this class
  public class AppUser : IdentityUser
  {
        // Extended Properties
    //public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    //public long? FacebookId { get; set; }
    public string PictureUrl { get; set; }
    public string Gender { get; set; }
    public string Location { get; set; }
    public DateTime Birthday { get; set; }
    }
}
