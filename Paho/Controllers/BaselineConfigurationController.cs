using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Paho.Models;
using Microsoft.AspNet.Identity;

namespace Paho.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BaselineConfigurationController : ControllerBase
    {
        // GET: BaselineConfiguration
        public ActionResult Index()
        {
            BaselineConfigurationViewModel oBaseLineConfig = new BaselineConfigurationViewModel();

            //var ExportarViewModel = new ExportarViewModel();
            //IQueryable<Institution> institutions = null;
            //IQueryable<Paho.Models.Region> regions = null;
            ////IQueryable<Paho.Models.Area> areas = null;
            //IQueryable<Area> areas = null;                          //#### CAFQ: 180703 
            //IQueryable<ReportCountry> ReportsCountries = null;

            //var user = UserManager.FindById(User.Identity.GetUserId());
            //ExportarViewModel.CountryID = user.Institution.CountryID ?? 0;
            var countries = db.Countries
                                .Where(i => i.Active == true)
                                .Select(c => new CountryView()
                                {
                                    Id = c.ID.ToString(),
                                    Name = c.Name,
                                    Active = c.Active
                                });

            oBaseLineConfig.Countries = countries;

            return View(oBaseLineConfig);
        }
    }
}