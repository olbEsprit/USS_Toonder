using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using USS_Toonder.Models;
using USS_Toonder3.Models;
using USS_Toonder3.Models.Entities;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;

namespace USS_Toonder3.Controllers
{
    //[Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {


        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppUserRole> _roleManager;
        private IPasswordHasher<AppUser> _passwordHasher;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<AppUserRole> roleManager, IPasswordHasher<AppUser> passwordHasher)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _passwordHasher = passwordHasher;
            //_configuration = configuration;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("api/Auth/Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = new AppUser()
            {
                UserName = model.Email.Split('@')[0],
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("error", error.Description);
            }
            return BadRequest(result.Errors);
        }

        //[ValidateForm]
        [HttpPost("CreateToken")]
        [Route("api/Auth/Login")]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return Unauthorized();
                }
                if (_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) == PasswordVerificationResult.Success)
                {
                    var userClaims = await _userManager.GetClaimsAsync(user);

                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email)
                    }.Union(userClaims);

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokeOptions = new JwtSecurityToken(
                       issuer: "http://localhost:5000",
                       audience: "http://localhost:5000",
                       claims: claims,
                       expires: DateTime.Now.AddMinutes(60),
                       signingCredentials: signinCredentials
                   );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(tokeOptions),
                        expiration = tokeOptions.ValidTo
                    });
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "error while creating token");
            }
        }


        [HttpPost("CreateToken")]
        [Route("api/Auth/GoogleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] string token)
        {
            GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token);
            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                var new_user = new AppUser()
                {
                    UserName = payload.Email.Split('@')[0],
                    Email = payload.Email,
                    EmailConfirmed = payload.EmailVerified,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    PictureUrl = payload.Picture
                };

                var result = await _userManager.CreateAsync(new_user);

                if (result.Succeeded)
                {
                    return Ok(token);
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("error", error.Description);
                }
                return BadRequest(result.Errors);
            }
            else
            {
                return Ok(token);
            }
            //return Ok(payload);

        }


        [HttpPost("CreateToken")]
        [Route("api/Auth/MSLogin")]
        public async Task<IActionResult> MSLoginAsync([FromBody] MSViewModel token)
        {
            if(token.Iss == "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0")
            {
                var user = await _userManager.FindByEmailAsync(token.PreferredUsername);
                if (user == null)
                {
                    var new_user = new AppUser()
                    {
                        UserName = token.PreferredUsername.Split('@')[0],
                        Email = token.PreferredUsername,
                        FirstName = token.Name.Split(' ')[0],
                        LastName = token.Name.Split(' ')[1],
                        Birthday = DateTime.MinValue
                    };

                    var result = await _userManager.CreateAsync(new_user);
                }

                var userClaims = await _userManager.GetClaimsAsync(user);

                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email)
                    }.Union(userClaims);

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                   issuer: "http://localhost:5000",
                   audience: "http://localhost:5000",
                   claims: claims,
                   expires: DateTime.Now.AddMinutes(60),
                   signingCredentials: signinCredentials
               );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(tokeOptions),
                    expiration = tokeOptions.ValidTo
                });

            }
            return Ok();
        }
    }
}