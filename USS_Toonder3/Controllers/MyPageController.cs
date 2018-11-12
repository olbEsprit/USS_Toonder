using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using USS_Toonder3.Models;
using USS_Toonder3.Models.Entities;

namespace USS_Toonder3.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]

    public class MyPageController : ControllerBase
    {

        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppUserRole> _roleManager;

        public MyPageController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppUserRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPut("{email}")]
        [Route("api/MyPage/Update/{email}")]
        public async Task<IActionResult> UpdateMyPage([FromRoute] string email, [FromBody] MyPageViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return Unauthorized();
                }
                if (model.FirstName != null) { user.FirstName = model.FirstName; }

                if (model.LastName != null) { user.LastName = model.LastName; }
                if (model.PictureUrl != null) { user.PictureUrl = model.PictureUrl; }
                if (model.Gender != null) { user.Gender = model.Gender; }
                if (model.Location != null) { user.Location = model.Location; }
                if (model.Birthday != null) { user.Birthday = model.Birthday; }
                await _userManager.UpdateAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "error ");
            }

        }

        [HttpGet]
        [Route("api/MyPage/GetAllPeople")]
        public async Task<List<AppUser>> GetAllPeople()
        {
            return await Task.Run(() =>
            {
                return _userManager.Users.ToList();
            }); 
        }


        [HttpGet]
        [Route("api/MyPage/GetUserByEmail/{email}")]
        public async Task<AppUser> GetUserByEmail([FromRoute] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        [HttpGet]
        [Route("api/MyPage/GetUserByID/{id}")]
        public async Task<AppUser> GetUserByID([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return user;
        }


    }
}