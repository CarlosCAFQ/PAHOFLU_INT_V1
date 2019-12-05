using Microsoft.AspNet.Identity;
using PagedList;
using Paho.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Paho.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CatVirusFlowController : ControllerBase
    {
        private int _pageSize = 10;

        // GET: CatVirusFlow
        public ActionResult Index(string sortOrder, string currentFilter, string searchString, int? page)
        {
            //ViewBag.CurrentSort = sortOrder;
            //ViewBag.IDSortParm = sortOrder == "id" ? "id_desc" : "id";
            //ViewBag.SurvSortParm = string.IsNullOrEmpty(sortOrder) ? "surv_desc" : "";
            //ViewBag.IsSampleSortParm = sortOrder == "issample" ? "issample_desc" : "issample";
            //ViewBag.OrdenSortParm = sortOrder == "orden" ? "orden_desc" : "orden";

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewBag.CurrentFilter = searchString;

            var catalogo = from c in db.CatViruFlows select c;
            //if (!string.IsNullOrEmpty(searchString))
            //{
            //    catalogo = catalogo.Where(s => s.SPA.Contains(searchString) || s.ENG.Contains(searchString));
            //}

            switch (sortOrder)
            {
                //case "surv":
                //    catalogo = catalogo.OrderBy(s => s.Surv);
                //    break;
                //case "surv_desc":
                //    catalogo = catalogo.OrderByDescending(s => s.Surv);
                //    break;
                //case "issample":
                //    catalogo = catalogo.OrderBy(s => s.IsSample);
                //    break;
                //case "issample_desc":
                //    catalogo = catalogo.OrderByDescending(s => s.IsSample);
                //    break;
                default:
                    catalogo = catalogo.OrderBy(s => s.ID);
                    break;
            }

            //****
            //string NAText = Enum.GetName(typeof(BooleanTypeNA), 9);

            //foreach (var oObje in catalogo)
            //{
            //    string text = (oObje.IsSample == null) ? NAText : Enum.GetName(typeof(BooleanTypeNA), oObje.IsSample);
            //    oObje.IsSampleText = text;

            //    text = (oObje.Processed == null) ? NAText : Enum.GetName(typeof(BooleanTypeNA), oObje.Processed);
            //    oObje.ProcessedText = text;

            //    text = (oObje.LabEndClosing == null) ? NAText : Enum.GetName(typeof(BooleanTypeNA), oObje.LabEndClosing);
            //    oObje.LabEndClosingText = text;

            //    text = (oObje.HospExDate == null) ? NAText : Enum.GetName(typeof(BooleanTypeNA), oObje.HospExDate);
            //    oObje.HospExDateText = text;

            //    text = (oObje.DiagEg == null) ? NAText : Enum.GetName(typeof(BooleanTypeNA), oObje.DiagEg);
            //    oObje.DiagEgText = text;
            //}

            //**** Link Dashboard
            var user = UserManager.FindById(User.Identity.GetUserId());

            string dashbUrl = "", dashbTitle = "";
            List<Models.CatDashboardLink> lista = (from tg in db.CatDashboarLinks
                                                   where tg.id_country == user.Institution.CountryID
                                                   select tg).ToList();
            if (lista.Count > 0)
            {
                dashbUrl = lista[0].link;
                dashbTitle = lista[0].title;
            }

            ViewBag.DashbUrl = dashbUrl;
            ViewBag.DashbTitle = dashbTitle;

            //****
            int pageSize = _pageSize;
            int pageNumber = (page ?? 1);

            //****
            return View(catalogo.ToPagedList(pageNumber, pageSize));
        }

        // GET: CatVirusFlow/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CatVirusFlow/Create
        public ActionResult Create()
        {
            try
            {
                CatVirusFlow oCatVF = new CatVirusFlow();

                oCatVF.CatTestTypeCollection = db.CatTestType.ToList<CatTestType>();
                oCatVF.CatTestResultCollection = db.CatTestResult.ToList<CatTestResult>();
                oCatVF.CatVirusTypeCollection = db.CatVirusType.ToList<CatVirusType>();
                oCatVF.CatVirusSubTypeCollection = db.CatVirusSubType.ToList<CatVirusSubType>();
                oCatVF.CatVirusLinajeCollection = db.CatVirusLinaje.ToList<CatVirusLinaje>();

                return View(oCatVF);
            }
            catch (Exception err)
            {
                ViewBag.Message = "La lista de ... no se pudo generar, por favor intente de nuevo: " + err.Message;
                return View();
            }
        }

        // POST: CatVirusFlow/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id_Cat_TestType, value_Cat_TestResult, id_Cat_VirusType, id_Cat_Subtype, VirusLinaje_ID")] CatVirusFlow catalog)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.CatViruFlows.Add(catalog);
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
            }
            catch (RetryLimitExceededException /* dex */)
            {
                ModelState.AddModelError("", "No es posible guardar los datos. Intente de nuevo, si el problema persiste contacte al administrador.");
            }
            return View(catalog);
        }

        // GET: CatVirusFlow/Edit/5
        public ActionResult Edit(int? id)
        {
            //return View();
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            //****
            var catalogo = db.CatViruFlows.Find(id);
            if (catalogo == null)
            {
                return HttpNotFound();
            }

            catalogo.CatTestTypeCollection = db.CatTestType.ToList<CatTestType>();
            catalogo.CatTestResultCollection = db.CatTestResult.ToList<CatTestResult>();
            catalogo.CatVirusTypeCollection = db.CatVirusType.ToList<CatVirusType>();
            catalogo.CatVirusSubTypeCollection = db.CatVirusSubType.ToList<CatVirusSubType>();
            catalogo.CatVirusLinajeCollection = db.CatVirusLinaje.ToList<CatVirusLinaje>();

            return View(catalogo);
        }

        // POST: CatVirusFlow/Edit/5
        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public ActionResult EditPost(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var catalog = db.CatViruFlows.Find(id);
            //"id_Cat_TestType, value_Cat_TestResult, id_Cat_VirusType, id_Cat_Subtype, VirusLinaje_ID"
            if (TryUpdateModel(catalog, "", new string[] { "id_Cat_TestType", "value_Cat_TestResult", "id_Cat_VirusType", "id_Cat_Subtype", "VirusLinaje_ID" }))
            {
                try
                {
                    db.SaveChanges();

                    return RedirectToAction("Index");
                }
                catch (RetryLimitExceededException /* dex */)
                {
                    ModelState.AddModelError("", "No es posible guardar los datos. Intente de nuevo, si el problema persiste contacte al administrador.");
                }
            }

            return View(catalog);
        }

        // GET: CatVirusFlow/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CatVirusFlow/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
