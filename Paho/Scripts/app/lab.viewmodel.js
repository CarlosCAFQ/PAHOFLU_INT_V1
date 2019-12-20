﻿// Clase LabTest
function LabTest(SampleNumber, oCaseLab) {
    //console.log("function LabTest(SampleNumber, oCaseLab)->START");
    var self_LT = this;
    var date_receive = new Date();
    var date_format_ = app.dataModel.date_format_;
    var date_format_moment = app.dataModel.date_format_moment;
    var date_format_ISO = app.dataModel.date_format_ISO;

    console.log("========================");
    console.log(oCaseLab.FlucaseID);            // Atributo/Propiedad NO observable
    console.log(oCaseLab.Processed());          // Atributo/Propiedad observable
    console.log("========================");

    //date_receive = (SampleNumber == 1) ? jQuery.type(app.Views.Lab.CaseLabses.RecDate) === 'date' ? app.Views.Lab.CaseLabses.RecDate : parseDate($("#RecDate").val(), date_format_) :
    date_receive = (SampleNumber == 1) ? jQuery.type(oCaseLab.RecDate()) === 'date' ? self_LT.RecDate : parseDate($("#RecDate").val(), date_format_) :
                    (SampleNumber == 2) ? jQuery.type(app.Views.Lab.RecDate2()) === 'date' ? app.Views.Lab.RecDate2() : parseDate($("#RecDate2").val(), date_format_) :
                    (SampleNumber == 3) ? jQuery.type(app.Views.Lab.RecDate3()) === 'date' ? app.Views.Lab.RecDate3() : parseDate($("#RecDate3").val(), date_format_) : null;

    self_LT.OrderArray
    self_LT.Id = 0;                                                     // Id Test
    self_LT.UsrCountry = ko.observable(app.Views.Home.UsrCountry());    // Pais del usuario logueado
    self_LT.UsrInstID = ko.observable($('#IIDL').val());                // ID de la institucion del usuario
    self_LT.CaseLabID = "";                                             // ID Flucase
    self_LT.OrdenLabID = 99;
    self_LT.hasGet_Local = ko.observable(app.Views.Lab.hasGet());
    self_LT.LabDummy = ko.observable("");
    self_LT.LabID = ko.observable("");
    self_LT.ProcLab = ko.observable("");
    self_LT.ProcLabName = ko.observable("");
    self_LT.CanEdit = ko.observable(true);
    self_LT.CanModLab = ko.observable(true);                        // Ya no es utlizado????
    self_LT.CanDeleteProcess = ko.observable(true);
    self_LT.CanPCR = ko.observable(app.Views.Lab.CanPCRLab());
    self_LT.CanIFI = ko.observable(app.Views.Lab.CanIFILab());
    self_LT.EndFlow = ko.observable("");
    //////self_LT.ProcessLab = ko.observable("");                        // Radio button procesada en Test
    self_LT.ProcessLab = ko.observable(oCaseLab.Processed());                        // Radio button procesada en Test
    self_LT.SampleNumber = ko.observable(SampleNumber);
    self_LT.TestType = ko.observable("");
    self_LT.OrdenTestType = 99;
    self_LT.TestDate = ko.observable(null);
    self_LT.TestResultID = ko.observable("");
    self_LT.OrdenTestResultID = 99;
    self_LT.VirusTypeID = ko.observable("");
    self_LT.CTVirusType = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLVirusType = ko.observable("").extend({ numeric: 2 });
    self_LT.OrdenVirusTypeID = 99;
    self_LT.OtherVirusTypeID = ko.observable("");
    self_LT.CTOtherVirusType = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLOtherVirusType = ko.observable("").extend({ numeric: 2 });
    self_LT.OtherVirus = ko.observable("");
    self_LT.VirusSubTypeID = ko.observable("");
    self_LT.CTSubType = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLSubType = ko.observable("").extend({ numeric: 2 });
    self_LT.OrdenSubTypeID = 99;
    // Modificacion solicitada por Rodrigo - Chile
    self_LT.TestResultID_VirusSubType = ko.observable("");
    self_LT.OrdenTestResultID_VirusSubType = 99;
    self_LT.VirusSubTypeID_2 = ko.observable("");
    self_LT.CTSubType_2 = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLSubType_2 = ko.observable("").extend({ numeric: 2 });
    self_LT.OrdenSubTypeID_2 = 99;
    self_LT.TestResultID_VirusSubType_2 = ko.observable("");
    self_LT.OrdenTestResultID_VirusSubType_2 = 99;
    // Termina modificación
    self_LT.VirusLineageID = ko.observable("");
    self_LT.CTLineage = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLLineage = ko.observable("").extend({ numeric: 2 });
    self_LT.OrdenLineageID = 99;
    self_LT.RNP = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLRNP = ko.observable("").extend({ numeric: 2 });
    self_LT.CTRLNegative = ko.observable("").extend({ numeric: 2 });
    self_LT.TestEndDate = ko.observable(null);
    // Área de virus
    self_LT.InfA = ko.observable("");
    self_LT.InfB = ko.observable("");
    self_LT.ParaInfI = ko.observable("");
    self_LT.ParaInfII = ko.observable("");
    self_LT.ParaInfIII = ko.observable("");
    self_LT.RSV = ko.observable("");
    self_LT.Adenovirus = ko.observable("");
    self_LT.Metapneumovirus = ko.observable("");
    self_LT.hideLabOptions = false;

    self_LT.EnableCHI = ko.computed(function () {
        return (self_LT.UsrCountry() != 7) ? true : false;

    }, self_LT);

    self_LT.DisableCHI = ko.computed(function () {
        return (self_LT.UsrCountry() == 7) ? true : false;

    }, self_LT);

    self_LT.IFI_option = ko.computed(function () {
        return (self_LT.UsrCountry() == 7 && self_LT.TestType() == 1) ? true : false;

    }, self_LT);

    self_LT.TestDate.subscribe(function (newTestDate) {
        //console.log("self_LT.TestDate.subscribe->START");

        var current_value = jQuery.type(newTestDate) === 'date' ? newTestDate : parseDate(newTestDate, date_format_);
        //date_receive = (SampleNumber == 1) ? jQuery.type(app.Views.Lab.RecDate) === 'date' ? app.Views.Lab.RecDate : parseDate($("#RecDate").val(), date_format_) :
        date_receive = (SampleNumber == 1) ? jQuery.type(oCaseLab.RecDate()) === 'date' ? oCaseLab.RecDate() : parseDate($("#RecDate").val(), date_format_) :
                        (SampleNumber == 2) ? jQuery.type(app.Views.Lab.RecDate2()) === 'date' ? app.Views.Lab.RecDate2() : parseDate($("#RecDate2").val(), date_format_) :
                        (SampleNumber == 3) ? jQuery.type(app.Views.Lab.RecDate3()) === 'date' ? app.Views.Lab.RecDate3() : parseDate($("#RecDate3").val(), date_format_) : null;

        if (date_receive == null && (self_LT.UsrCountry() == 15 || (self_LT.UsrCountry() == 25))) {
            date_receive = (SampleNumber == 1) ? jQuery.type(app.Views.Lab.RecDate_National()) === 'date' ? app.Views.Lab.RecDate_National() : parseDate($("#RecDate_National").val(), date_format_) : null;
        }

        if (date_receive == null || date_receive == "") {
            alert(msgValidationTestDateInvalidDate);
            self_LT.TestDate(null);
        } else {
            if (moment(current_value).isBefore(moment(date_receive), "days")) {
                alert(msgValidationTestDateProcessAlert);
                self_LT.TestDate(null);
            }
        }
        //console.log("self_LT.TestDate.subscribe->END");
    });

    self_LT.TestEndDate.subscribe(function (newTestEndDate) {
        //console.log("self_LT.TestEndDate.subscribe->START");
        var current_value = jQuery.type(newTestEndDate) === 'date' ? newTestEndDate : parseDate(newTestEndDate, date_format_);
        var date_TestBeginDate = jQuery.type(self_LT.TestDate()) === 'date' ? self_LT.TestDate() : parseDate(self_LT.TestDate(), date_format_);

        if (date_TestBeginDate == null || date_TestBeginDate == "") {
            alert(msgValidationTestBeginDateInvalidDate);
            self_LT.TestEndDate("");
        } else {
            if (moment(current_value).isBefore(moment(date_TestBeginDate), "days")) {
                alert(msgValidationTestBeginDateProcessAlert);
                self_LT.TestEndDate("");
            }
        }
        //console.log("self_LT.TestEndDate.subscribe->END");
    });

    self_LT.EnableTestResult = ko.computed(function (option, item) {
        if (self_LT.TestType() != "") {
            return true;
        }
        else {
            self_LT.TestResultID("");
            self_LT.OrdenTestResultID = 99;
            return false;
        }
    }, self_LT);

    self_LT.EnableVirusTypes = ko.computed(function () {
        //if (((self_LT.TestResultID() != "U" && self_LT.TestResultID() != "N" && self_LT.EnableCHI()) || (self_LT.TestResultID() != "U" && self_LT.DisableCHI())) && self_LT.TestResultID() != "" && typeof self_LT.TestResultID() != "undefined") { // Desactivado por requerimiento de RRR y Suriname porque si les interesa ingresar cuando es negativo
        if (self_LT.TestResultID() != "NA" && self_LT.TestResultID() != "NB" && self_LT.TestResultID() != "MI" && self_LT.TestResultID() != "I" && self_LT.TestResultID() != "V" && self_LT.TestResultID() != "U" && self_LT.TestResultID() != "" && typeof self_LT.TestResultID() != "undefined") {
            if ((self_LT.TestType() == 1 && self_LT.TestResultID() == "N") || (self_LT.UsrCountry() == 3 && self_LT.TestResultID() == "N")) {

                return false;
            } else {

                return true;
            }
        }
        else {
            self_LT.VirusTypeID("");
            self_LT.OrdenVirusTypeID = 99;
            return false;
        }
    }, self_LT);

    self_LT.EnableCTVirusType = ko.computed(function () {
        if (self_LT.UsrCountry() == 7 && self_LT.TestType() == 2 && self_LT.VirusTypeID() != "") {

            return true;
        }
        else {
            self_LT.CTVirusType("");
            return false;
        }

    }, self_LT);

    self_LT.EnableOtherVirusTypes = ko.computed(function () {
        if (self_LT.VirusTypeID() == "9") {

            return true;
        }
        else {
            self_LT.OtherVirusTypeID("");
            return false;
        }
    }, self_LT);

    self_LT.EnableCTOtherVirusType = ko.computed(function () {
        if (self_LT.UsrCountry() == 7 && self_LT.VirusTypeID() == 9 && self_LT.TestType() == 2) {

            return true;
        }
        else {
            self_LT.CTOtherVirusType("");
            return false;
        }

    }, self_LT);

    self_LT.EnableVirusSubTypeID = ko.computed(function () {
        //var result = (self_LT.VirusTypeID() == "1" && self_LT.TestResultID() == "P"); // modificacion solicitada por Rodrigo
        //console.log("EnableVirusSubTypeID");
        var result = (self_LT.VirusTypeID() == "1" && self_LT.TestResultID() == "P");
        if (!result) {
            self_LT.VirusSubTypeID("");
            self_LT.OrdenSubTypeID = 99;
            self_LT.TestResultID_VirusSubType("");
            self_LT.CTSubType("");
            self_LT.CTRLSubType("")
        };
        if (self_LT.TestType() == "1") {
            self_LT.VirusSubTypeID("");
            self_LT.OrdenSubTypeID = 99; self_LT.TestResultID_VirusSubType("");
            self_LT.CTSubType("");
            self_LT.CTRLSubType("")
            return false;
        }

        return result;
    }, self_LT);

    self_LT.EnableTestResultID_VirusSubTypeID = ko.computed(function () {
        //var result = (self_LT.VirusTypeID() == "1" && self_LT.TestResultID() == "P"); // modificacion solicitada por Rodrigo
        //console.log("EnableVirusSubTypeID");
        var result = (self_LT.VirusTypeID() == "1" && self_LT.TestResultID() == "P" && self_LT.UsrCountry() == 7);
        if (!result) {
            self_LT.TestResultID_VirusSubType("");
        };
        if (self_LT.TestType() == "1") {
            self_LT.TestResultID_VirusSubType("");
            return false;
        }

        return result;
    }, self_LT);

    // Aqui agregar la funcion para esconder el resultado del subtipo

    self_LT.EnableVirusSubTypeID_2 = ko.computed(function () {
        //var result = (self_LT.VirusTypeID() == "1" && self_LT.TestResultID() == "P"); // modificacion solicitada por Rodrigo
        //console.log("EnableVirusSubTypeID_2");
        var result = (self_LT.VirusTypeID() == "1" && self_LT.UsrCountry() == 7 && self_LT.TestResultID() == "P");
        if (!result) {
            self_LT.VirusSubTypeID_2("");
            self_LT.OrdenSubTypeID_2 = 99;
            self_LT.TestResultID_VirusSubType_2("");
            self_LT.CTSubType_2("");
            self_LT.CTRLSubType_2("")
        };
        if (self_LT.TestType() == "1") {
            self_LT.VirusSubTypeID_2("");
            self_LT.OrdenSubTypeID_2 = 99;
            self_LT.TestResultID_VirusSubType_2("");
            self_LT.CTSubType_2("");
            self_LT.CTRLSubType_2("")
            return false;
        }

        return result;
    }, self_LT);

    //CT Subtype 
    self_LT.EnableCTSubType = ko.computed(function () {
        if ((self_LT.VirusSubTypeID() == 3 || self_LT.VirusSubTypeID() == 4 || self_LT.VirusSubTypeID() == 5 || self_LT.VirusSubTypeID() == 10) && self_LT.TestType() == 2 && self_LT.UsrCountry() == 7) {

            return true;
        }
        else {
            self_LT.CTSubType("");
            return false;
        }

    }, self_LT);

    self_LT.EnableCTSubType_2 = ko.computed(function () {
        if ((self_LT.VirusSubTypeID_2() == 3 || self_LT.VirusSubTypeID_2() == 4 || self_LT.VirusSubTypeID_2() == 5 || self_LT.VirusSubTypeID_2() == 10) && self_LT.TestType() == 2 && self_LT.UsrCountry() == 7) {

            return true;
        }
        else {
            self_LT.CTSubType_2("");
            return false;
        }

    }, self_LT);

    self_LT.EnableCTLineage = ko.computed(function () {
        if ((self_LT.VirusLineageID() != 1) && self_LT.TestType() == 2 && self_LT.UsrCountry() == 7) {

            return true;
        }
        else {
            self_LT.CTLineage("");
            return false;
        }

    }, self_LT);

    self_LT.EnableRNP = ko.computed(function () {
        // Desactivado porque solicitaron que fuera para todos los virus
        //(self_LT.VirusSubTypeID() == 3 || self_LT.VirusSubTypeID() == 10 || self_LT.VirusTypeID() == 1 || self_LT.VirusTypeID() == 2)
        if (self_LT.TestType() == 2 && self_LT.UsrCountry() == 7) {

            return true;
        }
        else {
            self_LT.RNP("");
            return false;
        }

    }, self_LT);

    self_LT.EnableCTRLNegative = ko.computed(function () {
        // Desactivado porque solicitaron que fuera para todos los virus
        //(self_LT.VirusSubTypeID() == 3 || self_LT.VirusSubTypeID() == 10 || self_LT.VirusTypeID() == 1 || self_LT.VirusTypeID() == 2)
        //if (self_LT.TestType() == 2 && self_LT.UsrCountry() == 7 && self_LT.TestResultID() == "N") { // Modificado a solicitur de Rodrigo que siempre aparezca aunque el resultado sea positivo
        if (self_LT.TestType() == 2 && self_LT.UsrCountry() == 7) {

            return true;
        }
        else {
            self_LT.CTRLNegative("");
            return false;
        }

    }, self_LT);

    self_LT.EnableVirusLineageID = ko.computed(function () {
        var result = (self_LT.VirusTypeID() == "2" && self_LT.TestResultID() == "P"); if (!result) self_LT.VirusLineageID("");
        if (self_LT.TestType() == "1") {
            self_LT.VirusLineageID("");
            self_LT.OrdenLineageID = 99;
            return false;
        }
        return result;
    }, self_LT);

    self_LT.ProcessLab.subscribe(function (process) {
        self_LT.TestType(null);
        self_LT.TestEndDate(null);
        self_LT.TestDate(null);
        self_LT.TestResultID(null);
        self_LT.VirusTypeID(null);
        self_LT.CTVirusType("");
        self_LT.CTRLVirusType("");
        self_LT.VirusSubTypeID("");
        self_LT.CTSubType("");
        self_LT.CTRLSubType("");
        self_LT.TestResultID_VirusSubType("");
        self_LT.VirusSubTypeID_2("");
        self_LT.CTSubType_2("");
        self_LT.CTRLSubType_2("");
        self_LT.TestResultID_VirusSubType_2("");
        self_LT.VirusLineageID("");
        self_LT.CTLineage("");
        self_LT.CTRLLineage("");
        self_LT.RNP("");
        self_LT.CTRLNegative("");
        self_LT.InfA("");
        self_LT.InfB("");
        self_LT.ParaInfI("");
        self_LT.ParaInfII("");
        self_LT.ParaInfIII("");
        self_LT.RSV("");
        self_LT.Adenovirus("");
        self_LT.Metapneumovirus("");
    });

    self_LT.ShowProcessedLab = ko.computed(function () {
        //console.log(self_LT.CanEdit());
        return (self_LT.ProcessLab() === "true")
    }, self_LT);

    self_LT.NotShowProcessedLab = ko.computed(function () {
        return (self_LT.ProcessLab() === "false")
    }, self_LT);

    // Asignacion de resultado automaticamente
    self_LT.VirusTypeID.subscribe(function (new_virus) {
        //console.log("VirusTypeID");
        if (new_virus != "" && new_virus != null) {
            var category = ko.utils.arrayFirst(app.Views.Home.CVT(), function (category) {
                return category.Id === new_virus;
            });
            if (category != null && category != "undefined") {
                self_LT.OrdenVirusTypeID = category.orden;
                //console.log("OrdenVirusTypeID --" + self_LT.OrdenVirusTypeID);
            }

            app.Views.Lab.OrdenFinalResult();
        }
        if (!app.Views.Lab.hasGet()) {
            // subtipo1
            self_LT.VirusSubTypeID("");
            self_LT.TestResultID_VirusSubType("");
            self_LT.CTSubType("");
            self_LT.CTRLSubType("");
            self_LT.OrdenTestResultID_VirusSubType = 99;
            self_LT.OrdenSubTypeID = 99;
            // subtipo 2
            self_LT.VirusSubTypeID_2("");
            self_LT.TestResultID_VirusSubType_2("");
            self_LT.CTSubType_2("");
            self_LT.CTRLSubType_2("");
            self_LT.OrdenTestResultID_VirusSubType_2 = 99;
            self_LT.OrdenSubTypeID_2 = 99;
            // Lineage
            self_LT.VirusLineageID("");
            self_LT.CTLineage("");
            self_LT.CTRLLineage("");
            self_LT.OrdenLineageID = 99;
        }

    });

    self_LT.LabID.subscribe(function (new_Lab_Select) {
        //console.log("Lab_assign -- " + new_Lab_Select);
        if (new_Lab_Select != "" && new_Lab_Select != null) {
            //console.log(app.Views.Contact.IntsFlow());
            var category = ko.utils.arrayFirst(app.Views.Contact.IntsFlow(), function (category) {
                //console.log(" LabId ++ " + self_LT.LabID());
                return category.LabID === new_Lab_Select;
            });
            if (category != null && category != "undefined") {
                self_LT.OrdenLabID = category.OPbyL;
            }
            app.Views.Lab.OrdenFinalResult();
        }

    });

    self_LT.VirusSubTypeID.subscribe(function (new_subtype) {
        //console.log("VirusSubTypeID");
        if (new_subtype != "" && new_subtype != null) {

            var category = ko.utils.arrayFirst(app.Views.Home.CVST(), function (category) {
                return category.Id === new_subtype;
            });
            if (category != null && category != "undefined")
                self_LT.OrdenSubTypeID = category.orden;
            app.Views.Lab.OrdenFinalResult();
        }

    });

    self_LT.VirusLineageID.subscribe(function (new_lineage) {
        //console.log("VirusLineageID");
        if (new_lineage != "" && new_lineage != null) {
            var category = ko.utils.arrayFirst(app.Views.Home.CVL(), function (category) {
                return category.Id === new_lineage;
            });

            if (category != null && category != "undefined")
                self_LT.OrdenLineageID = category.orden;
            app.Views.Lab.OrdenFinalResult();
        }

    });

    self_LT.TestType.subscribe(function (new_test_type) {
        //console.log("self_LT.TestType.subscribe->START");
        //console.log(self_LT.LabID);
        //console.log(self_LT.LabID());
        //**********
        if (self_LT.ProcLab === "" || self_LT.ProcLab == "undefined" || self_LT.ProcLab == undefined || self_LT.ProcLab == null) {
            //console.log("TTx1");
            self_LT.ProcLab = self_LT.LabID;
            //console.log("TTx2");
            //self_LT.ProcLab(self_LT.LabID);
        }

        if (new_test_type != "" && new_test_type != null) {
            //console.log("TTx3");
            //self_LT.ProcLab = self_LT.LabID.toString();
            //console.log("TTx4");
            ////**********
            //console.log(self_LT.ProcLab);

            var category = ko.utils.arrayFirst(app.Views.Home.CTT(), function (category) {
                return category.Id === new_test_type;
            });
            if (category != null && category != "undefined")
                self_LT.OrdenTestType = category.orden;

            //console.log("TT1");
            //console.log(self_LT.LabID);
            ////console.log(self_LT.LabID());            
            //console.log(self_LT.ProcLab);
            ////console.log(self_LT.ProcLab());
            //console.log(self_LT.ProcLabName);            
            //console.log("TT1a");
            if (self_LT.LabID === "")
                self_LT.LabID(self_LT.ProcLab());
            //console.log("TT1b");
            app.Views.Lab.OrdenFinalResult();
        }
    });

    self_LT.TestResultID.subscribe(function (new_test_result) {
        //console.log("TestResultID");
        if (new_test_result != "" && new_test_result != null) {
            //alert(new_test_result);
            var category = ko.utils.arrayFirst(app.Views.Home.CTR(), function (category) {
                return category.Id === new_test_result;
            });
            //alert(category.orden);
            if (category != null && category != "undefined")
                self_LT.OrdenTestResultID = category.orden;

            app.Views.Lab.OrdenFinalResult();
        }

        if (!app.Views.Lab.hasGet()) {
            //console.log("aquí si");
            self_LT.VirusTypeID("");
            self_LT.CTVirusType("");
            self_LT.CTRLVirusType("");
            self_LT.OrdenVirusTypeID = 99;
        }


    });

    self_LT.TestResultID_VirusSubType.subscribe(function (new_test_result_virussubtype) {
        //console.log("TestResultID_VirusSubType");
        //console.log(new_test_result_virussubtype);
        if (new_test_result_virussubtype != "" && new_test_result_virussubtype != null) {
            //alert(new_test_result);
            var category = ko.utils.arrayFirst(app.Views.Home.CTR(), function (category) {
                return category.Id === new_test_result_virussubtype;
            });
            //console.log(category.orden);
            if (category != null && category != "undefined")
                self_LT.OrdenTestResultID_VirusSubType = category.orden;

            app.Views.Lab.OrdenFinalResult();
        }

    });

    self_LT.TestResultID_VirusSubType_2.subscribe(function (new_test_result_virussubtype) {
        //console.log("TestResultID_VirusSubType_2");
        if (new_test_result_virussubtype != "" && new_test_result_virussubtype != null) {
            //alert(new_test_result);
            var category = ko.utils.arrayFirst(app.Views.Home.CTR(), function (category) {
                return category.Id === new_test_result_virussubtype;
            });
            //alert(category.orden);
            if (category != null && category != "undefined")
                self_LT.OrdenTestResultID_VirusSubType_2 = category.orden;

            app.Views.Lab.OrdenFinalResult();
        }

    });

    self_LT.VisibleFalseIFIVirus = function (option, item) {
        //console.log('item id = ' + item.id);
        if (!(app.Views.Lab.CanPCRLab() == true) && typeof (item) != 'undefined') {
            //console.log('RemoveIFIVirus');
            //console.log(item);
            if (item.Id == 12 || item.Id == 11 || item.Id == 10) {
                ko.applyBindingsToNode(option, {
                    attr: {
                        'style': 'display:none'
                    }
                }, item);
            }

        }

    };

    self_LT.VisibleTestResultIFI = function (option, item) {
        //console.log('item id = ');
        //console.log(app.Views.Lab.CanIFILab());
        //console.log(typeof (item));
        //console.log(app.Views.Lab.LabTests().length);
        if (typeof (item) != 'undefined' && app.Views.Home.UsrCountry() != 7) {
            if (item.Id == 'NA' || item.Id == 'NB' || (item.Id == 'MI')) {
                ko.applyBindingsToNode(option, {
                    attr: {
                        'style': 'display:none'
                    }
                }, item);
            }

        } else if (typeof (item) != 'undefined' && app.Views.Home.UsrCountry() == 7) {
            if (app.Views.Lab.CanPCRLab() == true && app.Views.Lab.CanIFILab() == false) {
                if (item.Id == 'NA' || item.Id == 'NB') {
                    ko.applyBindingsToNode(option, {
                        attr: {
                            'style': 'display:none'
                        }
                    }, item);
                }
            }
        }


    };

    //console.log("function LabTest(SampleNumber, oCaseLab)->END");
};

// Clase CaseLabses
function CaseLab(SampleNumber) {
    //console.log("function CaseLabses(SampleNumber)->START->" + SampleNumber.toString()); 

    var self_CL = this;
    var date_receive = new Date();
    var date_format_ = app.dataModel.date_format_;
    var date_format_moment = app.dataModel.date_format_moment;
    var date_format_ISO = app.dataModel.date_format_ISO;

    self_CL.UsrCountry = ko.observable(app.Views.Home.UsrCountry());   // Pais del usuario logueado
    self_CL.UsrInstID = ko.observable($('#IIDL').val());               // ID de la institucion del usuario
    self_CL.Id = "";
    self_CL.FlucaseID = "";
    //self_CL.CanModLab = ko.observable(true);
    self_CL.CanEdit = ko.observable(true);

    self_CL.LabID = ko.observable();
    self_CL.ProcLab = ko.observable();
    self_CL.ProcLabName = ko.observable();
    self_CL.ISPID = ko.observable(97);                                     //Es 97 porque es el ID de la tabla institución

    self_CL.RecDate = ko.observable(null);
    self_CL.Identification_Test = ko.observable("");
    self_CL.TempSample = ko.observable("").extend({ numeric: 2 });
    self_CL.Processed = ko.observable("");
    self_CL.NoProRen = ko.observable("");
    self_CL.NoProRenId = ko.observable("");

    self_CL.LabTests = ko.observableArray([]);
    self_CL.LabTests_Sample2 = ko.observableArray([]);
    self_CL.LabTests_Sample3 = ko.observableArray([]);

    ///
    //self.LabTests_Sample2 = ko.observableArray([]);
    //self.LabTests_Sample3 = ko.observableArray([]);
    //self.LabTestsExternal = ko.observableArray([]);
    //self.LabsResult = ko.observableArray([]);
    //self.LabsResultExternal = ko.observableArray(app.Views.Home.labsExternal());
    //self.SubTypeByLabRes = ko.observableArray([]);
    self_CL.ArrayValidate = ko.observableArray([]);
    self_CL.msgError = "";
    ///

    // date_receive = (SampleNumber == 1) ? (jQuery.type(app.Views.Lab.RecDate12()) === 'date' ? app.Views.Lab.RecDate12() : parseDate($("#RecDate12").val(), date_format_)) :
    //date_receive = (SampleNumber == 1) ? (jQuery.type(self_CL.RecDate12()) === 'date' ? self_CL.RecDate12() : parseDate($("#RecDate12").val(), date_format_)) :
    //               (SampleNumber == 2) ? (jQuery.type(app.Views.Lab.RecDate2()) === 'date' ? app.Views.Lab.RecDate2() : parseDate($("#RecDate2").val(), date_format_)) :
    //               (SampleNumber == 3) ? (jQuery.type(app.Views.Lab.RecDate3()) === 'date' ? app.Views.Lab.RecDate3() : parseDate($("#RecDate3").val(), date_format_)) : null;

    //date_receive = (SampleNumber == 1) ? jQuery.type(self_CL.RecDate()) === 'date' ? self_CL.RecDate() : parseDate($("#RecDate").val(), date_format_) :
    //            (SampleNumber == 2) ? jQuery.type(app.Views.Lab.RecDate2()) === 'date' ? app.Views.Lab.RecDate2() : parseDate($("#RecDate2").val(), date_format_) : 
    //            (SampleNumber == 3) ? jQuery.type(app.Views.Lab.RecDate3()) === 'date' ? app.Views.Lab.RecDate3() : parseDate($("#RecDate3").val(), date_format_) : null;
    

    self_CL.ShowProcessed = ko.computed(function () {
        self_CL.NoProRen("");
        self_CL.NoProRenId("");
        //if (self_CL.Processed == "true" && self_CL.Processed_National == "false")
        if (self_CL.Processed == "true"){
            //////###self_CL.resetFinalResult();
        }

        return (self_CL.Processed() === "true");
    }, self_CL);

    self_CL.RecDate.subscribe(function (newRecDate) {
        //console.log("self_CL.RecDate.subscribe->START");

        //if (self_CL.hasReset() != true && newRecDate != "" && newRecDate != null) {
        if (app.Views.Lab.hasReset() != true && newRecDate != "" && newRecDate != null) {
            var current_value = jQuery.type(newRecDate) === 'date' ? newRecDate : parseDate(newRecDate, date_format_);
            var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate()) === 'date' ? app.Views.Hospital.SampleDate() : parseDate(app.Views.Hospital.SampleDate(), date_format_);
            var date_shipping_date = $("#ShipDate").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate()) === 'date' ? app.Views.Hospital.ShipDate() : parseDate(app.Views.Hospital.ShipDate(), date_format_);


            if ($("#Rec_Date_NPHL").length > 0 && self_CL.NPHL_FlowExist() == true) {

                var date_Ship_Date_NPHL = jQuery.type(self_CL.Ship_Date_NPHL()) === 'date' ? self_CL.Ship_Date_NPHL() : parseDate(self_CL.Ship_Date_NPHL(), date_format_);

                //if ((date_Ship_Date_NPHL == null || date_Ship_Date_NPHL == "") && self_CL.hasReset() != true) {
                if ((date_Ship_Date_NPHL == null || date_Ship_Date_NPHL == "") && app.Views.Lab.hasReset() != true) {
                    //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                    alert(msgValidationRecSampleNPHL);
                    //self_CL.RecDate(null);
                } else {
                    if (moment(current_value).isBefore(moment(date_Ship_Date_NPHL), "days")) {
                        //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                        alert(msgValidationSampleDateNPHLValidateS1);
                        //self_CL.RecDate(null);
                    }
                }
            //} else if ((date_shipping_date != null) && self_CL.hasReset() != true) {
            } else if ((date_shipping_date != null) && app.Views.Lab.hasReset() != true) {
                if (self_CL.UsrCountry() == 11 || self_CL.UsrCountry() == 119) {
                    if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                        //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                        alert(msgValidationShippingDateValidateICS1);
                        //msgValidationShippingDateValidateICS1
                        self_CL.RecDate(null);
                    }
                } else {
                    if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                        //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                        alert(msgValidationShippingDateValidateS1);
                        self_CL.RecDate(null);
                    }
                }
                /*if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                    alert(msgValidationShippingDateValidateS1);
                    self_CL.RecDate(null);
                }*/
            //} else if ((date_sample_date_ == null || date_sample_date_ == "") && self_CL.hasReset() != true) {
            } else if ((date_sample_date_ == null || date_sample_date_ == "") && app.Views.Lab.hasReset() != true) {
                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                alert(msgValidationSampleDateS1);
                self_CL.RecDate(null);
            } else {
                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de toma muestra de la Muestra 1");
                    alert(msgValidationSampleDateValidateS1);
                    self_CL.RecDate(null);
                }
            }
        }
        //console.log(self_CL.RecDate());
    });

    self_CL.Processed.subscribe(function (NewIsProcessed) {
        //console.log("aqui Processed.subscribe" + NewIsProcessed);
        if (NewIsProcessed == "false") {
            //////###self_CL.removeTestbyLab(self_CL.UsrInstID(), 1);
            $("#addLabTest_1").hide();
        } else if (NewIsProcessed == "true") {
            $("#addLabTest_1").show();
        }
    });

    self_CL.NotShowProcessedOther = ko.computed(function () {
        return (self_CL.NoProRenId() === "5")
    }, self_CL);


    self_CL.NotShowProcessed = ko.computed(function () {
        //self_CL.resetFinalResult();
        //self_CL.OrdenFinalResult();
        return (self_CL.Processed() === "false")
    }, self_CL);

    self_CL.addLabTest = function (sample_number, data) {
        console.log("addLabTest->START");
        ////console.log(data);
        //console.log(data.LabTests());
        ////console.log(data.LabTests().length);
        ////console.log(self_CL.FlucaseID);
        //console.log("---");
        var erroMsg = self_CL.validatebeforeadd(1, 2);
        if (erroMsg) {
            alert(erroMsg);
            return;
        }

        var labtest = new LabTest(sample_number, self_CL);
        labtest.hideLabOptions = true;
        //console.log(labtest.displayLabOptions + " **** ");
        labtest.CaseLabID = self_CL.FlucaseID.toString();
        //labtest.LabID = app.Views.Lab.UsrInstID();
        labtest.LabID(app.Views.Lab.UsrInstID());
        labtest.ProcLab(app.Views.Lab.UsrInstID().toString());
        labtest.ProcLabName(app.Views.Lab.UsrInstName());

        labtest.CanEdit(true);
        labtest.CanModLab(false);
        labtest.SampleNumber(sample_number);

        if (sample_number == 1) {
            self_CL.LabTests.push(labtest);
        } else if (sample_number == 2) {
            self.LabTests_Sample2.push(labtest);
        } else if (sample_number == 3) {
            self.LabTests_Sample3.push(labtest);
        } else if (sample_number == 999) {
            self.LabTestsExternal.push(labtest);
        }
        console.log("addLabTest->END");
    };

    self_CL.validatebeforeadd = function (nextStep, SaveVerif) {
        console.log("validatebeforeadd->START");
        var msg = "";

        console.log("-----------");
        console.log(self_CL.LabTests());
        //console.log(self_CL.LabTests().length);
        console.log("-----------");

        self_CL.ArrayValidate((nextStep == 1) ? self_CL.LabTests() : (nextStep == 2) ? self_CL.LabTests_Sample2() : self_CL.LabTests_Sample3());

        for (index = 0; index < self_CL.ArrayValidate().length; ++index) {
            date_1 = self_CL.ArrayValidate()[index].TestDate();
            date_2 = self_CL.ArrayValidate()[index].TestEndDate();
            date_Received = self_CL.RecDate();

            //console.log("x1a");
            //console.log(self_CL.ArrayValidate()[index].ProcLabName());
            //console.log(self_CL.ArrayValidate()[index].LabID());
            //console.log(self_CL.ArrayValidate()[index].ProcLab());
            //console.log("x1b");

            var date_test_start = new Date();
            var date_test_final = new Date();
            var date_RecDate = new Date();
            date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
            date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);
            date_RecDate = jQuery.type(date_Received) === 'date' ? date_Received : parseDate($("#RecDate").val(), date_format_);

            //date_1 = self_CL.ArrayValidate()[index].TestDate();
            //if (self_CL.ArrayValidate()[index].ProcLab() === "" || typeof self_CL.ArrayValidate()[index].ProcLab() === "undefined")
            if (self_CL.ArrayValidate()[index].LabID() === "" || typeof self_CL.ArrayValidate()[index].LabID() === "undefined")
                msg += "\n" + msgValidateProcessSelectLab;
            //"'Laboratorio': Seleccione el laboratorio que procesa la prueba";

            if (self_CL.ArrayValidate()[index].ProcessLab() === "")
                msg += "\n" + msgValidateProcessProcessLab;
            //"'Procesada': Indique si la prueba fue procesada";

            if (self_CL.ArrayValidate()[index].ProcessLab() === "true") {

                if (date_RecDate != null && date_test_start != null && moment(date_test_start).isBefore(moment(date_RecDate), 'days'))
                    msg += "\n" + msgValidateProcessStartReceiptDate;
                //'Process start date' can not be less than the 'Date of receipt of the sample'
                //"'Fecha de inicio del proceso' no puede ser menor a la 'Fecha de recepcion de la muestra'";
                //return false;

                if (date_test_start === null)
                    msg += "\n" + msgValidateProcessStartRequired;
                //Process start date is required
                //    "Fecha de inicio de proceso es requerida";
                if (date_test_start != null && !moment(moment(date_test_start).format(date_format_moment), [date_format_moment], true).isValid())
                    msg += "\n" + msgValidateProcessStartInvalid;
                //"Fecha de inicio de proceso es inválida";
                //if (date_RecDate != null && date_test_start != null && moment(date_test_start).isBefore(moment(date_RecDate), 'days'))
                //    msg += "\n" + "'Start date' cannot be less than the 'Received date'";

                if (date_test_final === null)
                    msg += "\n" + msgValidateProcessEndDateRequired;
                //"Fecha final del proceso es requerida";
                if (date_test_final != null && !moment(moment(date_test_final).format(date_format_moment), [date_format_moment], true).isValid())
                    msg += "\n" + msgValidateProcessEndDateInvalid;
                //"Fecha final del proceso es inválida";
                if (date_test_start != null && date_test_final != null
                    && moment(date_test_start).isAfter(moment(date_test_final), 'days'))
                    msg += "\n" + msgValidateProcessEndDateStartDate;
                //'Process end date' can not be less than 'Process start date'
                //"'Fecha final del proceso' no puede ser menor a la 'Fecha de inicio del proceso'";

                if (self_CL.ArrayValidate()[index].TestType() === "")
                    msg += "\n" + msgValidateProcessType;
                //Insert the type of completed process
                //"Indique el tipo de proceso realizado";

                if (self_CL.ArrayValidate()[index].TestResultID() === "")
                    msg += "\n" + msgValidateProcessResult;
                //Insert the result of the process
                //"Indique el resultado del proceso";

                // revision para agregar los subtipos de Chile
                if (self_CL.ArrayValidate()[index].TestResultID() === "P"
                    && self_CL.ArrayValidate()[index].VirusTypeID() === "1"
                    && self_CL.ArrayValidate()[index].TestType() === "2"
                    && self_CL.ArrayValidate()[index].TestResultID_VirusSubType() != "P"
                    && self_CL.ArrayValidate()[index].TestResultID_VirusSubType_2() != "P"
                    && self_CL.ArrayValidate()[index].UsrCountry() == 7) // Esta línea es porque esta validación es solo para Chile
                    msg += "\n" + msgValidateProcessResult_Subtype;


                if ((self_CL.ArrayValidate()[index].TestResultID() === "P") &&
                    (self_CL.ArrayValidate()[index].VirusTypeID() === "" || self_CL.ArrayValidate()[index].VirusTypeID() == undefined)) {
                    msg += "\n" + msgValidateProcessVirus;
                    //Insert the detected virus
                    //"Ingrese el virus detectado";
                    //|| self_CL.ArrayValidate()[index].TestResultID() === "I"
                }
                else {
                    if (self_CL.ArrayValidate()[index].UsrCountry() == 7 && self_CL.ArrayValidate()[index].CTVirusType() === "" &&
                        self_CL.ArrayValidate()[index].VirusTypeID() != "" && self_CL.ArrayValidate()[index].TestType() === "2")
                    { msg += "\n" + "Ingreso el CT de Virus"; }
                }

                if ((self_CL.ArrayValidate()[index].TestResultID() === "P") && self_CL.ArrayValidate()[index].VirusTypeID() === "9" &&
                    (self_CL.ArrayValidate()[index].OtherVirusTypeID() === "" || self_CL.ArrayValidate()[index].OtherVirusTypeID() == undefined) && 
                    self_CL.ArrayValidate()[index].OtherVirus() === "") {
                    msg += "\n" + msgValidateProcessOtherVirus;
                    //  Insert the other detected virus
                    //"Indique el otro virus detectado";
                    //|| self_CL.ArrayValidate()[index].TestResultID() === "I"
                }
                else {
                    if (self_CL.ArrayValidate()[index].UsrCountry() == 7 && self_CL.ArrayValidate()[index].CTOtherVirusType() === "" &&
                        self_CL.ArrayValidate()[index].VirusTypeID() === "9" && self_CL.ArrayValidate()[index].TestType() === "2" &&
                        self_CL.ArrayValidate()[index].OtherVirusTypeID() != "")
                    { msg += "\n" + "Ingreso el CT de Otro Virus"; }
                }

                if (self_CL.ArrayValidate()[index].TestResultID() === "P"
                    && self_CL.ArrayValidate()[index].VirusTypeID() === "1"
                    && (self_CL.ArrayValidate()[index].VirusSubTypeID() === "" || self_CL.ArrayValidate()[index].VirusSubTypeID() == undefined)
                    && self_CL.ArrayValidate()[index].TestType() === "2") {
                    //console.log("Aqui virusSubtiypeID");

                    if (self_CL.ArrayValidate()[index].UsrCountry() == 7) {

                        if ((self_CL.ArrayValidate()[index].VirusSubTypeID() === "" || self_CL.ArrayValidate()[index].VirusSubTypeID() == undefined) &&
                            (self_CL.ArrayValidate()[index].VirusSubTypeID_2() === "" || self_CL.ArrayValidate()[index].VirusSubTypeID_2() == undefined))
                            msg += "\n" + msgValidateProcessSubtype;

                    } else {
                        msg += "\n" + msgValidateProcessSubtype;
                    }


                    //  Insert the detected Subtype
                    //"Ingrese el Subtipo detectado";
                }
                else {
                    if ((self_CL.ArrayValidate()[index].VirusSubTypeID() == 3 || self_CL.ArrayValidate()[index].VirusSubTypeID() == 10) &&
                        self_CL.ArrayValidate()[index].UsrCountry() == 7 && self_CL.ArrayValidate()[index].CTSubType() === "" &&                        
                        self_CL.ArrayValidate()[index].VirusSubTypeID() != "1" && self_CL.ArrayValidate()[index].VirusTypeID() === "1" &&
                        self_CL.ArrayValidate()[index].TestType() === "2")
                    { msg += "\n" + "Ingreso el CT de Subtipo"; }
                }

                if (self_CL.ArrayValidate()[index].LabID() == self_CL.ISPID() || self_CL.UsrCountry() != 7) {
                    if (self_CL.ArrayValidate()[index].TestResultID() === "P" && self_CL.ArrayValidate()[index].VirusTypeID() === "2" &&
                        self_CL.ArrayValidate()[index].VirusLineageID() === "" && self_CL.ArrayValidate()[index].TestType() === "2") {
                        msg += "\n" + msgValidateProcessLinage;
                        //Insert the detected Linage
                        //"Ingrese el Linaje detectado";
                    }
                    else {
                        if ((self_CL.ArrayValidate()[index].VirusLineageID() == 2 || self_CL.ArrayValidate()[index].VirusLineageID() == 3) &&
                            self_CL.ArrayValidate()[index].UsrCountry() == 7 && self_CL.ArrayValidate()[index].CTLineage() === "" && 
                            self_CL.ArrayValidate()[index].VirusTypeID() === "2" && self_CL.ArrayValidate()[index].TestType() === "2")
                        { msg += "\n" + "Ingreso el CT de Linaje"; }
                    }
                }


                if (self_CL.ArrayValidate()[index].RNP() === "" && self_CL.ArrayValidate()[index].TestType() === "2" && self_CL.ArrayValidate()[index].UsrCountry() == 7)
                    { msg += "\n" + "Ingrese el RNP"; }

            }
        };

        var ArrayValidate = $.grep(self_CL.ArrayValidate(), function (v) {
            //console.log("m1");
            //var aaa = v.TestType() === "2" && v.ProcLab() == self_CL.UsrInstID() && (v.LabID() == "" || v.LabID() == self_CL.UsrInstID());
            //console.log(aaa);
            //console.log("m1a");

            return (v.TestType() === "2" && v.ProcLab() == self_CL.UsrInstID() && (v.LabID() == "" || v.LabID() == self_CL.UsrInstID()));
        });

        if (SaveVerif == 1 && ArrayValidate.length > 1)
            ArrayValidate.length = ArrayValidate.length - 1;

        if (ArrayValidate.length >= 4)
            msg += "\n" + msgValidateProcessPCR3times;
        //For PCR can not be more than 3 processes for the same laboratory
        //"Para PCR no puede ser mayor a 3 procesos para el mismo laboratorio";

        ArrayValidate = $.grep(self_CL.ArrayValidate(), function (v) {
            //console.log("d1");
            //var bbb = v.TestType() === "1" && v.ProcLab() == self_CL.UsrInstID();
            //console.log(bbb);
            //console.log("d1a");

            return (v.TestType() === "1" && v.ProcLab() == self_CL.UsrInstID());
        });

        if (ArrayValidate.length >= 4)
            msg += "\n" + msgValidateProcessIFI3times;
        //For IF it can not be more than 3 processes for the same laboratory
        //"Para IF no puede ser mayor a 3 procesos para el mismo laboratorio";

        console.log("validatebeforeadd->END->" + msg);
        return msg;
    };
    
    self_CL.validate = function (nextStep, oLabView) {
        console.log("l.vm.js-CaseLab->self_CL.validate->START");
        //console.log("----1b1");
        //console.log(nextStep);
        //console.log("----1b2");
        //console.log(nextStep());
        //console.log("----1b3");
        //console.log(oLabView);
        //console.log("----1b4");
        //console.log(oLabView.EndLabDate());
        //console.log(oLabView.FinalResult());
        //console.log("----1b5");

        var msg = "";
        rec_date = jQuery.type(self_CL.RecDate()) === 'date' ? self_CL.RecDate() : parseDate($("#RecDate").val(), date_format_);
        //rec_date_national = jQuery.type(self_CL.RecDate_National()) === 'date' ? self_CL.RecDate_National() : parseDate($("#RecDate_National").val(), date_format_);
        ///////date_close_date_lab = jQuery.type(self_CL.EndLabDate()) === 'date' ? self_CL.EndLabDate() : parseDate($("#EndLabDate").val(), date_format_);
        date_close_date_lab = jQuery.type(oLabView.EndLabDate()) === 'date' ? oLabView.EndLabDate() : parseDate($("#EndLabDate").val(), date_format_);
        //var date_ShipDate = new Date();
        date_ShipDate = jQuery.type(app.Views.Hospital.ShipDate()) === 'date' ? app.Views.Hospital.ShipDate() : parseDate($("#ShipDate").val(), date_format_);

        //if (app.Views.Hospital.IsSample() === "true" && $("#ITy").val() != 1 && $("#RecDate").val() !="") {
        if (app.Views.Hospital.IsSample() === "true" && $("#ITy").val() != 1 && self_CL.Processed() == "true") {
            console.log("11");
            if ($("#RecDate").val() == "") {
                msg += "\n" + msgValidateRecDateRequired;           //"Fecha de recepción es requerida";                
                console.log("11a");
            }

            if ($("#RecDate").val() != "" && !moment(moment(rec_date).format(date_format_moment), [date_format_moment], true).isValid()) {
                msg += "\n" + msgValidateRecDateInvalid;            //"Fecha de recepción es inválida ";                
                console.log("11b");
            }

            if (self_CL.UsrCountry() == 11 || self_CL.UsrCountry() == 119) {
                if (date_ShipDate != null && rec_date != null && moment(rec_date).isBefore(moment(rec_date), 'days')) {
                    console.log("11c");
                    msg += "\n" + msgValidateRecDateShipDateIC;
                }                    
            } else {
                if (date_ShipDate != null && rec_date != null && moment(rec_date).isBefore(moment(date_ShipDate), 'days')) {
                    msg += "\n" + msgValidateRecDateShipDate;       //"'Fecha de recepcion' no puede ser anterior a la 'Fecha de envío'";                    
                    console.log("11d");
                }
            }

            if (self_CL.Processed() == "true") {
                console.log("22");
                if (self_CL.LabTests().length <= 0) {
                    msg += "\n" + msgValidateInsertResult;          //"Inserte al menos un resultado";
                    console.log("22a");
                }

                // Verificación de procesos uno de la muestra 1
                var errRes = self_CL.validatebeforeadd(1, 1);
                if (errRes != "") {
                    console.log("22b");
                    msg += errRes;
                }
            }

            console.log("333");
            var labtests_check = $.grep(self_CL.LabTests(), function (v) {
                return v.TestType() === "2" || v.TestType() === "1";
            });
            if (labtests_check.length > 0) {
                if ($("#EndLabDate").val() == "") {
                    msg += "\n" + msgValidateFinalResultDate;               //"Fecha del resultado final es requerida";   
                    console.log("33a");
                }
                     

                if ($("#EndLabDate").val() != "") {
                    if (!moment(moment(date_close_date_lab).format(date_format_moment), [date_format_moment], true).isValid()) {
                        msg += "\n" + msgValidateFinalResultDateInvalid;    //"Fecha del resultado final es inválida";     
                        console.log("33b");
                    }
                                      

                    if ($("#RecDate").val() != "" && moment(rec_date).isAfter(moment(date_close_date_lab), 'days')) {
                        msg += "\n" + msgValidateFinalResultDateRecDate;    //"'Fecha del resultado final' no puede ser anterior a la 'Fecha de recepción'";           
                        console.log("33c");
                    }                                

                    //if (!self_CL.FinalResult() || self_CL.FinalResult() == "") {
                    if (!oLabView.FinalResult() || oLabView.FinalResult() == "") {
                        msg += "\n" + msgValidateFinalResult;               //"Selecione un resultado final";       
                        console.log("33d");
                    }
                }
            }

            self_CL.ArrayValidate(self_CL.LabTests().concat(self_CL.LabTests_Sample2()).concat(self_CL.LabTests_Sample3()));
            for (index = 0; index < self_CL.ArrayValidate().length; ++index) {

                if (self_CL.ArrayValidate()[index].TestResultID() === "P"  // Resultado general Positivo
                    && self_CL.ArrayValidate()[index].VirusTypeID() === "1" // Virus seleccionado 
                    && self_CL.ArrayValidate()[index].TestType() === "2"   // Tipo de técnica es PCR
                    && self_CL.ArrayValidate()[index].TestResultID_VirusSubType() != "P" && self_CL.ArrayValidate()[index].TestResultID_VirusSubType_2() != "P"
                    && self_CL.UsrCountry() == 7) {
                    msg += "\n" + msgValidateProcessResult_Subtype;
                    console.log("33e");
                }
            }
        }

        /* YA NO SE NECISITA ???
        if (app.Views.Hospital.IsSample() === "true" && $("#ITy").val() != 1 && self_CL.Processed_National() == "true") {
            console.log("33");
            if ($("#RecDate_National").val() == "") {
                msg += "\n" + msgValidateRecDateRequired;           //"Fecha de recepción es requerida";                
                console.log("33a");
            }

            if ($("#RecDate_National").val() != "" && !moment(moment(rec_date_national).format(date_format_moment), [date_format_moment], true).isValid()) {
                msg += "\n" + msgValidateRecDateInvalid;
                console.log("33b");
            }

            if (date_ShipDate != null && rec_date_national != null && moment(rec_date_national).isBefore(moment(date_ShipDate), 'days')) {
                msg += "\n" + msgValidateRecDateShipDate;           //"'Fecha de recepcion' no puede ser anterior a la 'Fecha de envío'";                
                console.log("33c");
            }

            if (self_CL.Processed_National() == "true") {

                if (self_CL.LabTests().length <= 0) {
                    msg += "\n" + msgValidateInsertResult;
                    //"Inserte al menos un resultado";
                }

                // Verificación de procesos uno de la muestra 1
                //var errRes = self.validatebeforeadd(1, 1);
                //if (errRes != "") {
                //    msg += errRes;
                //}
            }
        }
        */

        console.log("444");
        console.log("->" + msg + "<-");
        console.log("44a");
        if (self_CL.Processed() == "false" && self_CL.NoProRenId() == "") {
            msg += "\n" + msgValidateProcessedReason;           //"Indique la razón porque no fue procesada la muestra";
            console.log("44b");
        }

        /* YA NO SE NECISTA ???
        if (self_CL.Processed_National() == "false" && self_CL.NoProRenId_National() == "") {
            msg += "\n" + msgValidateProcessedReason;
            //"Indique la razón porque no fue procesada la muestra";
        }
        */

        console.log("44c");
        self_CL.msgError = msg;
        if (msg !== "")
        {
            console.log("44d");
            alert(msgValidationTitleLab + msg);
            $('#tabs').tabs({ active: 4 });
            console.log("l.vm.js-CaseLab->self_CL.validate->END_1");
            return false;
        }

        //if (self.UsrCountry == 7) {
        //    if (msg !== "") { alert('LABORATORIO:' + msg); $('#tabs').tabs({ active: 4 }); return false; }
        //} else {
        //    if (msg !== "") { alert('LABORATORIO:' + msg); $('#tabs').tabs({ active: 5 }); return false; }
        //}

        if (nextStep != null)
            nextStep();

        console.log("44e");
        console.log("l.vm.js-CaseLab->self_CL.validate->END");
        return true;
    };

    self_CL.removeLabTest = function (sample_number, data) {
        console.log("LAB->self_CL.removeLabTest->START");

        if (sample_number == 1) {
            self_CL.LabTests.remove(data);
        } else if (sample_number == 2) {
            self_CL.LabTests_Sample2.remove(data);
        } else if (sample_number == 3) {
            self_CL.LabTests_Sample3.remove(data);
        } else if (sample_number == 999) {
            self_CL.LabTestsExternal.remove(data);
        }

        //self_CL.OrdenFinalResult();
        app.Views.Lab.OrdenFinalResult();

        console.log("LAB->self_CL.removeLabTest->END");
    };

    self_CL.removeTestbyLab = function (LabId, SampleNumber) {

        self_CL.LabTests.forEach(function (c, i) {
            //console.log("CanEdit - " + c.CanEdit() + " - LabId" + LabId);
            if (c.CanDeleteProcess() == true) {
                //console.log("borrar");
                self_CL.removeLabTest(SampleNumber, c)
            }

        });
    };

    self_CL.EnableCHI = ko.computed(function () {
        return (self_CL.UsrCountry() != 7) ? true : false;

    }, self_CL);

    self_CL.DisableCHI = ko.computed(function () {
        return (self_CL.UsrCountry() == 7) ? true : false;

    }, self_CL);

    self_CL.ActiveCHI = ko.computed(function () {
        return (self_CL.UsrCountry() == 7) ? true : false;
    }, self_CL);
      

    //console.log("function CaseLabses(SampleNumber)->END");
};

function LabViewModel(app, dataModel) {
    //console.log("function LabViewModel(app, dataModel)->STARTT");

    var self = this;
    var date_format_ = app.dataModel.date_format_;
    var date_format_moment = app.dataModel.date_format_moment;
    var date_format_ISO = app.dataModel.date_format_ISO;

    var rec_date = new Date();
    var date_close_date_lab = new Date();
    var date_lab_test_start = new Date();
    var date_lab_text_final = new Date();
    

    //Orden para el resultado final automaticamente

    self.OrderDummy = ko.observableArray([]);
    self.OrderDummy_existvirus = ko.observableArray([]);
    self.OrderArrayFinalResult = ko.observableArray([]);

    self.Id = "";
    self.UsrCountry = ko.observable(app.Views.Home.UsrCountry());       // Pais del usuario logueado
    self.UsrInstID = ko.observable($('#IIDL').val());                   // ID de la institucion del usuario
    self.UsrInstName = ko.observable("");

    //**self.ISPID = ko.observable(97);                                     //Es 97 porque es el ID de la tabla institución
    self.NPHL = ko.observable(false);    // Variable que identifica si el usuario que ingresa la información de laboratorio es NPHL
    self.NPHL_FlowExist = ko.observable(false);  // Variable que identifica que en el flujo de la ficha existe una institución NPHL oh que no ingrese test
    self.ForeignLabCountry = ko.observable(false);
    self.ForeignLabLocal = ko.observable(false);
    self.flow_max_record = ko.observable("");
    self.hasReset = ko.observable(false);
    self.hasGet = ko.observable(false);

    ////self.RecDate12 = ko.observable(null);               //**** NEW: 190926
    //self.RecDate = ko.observable(null);
    //self.Identification_Test = ko.observable("");
    //self.TempSample1 = ko.observable("").extend({ numeric: 2 });
    //self.Processed = ko.observable("");
    //self.NoProRen = ko.observable("");
    //self.NoProRenId = ko.observable("");

    self.RecDate2 = ko.observable(null);
    self.Identification_Test2 = ko.observable("");
    self.TempSample2 = ko.observable("").extend({ numeric: 2 });
    self.Processed2 = ko.observable("");
    self.NoProRen2 = ko.observable("");
    self.NoProRenId2 = ko.observable("");

    self.RecDate3 = ko.observable(null);
    self.Identification_Test3 = ko.observable("");
    self.TempSample3 = ko.observable("").extend({ numeric: 2 });
    self.Processed3 = ko.observable("");
    self.NoProRen3 = ko.observable("");
    self.NoProRenId3 = ko.observable("");

                    self.RecDate_National = ko.observable(null);
                    self.Identification_Test_National = ko.observable("");
                    self.TempSample_National = ko.observable("").extend({ numeric: 2 });
                    self.Processed_National = ko.observable("");
                    self.NoProRen_National = ko.observable("");
                    self.NoProRenId_National = ko.observable("");

    self.CanPCRLab = ko.observable(true);
    self.CanIFILab = ko.observable(true);

    // nuevos campos
                    self.Rec_Date_NPHL = ko.observable(null);
                    self.Identification_Test_NPHL = ko.observable("");
                    self.Temp_NPHL = ko.observable("").extend({ numeric: 2 });    
                    self.Observation_NPHL = ko.observable("");    
                    self.Ship_Date_NPHL = ko.observable(null);    

                    self.NPHL_Processed = ko.observable(null);
                    self.NPHL_NoProRenId = ko.observable(null);
                    self.NPHL_NoProRen = ko.observable(null);
                    self.NPHL_Conclusion = ko.observable("");

                    self.Rec_Date_NPHL_2 = ko.observable(null);
                    self.Identification_Test_NPHL_2 = ko.observable("");
                    self.Temp_NPHL_2 = ko.observable("").extend({ numeric: 2 });
                    self.Observation_NPHL_2 = ko.observable("");
                    self.Ship_Date_NPHL_2 = ko.observable(null);

                    self.NPHL_Processed_2 = ko.observable(null);
                    self.NPHL_NoProRenId_2 = ko.observable(null);
                    self.NPHL_NoProRen_2 = ko.observable(null);
                    self.NPHL_Conclusion_2 = ko.observable("");

                    self.Rec_Date_NPHL_3 = ko.observable(null);
                    self.Identification_Test_NPHL_3 = ko.observable("");
                    self.Temp_NPHL_3 = ko.observable("").extend({ numeric: 2 });
                    self.Observation_NPHL_3 = ko.observable("");
                    self.Ship_Date_NPHL_3 = ko.observable(null);

                    self.NPHL_Processed_3 = ko.observable(null);
                    self.NPHL_NoProRenId_3 = ko.observable(null);
                    self.NPHL_NoProRen_3 = ko.observable(null);
                    self.NPHL_Conclusion_3 = ko.observable("");

                    self.Rec_Date_NPHL.subscribe(function (newRecDateNPHL) {
                        if (self.hasReset() != true && newRecDateNPHL != "" && newRecDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newRecDateNPHL) === 'date' ? newRecDateNPHL : parseDate(newRecDateNPHL, date_format_);
                            var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate()) === 'date' ? app.Views.Hospital.SampleDate() : parseDate(app.Views.Hospital.SampleDate(), date_format_);
                            var date_shipping_date = $("#ShipDate").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate()) === 'date' ? app.Views.Hospital.ShipDate() : parseDate(app.Views.Hospital.ShipDate(), date_format_);


                            if ((date_shipping_date != null) && self.hasReset() != true) {

                                if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                                    alert(msgValidationShippingDateValidateS1);
                                    self.Rec_Date_NPHL(null);
                                }

                            } else if ((date_sample_date_ == null || date_sample_date_ == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationSampleDateS1);
                                self.Rec_Date_NPHL(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de toma muestra de la Muestra 1");
                                    alert(msgValidationSampleDateValidateS1);
                                    self.Rec_Date_NPHL(null);
                                }
                            }
                        }
                    });

                    self.Rec_Date_NPHL_2.subscribe(function (newRecDateNPHL) {
                        if (self.hasReset() != true && newRecDateNPHL != "" && newRecDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newRecDateNPHL) === 'date' ? newRecDateNPHL : parseDate(newRecDateNPHL, date_format_);
                            var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate2()) === 'date' ? app.Views.Hospital.SampleDate2() : parseDate(app.Views.Hospital.SampleDate2(), date_format_);
                            var date_shipping_date = $("#ShipDate2").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate2()) === 'date' ? app.Views.Hospital.ShipDate2() : parseDate(app.Views.Hospital.ShipDate2(), date_format_);


                            if ((date_shipping_date != null) && self.hasReset() != true) {

                                if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                                    alert(msgValidationShippingDateValidateS2);
                                    self.Rec_Date_NPHL_2(null);
                                }

                            } else if ((date_sample_date_ == null || date_sample_date_ == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationSampleDateS2);
                                self.Rec_Date_NPHL_2(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de toma muestra de la Muestra 1");
                                    alert(msgValidationSampleDateValidateS2);
                                    self.Rec_Date_NPHL_2(null);
                                }
                            }
                        }
                    });

                    self.Rec_Date_NPHL_3.subscribe(function (newRecDateNPHL) {
                        if (self.hasReset() != true && newRecDateNPHL != "" && newRecDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newRecDateNPHL) === 'date' ? newRecDateNPHL : parseDate(newRecDateNPHL, date_format_);
                            var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate3()) === 'date' ? app.Views.Hospital.SampleDate3() : parseDate(app.Views.Hospital.SampleDate3(), date_format_);
                            var date_shipping_date = $("#ShipDate3").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate3()) === 'date' ? app.Views.Hospital.ShipDate3() : parseDate(app.Views.Hospital.ShipDate3(), date_format_);


                            if ((date_shipping_date != null) && self.hasReset() != true) {

                                if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
                                    alert(msgValidationShippingDateValidateS3);
                                    self.Rec_Date_NPHL_3(null);
                                }

                            } else if ((date_sample_date_ == null || date_sample_date_ == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationSampleDateS3);
                                self.Rec_Date_NPHL_3(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de toma muestra de la Muestra 1");
                                    alert(msgValidationSampleDateValidateS3);
                                    self.Rec_Date_NPHL_3(null);
                                }
                            }
                        }
                    });

                    self.Ship_Date_NPHL.subscribe(function (newShipDateNPHL) {
                        if (self.hasReset() != true && newShipDateNPHL != "" && newShipDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newShipDateNPHL) === 'date' ? newShipDateNPHL : parseDate(newShipDateNPHL, date_format_);
                            var date_Rec_Date_NPHL = jQuery.type(self.Rec_Date_NPHL()) === 'date' ? self.Rec_Date_NPHL() : parseDate(self.Rec_Date_NPHL(), date_format_);

                            if ((date_Rec_Date_NPHL == null || date_Rec_Date_NPHL == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationRecSampleNPHL);
                                self.Ship_Date_NPHL(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_Rec_Date_NPHL), "days")) {
                                    //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                                    alert(msgValidationShipDateNPHLValidateS1);
                                    self.Ship_Date_NPHL(null);
                                }
                            }
                        }
                    });

                    self.Ship_Date_NPHL_2.subscribe(function (newShipDateNPHL) {
                        if (self.hasReset() != true && newShipDateNPHL != "" && newShipDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newShipDateNPHL) === 'date' ? newShipDateNPHL : parseDate(newShipDateNPHL, date_format_);
                            var date_Rec_Date_NPHL_2 = jQuery.type(self.Rec_Date_NPHL_2()) === 'date' ? self.Rec_Date_NPHL_2() : parseDate(self.Rec_Date_NPHL_2(), date_format_);

                            if ((date_Rec_Date_NPHL_2 == null || date_Rec_Date_NPHL_2 == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationRecSampleNPHL);
                                self.Ship_Date_NPHL_2(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_Rec_Date_NPHL_2), "days")) {
                                    //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                                    alert(msgValidationShipDateNPHLValidateS2);
                                    self.Ship_Date_NPHL_2(null);
                                }
                            }
                        }
                    });

                    self.Ship_Date_NPHL_3.subscribe(function (newShipDateNPHL) {
                        if (self.hasReset() != true && newShipDateNPHL != "" && newShipDateNPHL != null && self.NPHL() == true) {
                            var current_value = jQuery.type(newShipDateNPHL) === 'date' ? newShipDateNPHL : parseDate(newShipDateNPHL, date_format_);
                            var date_Rec_Date_NPHL_3 = jQuery.type(self.Rec_Date_NPHL_3()) === 'date' ? self.Rec_Date_NPHL_3() : parseDate(self.Rec_Date_NPHL_3(), date_format_);

                            if ((date_Rec_Date_NPHL_3 == null || date_Rec_Date_NPHL_3 == "") && self.hasReset() != true) {
                                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                                alert(msgValidationRecSampleNPHL);
                                self.Ship_Date_NPHL_3(null);
                            } else {
                                if (moment(current_value).isBefore(moment(date_Rec_Date_NPHL_3), "days")) {
                                    //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                                    alert(msgValidationShipDateNPHLValidateS3);
                                    self.Ship_Date_NPHL_3(null);
                                }
                            }
                        }
                    });

    //self.RecDate.subscribe(function (newRecDate) {            //**** NEW: 190926
    //    if (self.hasReset() != true && newRecDate != "" && newRecDate != null)
    //    {
    //        var current_value = jQuery.type(newRecDate) === 'date' ? newRecDate : parseDate(newRecDate, date_format_);
    //        var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate()) === 'date' ? app.Views.Hospital.SampleDate() : parseDate(app.Views.Hospital.SampleDate(), date_format_);
    //        var date_shipping_date = $("#ShipDate").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate()) === 'date' ? app.Views.Hospital.ShipDate() : parseDate(app.Views.Hospital.ShipDate(), date_format_);


    //        if ($("#Rec_Date_NPHL").length > 0 && self.NPHL_FlowExist() == true) {

    //            var date_Ship_Date_NPHL = jQuery.type(self.Ship_Date_NPHL()) === 'date' ? self.Ship_Date_NPHL() : parseDate(self.Ship_Date_NPHL(), date_format_);

    //            if ((date_Ship_Date_NPHL == null || date_Ship_Date_NPHL == "") && self.hasReset() != true) {
    //                //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
    //                alert(msgValidationRecSampleNPHL);
    //                //self.RecDate(null);
    //            } else {
    //                if (moment(current_value).isBefore(moment(date_Ship_Date_NPHL), "days")) {
    //                    //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
    //                    alert(msgValidationSampleDateNPHLValidateS1);
    //                    //self.RecDate(null);
    //                }
    //            }

    //        } else if ((date_shipping_date != null) && self.hasReset() != true) {
    //            if (self.UsrCountry() == 11 || self.UsrCountry() == 119) {
    //                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
    //                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
    //                    alert(msgValidationShippingDateValidateICS1);
    //                          //msgValidationShippingDateValidateICS1
    //                    self.RecDate(null);
    //                }
    //            } else {
    //                if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
    //                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
    //                    alert(msgValidationShippingDateValidateS1);
    //                    self.RecDate(null);
    //                }
    //            }

    //            /*if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
    //                //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de envio de muestra de la Muestra 1");
    //                alert(msgValidationShippingDateValidateS1);
    //                self.RecDate(null);
    //            }*/

    //        } else if ((date_sample_date_ == null || date_sample_date_ == "") && self.hasReset() != true) {
    //            //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
    //            alert(msgValidationSampleDateS1);
    //                self.RecDate(null);
    //            } else {
    //                if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
    //                    //alert("La fecha de recepción de Muestra 1 no puede ser menor a la fecha de toma muestra de la Muestra 1");
    //                    alert(msgValidationSampleDateValidateS1);
    //                    self.RecDate(null);
    //                }
    //              }
    //    }
    //});

    self.RecDate2.subscribe(function (newRecDate2) {
        if (self.UsrCountry() == 7 || self.UsrCountry() == 3 || self.UsrCountry() == 25) {
            if (self.hasReset() != true && newRecDate2 != "") {
                var current_value = jQuery.type(newRecDate2) === 'date'  ? newRecDate2 : parseDate(newRecDate2, date_format_);
                var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate2()) === 'date' ? app.Views.Hospital.SampleDate2() : parseDate(app.Views.Hospital.SampleDate2(), date_format_);
                var date_shipping_date = $("#ShipDate2").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate2()) === 'date' ? app.Views.Hospital.ShipDate2() : parseDate(app.Views.Hospital.ShipDate2(), date_format_);

                if ($("#Rec_Date_NPHL_2").length > 0) {

                    var date_Ship_Date_NPHL = jQuery.type(self.Ship_Date_NPHL_2()) === 'date' ? self.Ship_Date_NPHL_2() : parseDate(self.Ship_Date_NPHL_2(), date_format_);

                    if ((date_Ship_Date_NPHL == null || date_Ship_Date_NPHL == "") && self.hasReset() != true) {
                        //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                        alert(msgValidationRecSampleNPHL);
                        //self.RecDate(null);
                    } else {
                        if (moment(current_value).isBefore(moment(date_Ship_Date_NPHL), "days")) {
                            //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                            alert(msgValidationSampleDateNPHLValidateS1);
                            //self.RecDate(null);
                        }
                    }

                } else if ((date_shipping_date != null) && self.hasReset() != true) {

                    if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                        //alert("La fecha de recepción de Muestra 2 no puede ser menor a la fecha de envio de muestra de la Muestra 2");
                        alert(msgValidationShippingDateValidateS2);
                        self.RecDate(null);
                    }

                } else if (date_sample_date_ == null || date_sample_date_ == "") {
                    //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 2");
                    alert(msgValidationSampleDateS2);
                    self.RecDate2(null);
                } else {
                    if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                        //alert("La fecha de recepción de Muestra 2 no puede ser menor a la fecha de toma muestra de la Muestra 2");
                        alert(msgValidationSampleDateValidateS2);
                        self.RecDate2(null);
                    }
                }
            }
        }

    });

    self.RecDate3.subscribe(function (newRecDate3) {
        if (self.UsrCountry() == 7 || self.UsrCountry() == 3 || self.UsrCountry() == 25) {
            if (self.hasReset() != true && newRecDate3 != "") {
                var current_value = jQuery.type(newRecDate3) === 'date' ? newRecDate3 : parseDate(newRecDate3, date_format_);
                var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate3()) === 'date' ? app.Views.Hospital.SampleDate3() : parseDate(app.Views.Hospital.SampleDate3(), date_format_);
                var date_shipping_date = $("#ShipDate3").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate3()) === 'date' ? app.Views.Hospital.ShipDate3() : parseDate(app.Views.Hospital.ShipDate3(), date_format_);

                if ($("#Rec_Date_NPHL_3").length > 0) {

                    var date_Ship_Date_NPHL = jQuery.type(self.Ship_Date_NPHL_3()) === 'date' ? self.Ship_Date_NPHL_3() : parseDate(self.Ship_Date_NPHL_3(), date_format_);

                    if ((date_Ship_Date_NPHL == null || date_Ship_Date_NPHL == "") && self.hasReset() != true) {
                        //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 1");
                        alert(msgValidationRecSampleNPHL);
                        //self.RecDate(null);
                    } else {
                        if (moment(current_value).isBefore(moment(date_Ship_Date_NPHL), "days")) {
                            //alert("La fecha de envío de la Muestra  no puede ser menor a la fecha de recepción de la muestra en NPHL");
                            alert(msgValidationSampleDateNPHLValidateS1);
                            //self.RecDate(null);
                        }
                    }

                } else if ((date_shipping_date != null) && self.hasReset() != true) {

                    if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                        //alert("La fecha de recepción de Muestra 3 no puede ser menor a la fecha de envio de muestra de la Muestra 3");
                        alert(msgValidationShippingDateValidateS3);
                        self.RecDate(null);
                    }

                } else if (date_sample_date_ == null || date_sample_date_ == "") {
                    //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 3");
                    alert(msgValidationSampleDateS3);
                    self.RecDate3(null);
                } else {
                    if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                        //alert("La fecha de recepción de Muestra 3 no puede ser menor a la fecha de toma muestra de la Muestra 3");
                        alert(msgValidationSampleDateValidateS3);
                        self.RecDate3(null);
                    }
                }
            }
        }

    });

                    self.RecDate_National.subscribe(function (newRecDate_National) {
                        if (self.UsrCountry() == 15 || (self.UsrCountry() == 25 && self.NPHL_FlowExist())) {
                            if (self.hasReset() != true && newRecDate_National != "") {
                                var current_value = jQuery.type(newRecDate_National) === 'date' ? newRecDate_National : parseDate(newRecDate_National, date_format_);
                                var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate()) === 'date' ? app.Views.Hospital.SampleDate() : parseDate(app.Views.Hospital.SampleDate(), date_format_);
                                var date_shipping_date = $("#ShipDate").val() == "" ? null : jQuery.type(app.Views.Hospital.ShipDate()) === 'date' ? app.Views.Hospital.ShipDate() : parseDate(app.Views.Hospital.ShipDate(), date_format_);

                                 if ((date_shipping_date != null) && self.hasReset() != true) {

                                    if (moment(current_value).isBefore(moment(date_shipping_date), "days")) {
                                        //alert("La fecha de recepción de Muestra 2 no puede ser menor a la fecha de envio de muestra de la Muestra 2");
                                        alert(msgValidationShippingDateValidateS1);
                                        self.RecDate(null);
                                    }

                                } else if (date_sample_date_ == null || date_sample_date_ == "") {
                                    //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 2");
                                    alert(msgValidationSampleDateS1);
                                    self.RecDate2(null);
                                } else {
                                    if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                                        //alert("La fecha de recepción de Muestra 2 no puede ser menor a la fecha de toma muestra de la Muestra 2");
                                        alert(msgValidationSampleDateValidateS1);
                                        self.RecDate2(null);
                                    }
                                }
                            }
                        }

                    });

    /*self.RecDate3.subscribe(function (newRecDate3) {
        if (self.UsrCountry() == 7) {
            if (self.hasReset() != true && newRecDate3 != "") {
                var current_value = jQuery.type(newRecDate3) === 'date'  ? newRecDate3 : parseDate(newRecDate3, date_format_);
                var date_sample_date_ = jQuery.type(app.Views.Hospital.SampleDate3()) === 'date' ? app.Views.Hospital.SampleDate3() : parseDate(app.Views.Hospital.SampleDate3(), date_format_);
                if (self.UsrCountry() == 7) {
                    if (self.hasReset() != true && newRecDate3 != "") {
                        if (date_sample_date_ == null || date_sample_date_ == "") {
                            //alert("Por favor ingrese antes la fecha de toma muestra de la Muestra 3");
                            alert(msgValidationSampleDateS3);
                            self.RecDate3(null);
                        } else {
                            if (moment(current_value).isBefore(moment(date_sample_date_), "days")) {
                                //alert("La fecha de recepción de Muestra 3 no puede ser menor a la fecha de toma muestra de la Muestra 3");
                                alert(msgValidationSampleDateValidateS3);
                                self.RecDate3(null);
                            }
                        }
                    }
                }
            }
        }
        
    });*/

    self.EnableCHI = ko.computed(function () {
        return (self.UsrCountry() != 7) ? true : false;

    }, self); 

    self.DisableCHI = ko.computed(function () {
        return (self.UsrCountry() == 7) ? true : false;

    }, self);

    self.ActiveCHI = ko.computed(function () {
        return (self.UsrCountry() == 7) ? true : false;
    }, self);

    self.EnableCHIPrint = ko.computed(function () {
        return (self.UsrCountry() == 7 && $("#ITy").val() == 2  ) ? true : false;

    }, self);

    //self.VisibleMuestra2 = ko.computed(function () {
    //    return (self.UsrCountry() == 7 && app.Views.Hospital.SampleDate2() && self.RecDate()) ? true : false;

    //}, self);

    //self.VisibleMuestra3 = ko.computed(function () {
    //    return (self.UsrCountry() == 7 && app.Views.Hospital.SampleDate3() && self.RecDate2()) ? true : false;

    //}, self);

    self.VisibleMuestraRec2 = ko.computed(function () {
        return ((self.UsrCountry() == 7 || self.UsrCountry() == 3 || self.UsrCountry() == 17) && app.Views.Hospital.SampleDate2() != null) ? true : false;

    }, self);

    self.VisibleMuestraRec3 = ko.computed(function () {
        return (self.UsrCountry() == 7 && app.Views.Hospital.SampleDate3() != null ) ? true : false;

    }, self);

    self.FinalResult = ko.observable("");
    self.FinalResultVirusTypeID = ko.observable("");
    self.FinalResultVirusSubTypeID = ko.observable("");
    self.FinalResultVirusLineageID = ko.observable("");

    self.FinalResult_2 = ko.observable("");
    self.FinalResultVirusTypeID_2 = ko.observable("");
    self.FinalResultVirusSubTypeID_2 = ko.observable("");
    self.FinalResultVirusLineageID_2 = ko.observable("");

    self.FinalResult_3 = ko.observable("");
    self.FinalResultVirusTypeID_3 = ko.observable("");
    self.FinalResultVirusSubTypeID_3 = ko.observable("");
    self.FinalResultVirusLineageID_3 = ko.observable("");

    self.GeneticGroup = ko.observable("");
    self.GeneticGroup_2 = ko.observable("");
    self.GeneticGroup_3 = ko.observable("");

    self.EnableGeneticGroup = ko.computed(function () {
        var result = (self.FinalResultVirusTypeID() == "1" || self.FinalResultVirusTypeID() == "2");
        if (result) {
            if (lab_NIC_usr)
                $('#GeneticGroup').prop('disabled', false);
            else
                $('#GeneticGroup').prop('disabled', true);
        } else {
            self.GeneticGroup("");
        }
            
        return result;
    }, self);

    self.EnableGeneticGroup_2 = ko.computed(function () {
        var result = (self.FinalResultVirusTypeID_2() == "1" || self.FinalResultVirusTypeID_2() == "2");
        //if (!result) self.GeneticGroup_2("");
        if (result) {
            if (lab_NIC_usr)
                //$('#GeneticGroup_2').removeAttr('disabled');              // Enable
                $('#GeneticGroup_2').prop('disabled', false);               // Enable
            else
                //$('#GeneticGroup_2').attr('disabled', 'disabled');
                $('#GeneticGroup_2').prop('disabled', true);
        } else {
            self.GeneticGroup_2("");
        }

        return result;
    }, self);

    self.EnableGeneticGroup_3 = ko.computed(function () {
        var result = (self.FinalResultVirusTypeID_3() == "1" || self.FinalResultVirusTypeID_3() == "2");
        //if (!result) self.GeneticGroup_3("");
        if (result) {
            if (lab_NIC_usr)
                //$('#GeneticGroup_3').removeAttr('disabled');              // Enable
                $('#GeneticGroup_3').prop('disabled', false);               // Enable            
            else
                //$('#GeneticGroup_3').attr('disabled', 'disabled');
                $('#GeneticGroup_3').prop('disabled', true);
        } else {
            self.GeneticGroup_3("");
        }

        return result;
    }, self);

    self.resetFinalResult = function () {
        console.log("LAB->P->resetFinalResult->START");
        self.FinalResult("");
        self.FinalResultVirusTypeID("");
        self.FinalResultVirusSubTypeID("");
        self.FinalResultVirusLineageID("");
        self.FinalResult_2("");
        self.FinalResultVirusTypeID_2("");
        self.FinalResultVirusSubTypeID_2("");
        self.FinalResultVirusLineageID_2("");
        self.FinalResult_3("");
        self.FinalResultVirusTypeID_3("");
        self.FinalResultVirusSubTypeID_3("");
        self.FinalResultVirusLineageID_3("");
        self.GeneticGroup("");
        self.GeneticGroup_2("");
        self.GeneticGroup_3("");
        console.log("LAB->P->resetFinalResult->END");
    };

    self.EnableTestNational = function () {
        //console.log("flow_max - " + self.flow_max_record());
        //console.log("flow_institution - " + app.Views.Contact.flow_institution());
        //console.log(" flow_record " + self.flow_max_record() == app.Views.Contact.flow_institution());
        if ($("#ITy").val() == "2" && (self.UsrCountry() == 15 || (self.UsrCountry() == 25 && self.NPHL_FlowExist())) && self.flow_max_record() == app.Views.Contact.flow_institution()) {
            return true;
            }
        else {
            return false;
        }

    }

    self.EndLabDate = ko.observable(null);
    self.Comments = ko.observable("");

    self.CaseLabses = ko.observableArray();                   //**** NEW: 190926
    self.LabTestsEndFlow = ko.observableArray([]);              //**** NEW: 190926

    //self.LabTests_Sample2 = ko.observableArray([]);
    //self.LabTests_Sample3 = ko.observableArray([]);
    self.LabTestsExternal = ko.observableArray([]);             // Debe estar en CaseLabTest

    self.LabsResult = ko.observableArray([]);
    self.LabsResultExternal = ko.observableArray(app.Views.Home.labsExternal());
    self.SubTypeByLabRes = ko.observableArray([]);
    self.ArrayValidate = ko.observableArray([]);
    
    //self.SaveAndAdd_1 = ko.observable(true);
    //self.SaveAndAdd_2 = ko.observable(true);
    //self.SaveAndAdd_3 = ko.observable(true);
    self.CanConclude = ko.observable(true);
    self.FResult = ko.observable("");

    self.FinalResult.subscribe(function (newFinalResult) {
        //console.log("FinalResult");
        //console.log(newFinalResult);
        if (newFinalResult != "" && newFinalResult != "undefined" && newFinalResult != null)
        {
            $("a[href*='tab-case']").show();
            $("#tab-case").show();
            $("#tabs").tabs("refresh");
            if (app.Views.Contact.SurvILI() == true && $("#ITy").val() != 2) {
                $("#CaseStatus").attr("disabled", false);
            } else if ($("#ITy").val() == 2) {
                $("#CaseStatus").attr("disabled", true);
            }


            if (app.Views.Contact.SurvSARI() == true && app.Views.Hospital.Destin() != "" && self.CanConclude() == true && $("#ITy").val() != 2) {
                $("#CaseStatus").attr("disabled", false);
            } else if ($("#ITy").val() == 2) {
                $("#CaseStatus").attr("disabled", true);
            }
            //$("#tabs").tabs("refresh");

        } else if ((newFinalResult == "" || newFinalResult == "undefined" || newFinalResult == null) && app.Views.Hospital.IsSample() === "true") {
            //console.log("FinalResult_4");
            $("a[href*='tab-case']").hide();
            $("#tab-case").hide();
        }
    });
    
    self.EnableFinalResultVirusSubTypeID = ko.computed(function () {
        var result = self.FinalResultVirusTypeID() == "1";
        if (!result) self.FinalResultVirusSubTypeID("");
        return result;
    }, self);

    self.EnableFinalResultVirusLineageID = ko.computed(function () {
        var result = self.FinalResultVirusTypeID() == "2"; if (!result) self.FinalResultVirusLineageID(""); return result;
    }, self);

    self.EnableFinalResultVirusSubTypeID_2 = ko.computed(function () {
        var result = self.FinalResultVirusTypeID_2() == "1";
        if (!result) self.FinalResultVirusSubTypeID_2("");
        return result;
    }, self);

    self.EnableFinalResultVirusLineageID_2 = ko.computed(function () {
        var result = self.FinalResultVirusTypeID_2() == "2";
        if (!result)
            self.FinalResultVirusLineageID_2(""); 
        return result;
    }, self);

    self.EnableFinalResultVirusSubTypeID_3 = ko.computed(function () {
        var result = self.FinalResultVirusTypeID_3() == "1";
        if (!result) self.FinalResultVirusSubTypeID_3("");
        return result;
    }, self);

    self.EnableFinalResultVirusLineageID_3 = ko.computed(function () {
        var result = self.FinalResultVirusTypeID_3() == "2"; if (!result) self.FinalResultVirusLineageID_3(""); return result;
    }, self);

    //self.removeTestbyLab = function (LabId, SampleNumber) {

    //    self.LabTests().forEach(function (c, i) {
    //        //console.log("CanEdit - " + c.CanEdit() + " - LabId" + LabId);
    //        if (c.CanDeleteProcess() == true) {
    //            //console.log("borrar");
    //            self.removeLabTest(SampleNumber, c)
    //        }
                 
    //    });
    //};
    
    //self.Processed.subscribe(function (NewIsProcessed) {          //**** NEW: 190926
    ////console.log("aqui Processed.subscribe" + NewIsProcessed);
    //    if (NewIsProcessed == "false")
    //    {
    //        self.removeTestbyLab(self.UsrInstID(), 1);
    //        $("#addLabTest_1").hide();
    //    } else if (NewIsProcessed == "true") {
    //        $("#addLabTest_1").show();
    //    }            
    //});

    self.Processed_National.subscribe(function (NewIsProcessed) {
        //console.log("aqui Processed_National.subscribe");
        //console.log(self.LabTests());
        //self.OrdenFinalResult();

        if (NewIsProcessed == "false") {
            self.removeTestbyLab(self.UsrInstID(), 1);
            $("#addLabTest_1").hide();
        } else if (NewIsProcessed == "true") {

            $("#addLabTest_1").show();
        }

    });

    self.EnableVirusTypesFinal = ko.computed(function () {
        if (self.FinalResult() == "N" || self.FinalResult() == "U" || self.FinalResult() == "") {
            self.FinalResultVirusTypeID("");
            return false;
        }
        else return true;
    }, self);

    self.generateSortFn = function (props) {
        return function (a, b) {
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                var name = prop.name;
                var reverse = prop.reverse;
                if (a[name] < b[name])
                    return reverse ? 1 : -1;
                if (a[name] > b[name])
                    return reverse ? -1 : 1;
            }
            return 0;
        };
    };

    self.isISP = ko.computed(function () {        
        if (self.UsrCountry() == 7) {
            var labtests_check = $.grep(self.LabsResult(), function (v) {
                return v.Id === "97";
            });
            if (labtests_check.length >= 1 || $("#ITy").val() == "1" || $("#ITy").val() == "3")
                return true
            else
                return false;
        }
        else {
            return true
        };
    }, self);


    // Using a deep get method to find nested object properties
    self.objectSort = function (column) {

        self.players(self.players().sort(function (a, b) {

        var playerA = self.deepGet(a, column.property),
        playerB = self.deepGet(b, column.property);

        if (playerA < playerB) {
            return (column.state() === self.ascending) ? -1 : 1;
        }
        else if (playerA > playerB) {
            return (column.state() === self.ascending) ? 1 : -1;
        }
        else {
                return 0
         }
        }));
    };

    //self.addLabTest = function (sample_number, data) {
    //    var erroMsg = self.validatebeforeadd(1,2);
    //    if (erroMsg) {
    //        alert(erroMsg);
    //        return;
    //    }

    //    var labtest = new LabTest(sample_number);

    //    labtest.hideLabOptions = true;
       
    //    //console.log(labtest.displayLabOptions + " **** ");
    //    labtest.CaseLabID = self.Id;
    //    labtest.SampleNumber(sample_number);
    //    if (sample_number == 1) {
    //        self.LabTests.push(labtest);
    //    } else if (sample_number == 2) {
    //        self.LabTests_Sample2.push(labtest);
    //    } else if (sample_number == 3) {
    //        self.LabTests_Sample3.push(labtest);
    //    } else if (sample_number == 999) {
    //        self.LabTestsExternal.push(labtest);
    //    }         
    //};

    //self.removeLabTest = function (sample_number, data) {
    //    if (sample_number == 1) {
    //        self.LabTests.remove(data);
    //    } else if (sample_number == 2) {
    //        self.LabTests_Sample2.remove(data);
    //    } else if (sample_number == 3) {
    //        self.LabTests_Sample3.remove(data);
    //    } else if (sample_number == 999) {
    //        self.LabTestsExternal.remove(data);
    //    }

    //    self.OrdenFinalResult();
    //};


    self.ResetLab = function () {
        console.log("ResetLab->START");
        self.hasReset(true);
        self.Id = "";
        self.CanIFILab(false);
        self.CanPCRLab(false);

        self.RecDate_National(null);
        self.Identification_Test_National("");
        self.Processed_National("");
        self.TempSample_National("");
        self.NoProRen_National("");
        self.NoProRenId_National("");

        //self.RecDate(null);
        //self.Processed("");
        //self.TempSample1("");
        //self.NoProRen("");
        //self.NoProRenId("");
        
        self.RecDate2(null);
        self.Processed2("");
        self.TempSample2("");
        self.NoProRen2("");
        self.NoProRenId2("");
        
        self.RecDate3(null);
        self.Processed3("");
        self.TempSample3("");
        self.NoProRen3("");
        self.NoProRenId3("");

        //Agregar laboratorio intermedio
        self.Rec_Date_NPHL(null);
        self.Identification_Test_NPHL("");
        self.Temp_NPHL("");        
        self.Observation_NPHL("");        
        self.Ship_Date_NPHL(null);
        self.NPHL_NoProRen("");
        self.NPHL_NoProRenId("");
        self.NPHL_Processed("");

        self.Rec_Date_NPHL_2(null);
        self.Identification_Test_NPHL_2("");
        self.Temp_NPHL_2("");
        self.Observation_NPHL_2("");
        self.Ship_Date_NPHL_2(null);
        self.NPHL_NoProRen_2("");
        self.NPHL_NoProRenId_2("");
        self.NPHL_Processed_2("");

        self.Rec_Date_NPHL_3(null);
        self.Identification_Test_NPHL_3("");
        self.Temp_NPHL_3("");
        self.Observation_NPHL_3("");
        self.Ship_Date_NPHL_3(null);
        self.NPHL_NoProRen_3("");
        self.NPHL_NoProRenId_3("");
        self.NPHL_Processed_3("");

        self.EndLabDate(null);
        self.FResult("");
        self.Comments("");
        self.FinalResult("");
        self.FinalResultVirusTypeID("");
        self.FinalResultVirusSubTypeID("");
        self.FinalResultVirusLineageID("");
        self.FinalResult_2("");
        self.FinalResultVirusTypeID_2("");
        self.FinalResultVirusSubTypeID_2("");
        self.FinalResultVirusLineageID_2("");
        self.FinalResult_3("");
        self.FinalResultVirusTypeID_3("");
        self.FinalResultVirusSubTypeID_3("");
        self.FinalResultVirusLineageID_3("");

        self.GeneticGroup("");
        self.GeneticGroup_2("");
        self.GeneticGroup_3("");

        self.LabTests([]);
        self.LabTests_Sample2([]);
        self.LabTests_Sample3([]);
        self.LabsResult([]);
        self.LabsResultExternal([]);
        self.SubTypeByLabRes([]);

        console.log("ResetLab->END");
    };

    self.ResetLabFinalResult = function () {
        //console.log("ResetLabFinalResult");
        self.FinalResult("");
        self.FinalResultVirusTypeID("");
        self.FinalResultVirusSubTypeID("");
        self.FinalResultVirusLineageID("");
        self.FinalResult_2("");
        self.FinalResultVirusTypeID_2("");
        self.FinalResultVirusSubTypeID_2("");
        self.FinalResultVirusLineageID_2("");
        self.FinalResult_3("");
        self.FinalResultVirusTypeID_3("");
        self.FinalResultVirusSubTypeID_3("");
        self.FinalResultVirusLineageID_3("");
    };
    
    self.validate = function (nextStep) {
        console.log("LAB->LabViewModel->self.validate->START");

        var msg = "";
        self.CaseLabses().forEach(function (oCaseLab, indice, array) {
            if (oCaseLab.validate(nextStep, self) == false){
                msg += "\n" + oCaseLab.msgError;
            }               
        });

        var bResu = true;
        if (msg !== "")
        {
            //console.log("Error2->" + msg);
            alert(msgValidationTitleLab + msg);
            $('#tabs').tabs({ active: 4 });
            bResu = false;
        }

        console.log("LAB->LabViewModel->self.validate->END->ERROR?->" + bResu);
        return bResu;
    };
        
    //self.validatebeforeadd = function (nextStep, SaveVerif) {
    //    var msg = "";
    //    self.ArrayValidate((nextStep == 1) ? self.LabTests() : (nextStep == 2) ? self.LabTests_Sample2() : self.LabTests_Sample3());
    //    for (index = 0; index < self.ArrayValidate().length; ++index) {
    //        date_1 = self.ArrayValidate()[index].TestDate();
    //        date_2 = self.ArrayValidate()[index].TestEndDate();
    //        date_Received = self.RecDate();
    //        var date_test_start = new Date();
    //        var date_test_final = new Date();
    //        var date_RecDate = new Date();
    //        date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
    //        date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);
    //        date_RecDate = jQuery.type(date_Received) === 'date' ? date_Received : parseDate($("#RecDate").val(), date_format_);

    //        if (self.ArrayValidate()[index].ProcLab() === "" || typeof self.ArrayValidate()[index].ProcLab() === "undefined")
    //            msg += "\n" + msgValidateProcessSelectLab;
    //                //"'Laboratorio': Seleccione el laboratorio que procesa la prueba";

    //        if (self.ArrayValidate()[index].ProcessLab() === "")
    //            msg += "\n" + msgValidateProcessProcessLab;
    //                //"'Procesada': Indique si la prueba fue procesada";
 
    //        if (self.ArrayValidate()[index].ProcessLab() === "true") {

    //            if (date_RecDate != null && date_test_start != null && moment(date_test_start).isBefore(moment(date_RecDate), 'days'))
    //                msg += "\n" + msgValidateProcessStartReceiptDate;
    //                //'Process start date' can not be less than the 'Date of receipt of the sample'
    //                    //"'Fecha de inicio del proceso' no puede ser menor a la 'Fecha de recepcion de la muestra'";
    //            //return false;

    //            if (date_test_start === null)
    //                msg += "\n" + msgValidateProcessStartRequired;
    //                //Process start date is required
    //                //    "Fecha de inicio de proceso es requerida";
    //            if (date_test_start != null && !moment(moment(date_test_start).format(date_format_moment), [date_format_moment], true).isValid())
    //                msg += "\n" + msgValidateProcessStartInvalid;
    //                    //"Fecha de inicio de proceso es inválida";
    //            //if (date_RecDate != null && date_test_start != null && moment(date_test_start).isBefore(moment(date_RecDate), 'days'))
    //            //    msg += "\n" + "'Start date' cannot be less than the 'Received date'";

    //            if (date_test_final === null)
    //                msg += "\n" + msgValidateProcessEndDateRequired;
    //                    //"Fecha final del proceso es requerida";
    //            if (date_test_final != null && !moment(moment(date_test_final).format(date_format_moment), [date_format_moment], true).isValid())
    //                msg += "\n" + msgValidateProcessEndDateInvalid;
    //                    //"Fecha final del proceso es inválida";
    //            if (date_test_start != null && date_test_final != null
    //                && moment(date_test_start).isAfter(moment(date_test_final), 'days'))
    //                msg += "\n" + msgValidateProcessEndDateStartDate;
    //                    //'Process end date' can not be less than 'Process start date'
    //                    //"'Fecha final del proceso' no puede ser menor a la 'Fecha de inicio del proceso'";

    //            if (self.ArrayValidate()[index].TestType() === "")
    //                msg += "\n" + msgValidateProcessType;
    //                    //Insert the type of completed process
    //                    //"Indique el tipo de proceso realizado";

    //            if (self.ArrayValidate()[index].TestResultID() === "")
    //                msg += "\n" + msgValidateProcessResult;
    //                    //Insert the result of the process
    //                    //"Indique el resultado del proceso";

    //                    // revision para agregar los subtipos de Chile
    //            if (self.ArrayValidate()[index].TestResultID() === "P"
    //                && self.ArrayValidate()[index].VirusTypeID() === "1"
    //                && self.ArrayValidate()[index].TestType() === "2"
    //                && self.ArrayValidate()[index].TestResultID_VirusSubType() != "P"
    //                && self.ArrayValidate()[index].TestResultID_VirusSubType_2() != "P"
    //                && self.ArrayValidate()[index].UsrCountry() == 7) // Esta línea es porque esta validación es solo para Chile
    //                msg += "\n" + msgValidateProcessResult_Subtype;


    //            if ((self.ArrayValidate()[index].TestResultID() === "P" ) && (self.ArrayValidate()[index].VirusTypeID() === "" || self.ArrayValidate()[index].VirusTypeID() == undefined))
    //            {
    //                msg += "\n" + msgValidateProcessVirus;
    //                    //Insert the detected virus
    //                    //"Ingrese el virus detectado";
    //                    //|| self.ArrayValidate()[index].TestResultID() === "I"
    //            }
    //            else {
    //                if (self.ArrayValidate()[index].UsrCountry() == 7 && self.ArrayValidate()[index].CTVirusType() === "" && self.ArrayValidate()[index].VirusTypeID() != "" && self.ArrayValidate()[index].TestType() === "2")
    //                { msg += "\n" + "Ingreso el CT de Virus"; }
    //            }

    //            if ((self.ArrayValidate()[index].TestResultID() === "P" ) && self.ArrayValidate()[index].VirusTypeID() === "9" && (self.ArrayValidate()[index].OtherVirusTypeID() === "" || self.ArrayValidate()[index].OtherVirusTypeID() == undefined) && self.ArrayValidate()[index].OtherVirus() === "")
    //            {
    //                msg += "\n" + msgValidateProcessOtherVirus;
    //                  //  Insert the other detected virus
    //                //"Indique el otro virus detectado";
    //                //|| self.ArrayValidate()[index].TestResultID() === "I"
    //            }
    //            else {
    //                if (self.ArrayValidate()[index].UsrCountry() == 7 && self.ArrayValidate()[index].CTOtherVirusType() === "" && self.ArrayValidate()[index].VirusTypeID() === "9" && self.ArrayValidate()[index].TestType() === "2" && self.ArrayValidate()[index].OtherVirusTypeID() != "")
    //                { msg += "\n" + "Ingreso el CT de Otro Virus"; }
    //            }


    //            if (self.ArrayValidate()[index].TestResultID() === "P"
    //                && self.ArrayValidate()[index].VirusTypeID() === "1" 
    //                && (self.ArrayValidate()[index].VirusSubTypeID() === "" || self.ArrayValidate()[index].VirusSubTypeID() == undefined )
    //                && self.ArrayValidate()[index].TestType() === "2") 
    //            {
    //                //console.log("Aqui virusSubtiypeID");

    //                if (self.ArrayValidate()[index].UsrCountry() == 7) {

    //                    if  ((self.ArrayValidate()[index].VirusSubTypeID() === "" || self.ArrayValidate()[index].VirusSubTypeID() == undefined ) && (self.ArrayValidate()[index].VirusSubTypeID_2() === "" || self.ArrayValidate()[index].VirusSubTypeID_2() == undefined) )
    //                        msg += "\n" + msgValidateProcessSubtype;

    //                } else {
    //                    msg += "\n" + msgValidateProcessSubtype;
    //                }


    //                  //  Insert the detected Subtype
    //                  //"Ingrese el Subtipo detectado";
    //            }
    //            else {
    //                if ((self.ArrayValidate()[index].VirusSubTypeID() == 3 || self.ArrayValidate()[index].VirusSubTypeID() == 10) && self.ArrayValidate()[index].UsrCountry() == 7 && self.ArrayValidate()[index].CTSubType() === "" && self.ArrayValidate()[index].VirusSubTypeID() != "1" && self.ArrayValidate()[index].VirusTypeID() === "1" && self.ArrayValidate()[index].TestType() === "2")
    //                { msg += "\n" + "Ingreso el CT de Subtipo"; }
    //            }

    //            if (self.ArrayValidate()[index].LabID() == self.ISPID() || self.UsrCountry() != 7) {
    //                if (self.ArrayValidate()[index].TestResultID() === "P" && self.ArrayValidate()[index].VirusTypeID() === "2" && self.ArrayValidate()[index].VirusLineageID() === "" && self.ArrayValidate()[index].TestType() === "2")
    //                {
    //                    msg += "\n" + msgValidateProcessLinage;
    //                      //Insert the detected Linage
    //                      //"Ingrese el Linaje detectado";
    //                }
    //                else {
    //                    if ((self.ArrayValidate()[index].VirusLineageID() == 2 || self.ArrayValidate()[index].VirusLineageID() == 3) && self.ArrayValidate()[index].UsrCountry() == 7 && self.ArrayValidate()[index].CTLineage() === "" && self.ArrayValidate()[index].VirusTypeID() === "2" && self.ArrayValidate()[index].TestType() === "2")
    //                    { msg += "\n" + "Ingreso el CT de Linaje"; }
    //                }
    //            }
                

    //            if (self.ArrayValidate()[index].RNP() === "" && self.ArrayValidate()[index].TestType() === "2" && self.ArrayValidate()[index].UsrCountry() == 7)
    //            { msg += "\n" + "Ingrese el RNP"; }

    //        }
            
    //    };

    //    var ArrayValidate = $.grep(self.ArrayValidate(), function (v) {
    //        return (v.TestType() === "2" && v.ProcLab() == self.UsrInstID() && (v.LabID() == "" || v.LabID() == self.UsrInstID() ));
    //    });

    //    if (SaveVerif == 1 && ArrayValidate.length > 1)
    //        ArrayValidate.length = ArrayValidate.length - 1;

    //    if (ArrayValidate.length >= 4)
    //        msg += "\n" + msgValidateProcessPCR3times;
    //            //For PCR can not be more than 3 processes for the same laboratory
    //            //"Para PCR no puede ser mayor a 3 procesos para el mismo laboratorio";

    //    ArrayValidate = $.grep(self.ArrayValidate(), function (v) {
    //        return (v.TestType() === "1" && v.ProcLab() == self.UsrInstID());
    //    });
    //    if (ArrayValidate.length >= 4)
    //        msg += "\n" + msgValidateProcessIFI3times;
    //            //For IF it can not be more than 3 processes for the same laboratory
    //            //"Para IF no puede ser mayor a 3 procesos para el mismo laboratorio";
        
    //    return msg;
    //};

    //console.log("\tself.GetLab->Antes");
    self.GetLab = function (id) {
        self.Id = id;
        var labRecDate = [];            //**** NEW: 190926 // Fecha de recepcion x cada lab

        $.getJSON(app.dataModel.getLabUrl, { id: id }, function (data, status) {
            console.log("\tData recibida getJSON");
            console.log(data.CaseLabs);
            console.log(data.LabTests);
            console.log(data.LabTests.length);
            console.log("\tData recibida getJSON-END");

            self.UsrInstName(data.UsrInstName);         //#### CAFQ: NEW_FLOW
             
                // Laboratorio intermedio
                (data.Rec_Date_NPHL) ? self.Rec_Date_NPHL(moment(data.Rec_Date_NPHL).clone().toDate()) : self.Rec_Date_NPHL(null);
                self.Identification_Test_NPHL(data.Identification_Test_NPHL);
                self.Temp_NPHL(data.Temp_NPHL);
                self.Observation_NPHL(data.Observation_NPHL);
                self.NPHL_Processed((data.NPHL_Processed != null) ? data.NPHL_Processed.toString() : "");
                self.NPHL_NoProRenId(data.NPHL_NoProRenId);
                self.NPHL_NoProRen(data.NPHL_NoProRen);
                (data.Ship_Date_NPHL) ? self.Ship_Date_NPHL(moment(data.Ship_Date_NPHL).clone().toDate()) : self.Ship_Date_NPHL(null);

                (data.Rec_Date_NPHL_2) ? self.Rec_Date_NPHL_2(moment(data.Rec_Date_NPHL_2).clone().toDate()) : self.Rec_Date_NPHL_2(null);
                self.Identification_Test_NPHL_2(data.Identification_Test_NPHL_2);
                self.Temp_NPHL_2(data.Temp_NPHL_2);                
                self.Observation_NPHL_2(data.Observation_NPHL_2);
                self.NPHL_Processed_2((data.NPHL_Processed_2 != null) ? data.NPHL_Processed_2.toString() : "");
                self.NPHL_NoProRenId_2(data.NPHL_NoProRenId_2);
                self.NPHL_NoProRen_2(data.NPHL_NoProRen_2);
                (data.Ship_Date_NPHL_2) ? self.Ship_Date_NPHL_2(moment(data.Ship_Date_NPHL_2).clone().toDate()) : self.Ship_Date_NPHL_2(null);

                (data.Rec_Date_NPHL_3) ? self.Rec_Date_NPHL_3(moment(data.Rec_Date_NPHL_3).clone().toDate()) : self.Rec_Date_NPHL_3(null);
                self.Identification_Test_NPHL_3(data.Identification_Test_NPHL_3);
                self.Temp_NPHL_3(data.Temp_NPHL_3);
                self.Observation_NPHL_3(data.Observation_NPHL_3);
                self.NPHL_Processed_3((data.NPHL_Processed_3 != null) ? data.NPHL_Processed_3.toString() : "");
                self.NPHL_NoProRenId_3(data.NPHL_NoProRenId_3);
                self.NPHL_NoProRen_3(data.NPHL_NoProRen_3);
                (data.Ship_Date_NPHL_3) ? self.Ship_Date_NPHL_3(moment(data.Ship_Date_NPHL_3).clone().toDate()) : self.Ship_Date_NPHL_3(null);

                self.NPHL(data.InstFlow_NPHL);

                self.NPHL_FlowExist(data.ExistAnyInstitutionFlow_NPHL);
                    
                ////(data.RecDate) ? self.RecDate(moment(data.RecDate).clone().toDate()) : self.RecDate(null);
                ////self.Identification_Test(data.Identification_Test);
                ////self.Processed((data.Processed != null) ? data.Processed.toString() : "");
                ////self.NoProRen(data.NoProRen);
                ////self.NoProRenId(data.NoProRenId);
                ////self.TempSample1(data.TempSample1);
                //var recepDate = data.CaseLabs[0].RecDate;
                //(recepDate) ? self.RecDate(moment(recepDate).clone().toDate()) : self.RecDate(null);
                //self.Identification_Test(data.CaseLabs[0].Identification_Test);
                //self.Processed((data.CaseLabs[0].Processed != null) ? data.CaseLabs[0].Processed.toString() : "");
                //self.NoProRen(data.CaseLabs[0].NoProRen);
                //self.NoProRenId(data.CaseLabs[0].NoProRenId);
                //self.TempSample1(data.CaseLabs[0].TempSample);

                self.hasGet(true);
                //console.log(self.hasGet());

                (data.RecDate2) ? self.RecDate2(moment(data.RecDate2).clone().toDate()) : self.RecDate2(null);
                self.Identification_Test2(data.Identification_Test2);
                self.Processed2((data.Processed2 != null) ? data.Processed2.toString() : "");
                self.NoProRen2(data.NoProRen2);
                self.NoProRenId2(data.NoProRenId2);
                self.TempSample2(data.TempSample2);

                (data.RecDate3) ? self.RecDate3(moment(data.RecDate3).clone().toDate()) : self.RecDate3(null);
                self.Identification_Test3(data.Identification_Test3);
                self.Processed3((data.Processed3 != null) ? data.Processed3.toString() : "");
                self.NoProRen3(data.NoProRen3);
                self.NoProRenId3(data.NoProRenId3);
                self.TempSample3(data.TempSample3);

                (data.RecDate_National) ? self.RecDate_National(moment(data.RecDate_National).clone().toDate()) : self.RecDate_National(null);
                self.Identification_Test_National(data.Identification_Test_National);
                self.Processed_National((data.Processed_National != null) ? data.Processed_National.toString() : "");
                self.NoProRen_National(data.NoProRen_National);
                self.NoProRenId_National(data.NoProRenId_National);
                self.TempSample_National(data.TempSample_National);

                (data.EndLabDate) ? self.EndLabDate(moment(data.EndLabDate).clone().toDate()) : self.EndLabDate(null);
                self.FResult(data.FResult);
                self.Comments(data.Comments);
                self.FinalResult(data.FinalResult);
                self.FinalResultVirusTypeID(data.FinalResultVirusTypeID);
                self.FinalResultVirusSubTypeID(data.FinalResultVirusSubTypeID);
                self.FinalResultVirusLineageID(data.FinalResultVirusLineageID);
                self.FinalResult_2(data.FinalResult_2);
                self.FinalResultVirusTypeID_2(data.FinalResultVirusTypeID_2);
                self.FinalResultVirusSubTypeID_2(data.FinalResultVirusSubTypeID_2);
                self.FinalResultVirusLineageID_2(data.FinalResultVirusLineageID_2);
                self.FinalResult_3(data.FinalResult_3);
                self.FinalResultVirusTypeID_3(data.FinalResultVirusTypeID_3);
                self.FinalResultVirusSubTypeID_3(data.FinalResultVirusSubTypeID_3);
                self.FinalResultVirusLineageID_3(data.FinalResultVirusLineageID_3);
                
                self.GeneticGroup(data.GeneticGroup);
                self.GeneticGroup_2(data.GeneticGroup_2);
                self.GeneticGroup_3(data.GeneticGroup_3);
                
                // Comentariado porque el laboratorio no puede cerrar el caso
                //if (self.FinalResult() != "" ) {
                //    $("#CaseStatus").attr("disabled", false);
                //} else
                //{
                //    $("#CaseStatus").attr("disabled", true);
                //}
                self.LabsResult(data.LabsResult);
                self.SubTypeByLabRes(data.SubTypeByLabRes);
                self.CanConclude(data.CanConclude);
                app.Views.Home.CanConclude(data.CanConclude);
                app.Views.Home.SaveAndAdd_1(data.SaveAndAdd_1);
                app.Views.Home.SaveAndAdd_2(data.SaveAndAdd_2);
                app.Views.Home.SaveAndAdd_3(data.SaveAndAdd_3);
                //app.Views.Contact.flow_record(data.flow_record);
                //app.Views.Contact.flow_institution(data.flow_institution);
                //$("#o_S").val(data.DataStatement);
                self.CanIFILab(data.CanIFILab);
                self.CanPCRLab(data.CanPCRLab);

                self.ForeignLabCountry(data.ForeignLabCountry);
                self.ForeignLabLocal(data.ForeignLabLocal);
                self.flow_max_record(data.flow_max_record);
                //console.log("max_flow " + self.flow_max_record());
                //console.log("flow_institution " + app.Views.Contact.flow_institution());

                // Datos cabecera lab
                self.LabTestsEndFlow([]);
                self.CaseLabses([]);                    //**** NEW: 190926
                if (data.CaseLabs != "") {
                    //console.log("Nro cabeceras->" + data.CaseLabs.length.toString());
                    for (indexCL = 0; indexCL < data.CaseLabs.length; ++indexCL) {
                        var caselab = new CaseLab(1);                       // Crea un objeto de la clase CaseLabses, enviandole el parametro numero de muestra(1)

                        caselab.Id = data.CaseLabs[indexCL].Id;               // Llenando las propiedades
                        caselab.FlucaseID = data.CaseLabs[indexCL].FlucaseID;

                        var labId = data.CaseLabs[indexCL].LabID;
                        caselab.LabID(labId);           // //caselab.LabID(data.CaseLabs[index].LabID);
                        caselab.ProcLab(data.CaseLabs[indexCL].ProcLab);               //#### x ELIMINAR                                    
                        caselab.ProcLabName(data.CaseLabs[indexCL].ProcLabName);       //#### x ELIMINAR 

                        caselab.CanEdit(data.CaseLabs[indexCL].CanEdit);

                        if (data.CaseLabs[indexCL].RecDate) {
                            var fech = moment(data.CaseLabs[indexCL].RecDate).clone().toDate()
                            //caselab.RecDate12(moment(data.CaseLabs[index].RecDate).clone().toDate());
                            caselab.RecDate(fech);
                            //labRecDate.push({ labId: labId, dateRec: fech });
                        }
                        caselab.Identification_Test(data.CaseLabs[indexCL].Identification_Test);
                        caselab.Processed((data.CaseLabs[indexCL].Processed != null) ? data.CaseLabs[indexCL].Processed.toString() : "");
                        caselab.TempSample(data.CaseLabs[indexCL].TempSample);
                        caselab.NoProRenId(data.CaseLabs[indexCL].NoProRenId);
                        caselab.NoProRen(data.CaseLabs[indexCL].NoProRen);

                        //****************
                        caselab.LabTests([]);
                        if (data.LabTests != "") {
                            for (index = 0; index < data.LabTests.length; ++index) {
                                if (data.LabTests[index].ProcLab.toString() == labId) {
                                    var labtest = new LabTest(1, caselab);

                                    labtest.Id = data.LabTests[index].Id;
                                    //labtest.RecDate(caselab.RecDate);                   //**** NEW: 190926
                                    labtest.CaseLabID = self.Id;
                                    labtest.CanEdit(data.LabTests[index].CanEdit);
                                    labtest.CanModLab(data.LabTests[index].CanModLab);
                                    labtest.CanDeleteProcess(data.LabTests[index].CanDeleteProcess);
                                    //console.log(data.LabTests[index].CanEdit);
                                    labtest.CanPCR((typeof data.LabTests[index].CanPCR === "undefined") ? false : data.LabTests[index].CanPCR);
                                    labtest.CanIFI((typeof data.LabTests[index].CanIFI === "undefined") ? false : data.LabTests[index].CanIFI);
                                    labtest.EndFlow(data.LabTests[index].EndFlow);

                                    labtest.LabID(data.LabTests[index].ProcLab.toString());
                                    labtest.ProcLab(data.LabTests[index].ProcLab.toString());               //#### x ELIMINAR                                    
                                    labtest.ProcLabName(data.LabTests[index].ProcLabName.toString());       //#### x ELIMINAR 
                                    //console.log("\td1");
                                    //console.log(data.LabTests[index].ProcLab.toString());
                                    //console.log(data.LabTests[index].ProcLabName.toString());
                                    ////console.log(labtest.ProcLabName());
                                    //console.log("\td2");
                                    labtest.ProcessLab(data.LabTests[index].ProcessLab.toString());
                                    labtest.TestType(data.LabTests[index].TestType);
                                    labtest.SampleNumber(1);
                                    if (data.LabTests[index].TestDate)
                                        labtest.TestDate(moment(data.LabTests[index].TestDate).clone().toDate());
                                    labtest.TestResultID((app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N' && data.LabTests[index].VirusTypeID == 1) ? 'NA' : (app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N' && data.LabTests[index].VirusTypeID == 2) ? 'NB' : data.LabTests[index].TestResultID);
                                    labtest.VirusTypeID((app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N') ? null : data.LabTests[index].VirusTypeID);
                                    //console.log(labtest.TestResultID());
                                    labtest.CTVirusType(data.LabTests[index].CTVirusType);
                                    labtest.CTRLVirusType(data.LabTests[index].CTRLVirusType);
                                    labtest.OtherVirusTypeID(data.LabTests[index].OtherVirusTypeID);
                                    labtest.CTOtherVirusType(data.LabTests[index].CTOtherVirusType);
                                    labtest.CTRLOtherVirusType(data.LabTests[index].CTRLOtherVirusType);
                                    labtest.OtherVirus(data.LabTests[index].OtherVirus);
                                    labtest.InfA(data.LabTests[index].InfA);
                                    labtest.VirusSubTypeID(data.LabTests[index].VirusSubTypeID);
                                    //console.log(data.LabTests[index].CTSubType);
                                    labtest.CTSubType(data.LabTests[index].CTSubType);
                                    labtest.CTRLSubType(data.LabTests[index].CTRLSubType);
                                    labtest.TestResultID_VirusSubType(data.LabTests[index].TestResultID_VirusSubType);
                                    labtest.VirusSubTypeID_2(data.LabTests[index].VirusSubTypeID_2);
                                    labtest.CTSubType_2(data.LabTests[index].CTSubType_2);
                                    labtest.CTRLSubType_2(data.LabTests[index].CTRLSubType_2);
                                    labtest.TestResultID_VirusSubType_2(data.LabTests[index].TestResultID_VirusSubType_2);
                                    labtest.InfB(data.LabTests[index].InfB);
                                    labtest.VirusLineageID(data.LabTests[index].VirusLineageID);
                                    labtest.CTLineage(data.LabTests[index].CTLineage);
                                    labtest.CTRLLineage(data.LabTests[index].CTRLLineage);
                                    labtest.ParaInfI(data.LabTests[index].ParaInfI);
                                    labtest.ParaInfII(data.LabTests[index].ParaInfII);
                                    labtest.ParaInfIII(data.LabTests[index].ParaInfIII);
                                    labtest.RSV(data.LabTests[index].RSV);
                                    labtest.Adenovirus(data.LabTests[index].Adenovirus);
                                    labtest.Metapneumovirus(data.LabTests[index].Metapneumovirus);
                                    labtest.RNP(data.LabTests[index].RNP);
                                    labtest.CTRLRNP(data.LabTests[index].CTRLRNP);
                                    labtest.CTRLNegative(data.LabTests[index].CTRLNegative);
                                    if (data.LabTests[index].TestEndDate)
                                        labtest.TestEndDate(moment(data.LabTests[index].TestEndDate).clone().toDate());

                                    //****
                                    //labTestsX.push(labtest);
                                    caselab.LabTests.push(labtest);
                                    self.LabTestsEndFlow.push(labtest);
                                    //console.log("Se hizo push en array->CaseLabs.LabTests");
                                }
                            }// END for
                        }
                        //console.log("E1");
                        ////console.log(self.UsrInstName());
                        ////console.log(caselab.LabTests());
                        //console.log(caselab.LabTests()[0].ProcLabName());
                        ////console.log(caselab.LabTests()[0].ProcLab());
                        //console.log(caselab.LabTests()[0].ProcessLab());
                        //console.log(caselab.LabTests()[1].ProcLabName());
                        ////console.log(caselab.LabTests()[1].ProcLab());
                        //console.log(caselab.LabTests()[1].ProcessLab());
                        //console.log("E1a");
                        //****************
                        self.CaseLabses.push(caselab);
                    }
                }
                else
                {
                    console.log("Sin test->START");
                    var caselab = new CaseLab(1);

                    caselab.FlucaseID = self.Id;
                    
                    console.log(data.LabsResult);
                    var labId = data.LabsResult[0].Id;
                    //caselab.LabID(data.CaseLabs[index].LabID);
                    caselab.LabID(labId);
                    caselab.CanEdit(true);
                    //console.log("p2a");
                    self.CaseLabses.push(caselab);
                    //console.log("Se hizo push en array cuando no llegaron datos->CaseLabses");
                    console.log("Sin test->END");
                }
                console.log("Array de objetos CaseLabses y LabTests->1S");
                console.log(self.CaseLabses());                             // Array de cabeceras
                console.log(self.CaseLabses()[0]); 
                console.log(self.CaseLabses()[0].LabTests());             // Array de test de la cabecera 1
                //console.log(self.CaseLabses()[0].Identification_Test());
                //console.log(self.CaseLabses()[0].Processed());
                //console.log(self.CaseLabses()[1].LabTests());             // Array de test de la cabecera 2
                //console.log(self.CaseLabses()[1].Identification_Test());
                //console.log(self.CaseLabses()[1].Processed());
                console.log("Array de objetos CaseLabses y LabTests->1E");

                //self.LabTestsEndFlow([]);
                //if (data.LabTests != "") {
                //    for (index = 0; index < data.LabTests.length; ++index) {
                //        var labtestEF = new LabTest(1);

                //        labtestEF.Id = data.LabTests[index].Id;
                //        labtestEF.CaseLabID = self.Id;
                //        labtestEF.CanEdit(data.LabTests[index].CanEdit);
                //        labtestEF.CanPCR((typeof data.LabTests[index].CanPCR === "undefined") ? false : data.LabTests[index].CanPCR);
                //        labtestEF.CanIFI((typeof data.LabTests[index].CanIFI === "undefined") ? false : data.LabTests[index].CanIFI);
                //        labtestEF.EndFlow(data.LabTests[index].EndFlow);
                //        labtestEF.ProcLab(data.LabTests[index].ProcLab.toString());
                //        labtestEF.LabID(data.LabTests[index].ProcLab.toString());
                //        labtestEF.ProcLabName(data.LabTests[index].ProcLabName.toString());

                //        self.LabTestsEndFlow.push(labtestEF);
                //    }
                //}
                //self.LabTests([]);
                //if (data.LabTests != "") {
                //    //console.log("Antes de crear objetos labtest->START");
                //    for (index = 0; index < data.LabTests.length; ++index) {
                //        //**** NEW: 190926
                //        procLab = data.LabTests[index].ProcLab;
                //        resultado = $.grep(labRecDate, function (e) { return e.labId == procLab; });
                //        //console.log("p4a");
                //        //self.RecDate12(resultado[0].dateRec);
                //        //console.log("p4b");
                        
                //        //**** NEW: 190926 END

                //        var labtest = new LabTest(1);
                //        labtest.Id = data.LabTests[index].Id;
                //        ///////labtest.RecDate = resultado[0].dateRec;                   //**** NEW: 190926
                //        labtest.CaseLabID = self.Id;
                //        labtest.CanEdit(data.LabTests[index].CanEdit);
                //        labtest.CanModLab(data.LabTests[index].CanModLab);
				//		labtest.CanDeleteProcess(data.LabTests[index].CanDeleteProcess);																
                //        //console.log(data.LabTests[index].CanEdit);
                //        labtest.CanPCR((typeof data.LabTests[index].CanPCR === "undefined" ) ? false : data.LabTests[index].CanPCR );
                //        labtest.CanIFI((typeof data.LabTests[index].CanIFI === "undefined") ? false : data.LabTests[index].CanIFI);
                //        labtest.EndFlow(data.LabTests[index].EndFlow);
                //        labtest.ProcLab(data.LabTests[index].ProcLab.toString());
                //        labtest.LabID(data.LabTests[index].ProcLab.toString());
                //        labtest.ProcLabName(data.LabTests[index].ProcLabName.toString());
                //        console.log("\td1");
                //        console.log(data.LabTests[index].ProcLabName.toString());
                //        console.log(labtest.ProcLabName());
                //        console.log("\td2");
                //        labtest.ProcessLab(data.LabTests[index].ProcessLab.toString());
                //        labtest.TestType(data.LabTests[index].TestType);
                //        labtest.SampleNumber(1);
                //        if (data.LabTests[index].TestDate)
                //            labtest.TestDate(moment(data.LabTests[index].TestDate).clone().toDate());
                //        labtest.TestResultID((app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N' && data.LabTests[index].VirusTypeID == 1) ? 'NA' : (app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N' && data.LabTests[index].VirusTypeID == 2) ? 'NB' : data.LabTests[index].TestResultID);
                //        labtest.VirusTypeID((app.Views.Home.UsrCountry() == 7 && data.LabTests[index].TestType == 1 && data.LabTests[index].TestResultID == 'N') ? null : data.LabTests[index].VirusTypeID);
                //        console.log(labtest.TestResultID());
                //        labtest.CTVirusType(data.LabTests[index].CTVirusType);
                //        labtest.CTRLVirusType(data.LabTests[index].CTRLVirusType);
                //        labtest.OtherVirusTypeID(data.LabTests[index].OtherVirusTypeID);
                //        labtest.CTOtherVirusType(data.LabTests[index].CTOtherVirusType);
                //        labtest.CTRLOtherVirusType(data.LabTests[index].CTRLOtherVirusType);
                //        labtest.OtherVirus(data.LabTests[index].OtherVirus);
                //        labtest.InfA(data.LabTests[index].InfA);
                //        labtest.VirusSubTypeID(data.LabTests[index].VirusSubTypeID);
                //        //console.log(data.LabTests[index].CTSubType);
                //        labtest.CTSubType(data.LabTests[index].CTSubType);
                //        labtest.CTRLSubType(data.LabTests[index].CTRLSubType);
                //        labtest.TestResultID_VirusSubType(data.LabTests[index].TestResultID_VirusSubType);
                //        labtest.VirusSubTypeID_2(data.LabTests[index].VirusSubTypeID_2);
                //        labtest.CTSubType_2(data.LabTests[index].CTSubType_2);
                //        labtest.CTRLSubType_2(data.LabTests[index].CTRLSubType_2);
                //        labtest.TestResultID_VirusSubType_2(data.LabTests[index].TestResultID_VirusSubType_2);
                //        labtest.InfB(data.LabTests[index].InfB);
                //        labtest.VirusLineageID(data.LabTests[index].VirusLineageID);
                //        labtest.CTLineage(data.LabTests[index].CTLineage);
                //        labtest.CTRLLineage(data.LabTests[index].CTRLLineage);
                //        labtest.ParaInfI(data.LabTests[index].ParaInfI);
                //        labtest.ParaInfII(data.LabTests[index].ParaInfII);
                //        labtest.ParaInfIII(data.LabTests[index].ParaInfIII);
                //        labtest.RSV(data.LabTests[index].RSV);
                //        labtest.Adenovirus(data.LabTests[index].Adenovirus);
                //        labtest.Metapneumovirus(data.LabTests[index].Metapneumovirus);
                //        labtest.RNP(data.LabTests[index].RNP);
                //        labtest.CTRLRNP(data.LabTests[index].CTRLRNP);
                //        labtest.CTRLNegative(data.LabTests[index].CTRLNegative);
                //        if (data.LabTests[index].TestEndDate)
                //            labtest.TestEndDate(moment(data.LabTests[index].TestEndDate).clone().toDate());

                //        self.LabTests.push(labtest);
                //        console.log("Se hizo push en array->LabTests");
                //    }
                //    //console.log("Antes de crear objetos labtest->END");
                //}
                //console.log("Array de objetos LabTest->1");
                //console.log(self.LabTests());
                //console.log("Array de objetos LabTest->1a");

                //self.LabTests_Sample2([]);
                //if (data.LabTests_Sample2 != "") {
                //    for (index = 0; index < data.LabTests_Sample2.length; ++index) {
                //        var labtest_s2 = new LabTest(2);
                //        labtest_s2.Id = data.LabTests_Sample2[index].Id;
                //        labtest_s2.CaseLabID = self.Id;
                //        labtest_s2.CanEdit(data.LabTests_Sample2[index].CanEdit);
                //        labtest_s2.CanModLab(data.LabTests_Sample2[index].CanModLab);
				//		labtest_s2.CanDeleteProcess(data.LabTests_Sample2[index].CanDeleteProcess);																		   
                //        labtest_s2.CanPCR((typeof data.LabTests_Sample2[index].CanPCR === "undefined") ? false : data.LabTests_Sample2[index].CanPCR);
                //        labtest_s2.CanIFI((typeof data.LabTests_Sample2[index].CanIFI === "undefined") ? false : data.LabTests_Sample2[index].CanIFI);
                //        labtest_s2.ProcLab(data.LabTests_Sample2[index].ProcLab.toString());
                //        //console.log("--ProcLab Sample2 -- " + labtest.ProcLab());
                //        labtest_s2.LabID(data.LabTests_Sample2[index].ProcLab.toString());
                //        labtest_s2.ProcLabName(data.LabTests_Sample2[index].ProcLabName.toString());
                //        labtest_s2.ProcessLab(data.LabTests_Sample2[index].ProcessLab.toString());
                //        labtest_s2.TestType(data.LabTests_Sample2[index].TestType);
                //        labtest_s2.SampleNumber(2);
                //        if (data.LabTests_Sample2[index].TestDate)
                //            labtest_s2.TestDate(moment(data.LabTests_Sample2[index].TestDate).clone().toDate());
                //        //labtest_s2.TestResultID(data.LabTests_Sample2[index].TestResultID);
                //        //labtest_s2.VirusTypeID(data.LabTests_Sample2[index].VirusTypeID);
                //        labtest_s2.TestResultID((app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample2[index].TestType == 1 && data.LabTests_Sample2[index].TestResultID == 'N' && data.LabTests_Sample2[index].VirusTypeID == 1) ? 'NA' : (app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample2[index].TestType == 1 && data.LabTests_Sample2[index].TestResultID == 'N' && data.LabTests_Sample2[index].VirusTypeID == 2) ? 'NB' : data.LabTests_Sample2[index].TestResultID);
                //        labtest_s2.VirusTypeID((app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample2[index].TestType == 1 && data.LabTests_Sample2[index].TestResultID == 'N') ? null : data.LabTests_Sample2[index].VirusTypeID);
                //        labtest_s2.CTVirusType(data.LabTests_Sample2[index].CTVirusType);
                //        labtest_s2.CTRLVirusType(data.LabTests_Sample2[index].CTRLVirusType);
                //        labtest_s2.OtherVirusTypeID(data.LabTests_Sample2[index].OtherVirusTypeID);
                //        labtest_s2.CTOtherVirusType(data.LabTests_Sample2[index].CTOtherVirusType);
                //        labtest_s2.CTRLOtherVirusType(data.LabTests_Sample2[index].CTRLOtherVirusType);
                //        labtest_s2.OtherVirus(data.LabTests_Sample2[index].OtherVirus);
                //        labtest_s2.InfA(data.LabTests_Sample2[index].InfA);
                //        labtest_s2.VirusSubTypeID(data.LabTests_Sample2[index].VirusSubTypeID);
                //        labtest_s2.CTSubType(data.LabTests_Sample2[index].CTSubType);
                //        labtest_s2.CTRLSubType(data.LabTests_Sample2[index].CTRLSubType);
                //        labtest_s2.InfB(data.LabTests_Sample2[index].InfB);
                //        labtest_s2.VirusLineageID(data.LabTests_Sample2[index].VirusLineageID);
                //        labtest_s2.CTLineage(data.LabTests_Sample2[index].CTLineage);
                //        labtest_s2.CTRLLineage(data.LabTests_Sample2[index].CTRLLineage);
                //        labtest_s2.ParaInfI(data.LabTests_Sample2[index].ParaInfI);
                //        labtest_s2.ParaInfII(data.LabTests_Sample2[index].ParaInfII);
                //        labtest_s2.ParaInfIII(data.LabTests_Sample2[index].ParaInfIII);
                //        labtest_s2.RSV(data.LabTests_Sample2[index].RSV);
                //        labtest_s2.Adenovirus(data.LabTests_Sample2[index].Adenovirus);
                //        labtest_s2.Metapneumovirus(data.LabTests_Sample2[index].Metapneumovirus);
                //        labtest_s2.RNP(data.LabTests_Sample2[index].RNP);
                //        labtest_s2.CTRLRNP(data.LabTests_Sample2[index].CTRLRNP);
                //        labtest_s2.CTRLNegative(data.LabTests_Sample2[index].CTRLNegative);
                //        if (data.LabTests_Sample2[index].TestEndDate)
                //            labtest_s2.TestEndDate(moment(data.LabTests_Sample2[index].TestEndDate).clone().toDate());
                //        self.LabTests_Sample2.push(labtest_s2);
                //    }
                //}

                //self.LabTests_Sample3([]);
                //if (data.LabTests_Sample3 != "") {
                //    for (index = 0; index < data.LabTests_Sample3.length; ++index) {
                //        var labtest_s3 = new LabTest(3);
                //        labtest_s3.Id = data.LabTests_Sample3[index].Id;
                //        labtest_s3.CaseLabID = self.Id;
                //        labtest_s3.CanEdit(data.LabTests_Sample3[index].CanEdit);
                //        labtest_s3.CanModLab(data.LabTests_Sample3[index].CanModLab);
				//		labtest_s3.CanDeleteProcess(data.LabTests_Sample3[index].CanDeleteProcess);																		   
                //        labtest_s3.CanPCR((typeof data.LabTests_Sample3[index].CanPCR === "undefined") ? false : data.LabTests_Sample3[index].CanPCR);
                //        labtest_s3.CanIFI((typeof data.LabTests_Sample3[index].CanIFI === "undefined") ? false : data.LabTests_Sample3[index].CanIFI);
                //        labtest_s3.ProcLab(data.LabTests_Sample3[index].ProcLab.toString());
                //        //console.log("--ProcLab Sample3 -- " + labtest.ProcLab());
                //        labtest_s3.LabID(data.LabTests_Sample3[index].ProcLab.toString());
                //        labtest_s3.ProcLabName(data.LabTests_Sample3[index].ProcLabName.toString());
                //        labtest_s3.ProcessLab(data.LabTests_Sample3[index].ProcessLab.toString());
                //        labtest_s3.TestType(data.LabTests_Sample3[index].TestType);
                //        labtest_s3.SampleNumber(3);
                //        if (data.LabTests_Sample3[index].TestDate)
                //            labtest_s3.TestDate(moment(data.LabTests_Sample3[index].TestDate).clone().toDate());
                //        //labtest_s3.TestResultID(data.LabTests_Sample3[index].TestResultID);
                //        //labtest_s3.VirusTypeID(data.LabTests_Sample3[index].VirusTypeID);
                //        labtest_s3.TestResultID((app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample3[index].TestType == 1 && data.LabTests_Sample3[index].TestResultID == 'N' && data.LabTests_Sample3[index].VirusTypeID == 1) ? 'NA' : (app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample3[index].TestType == 1 && data.LabTests_Sample3[index].TestResultID == 'N' && data.LabTests_Sample3[index].VirusTypeID == 2) ? 'NB' : data.LabTests_Sample3[index].TestResultID);
                //        labtest_s3.VirusTypeID((app.Views.Home.UsrCountry() == 7 && data.LabTests_Sample3[index].TestType == 1 && data.LabTests_Sample3[index].TestResultID == 'N') ? null : data.LabTests_Sample3[index].VirusTypeID);
                //        labtest_s3.CTVirusType(data.LabTests_Sample3[index].CTVirusType);
                //        labtest_s3.CTRLVirusType(data.LabTests_Sample3[index].CTRLVirusType);
                //        labtest_s3.OtherVirusTypeID(data.LabTests_Sample3[index].OtherVirusTypeID);
                //        labtest_s3.CTOtherVirusType(data.LabTests_Sample3[index].CTOtherVirusType);
                //        labtest_s3.CTRLOtherVirusType(data.LabTests_Sample3[index].CTRLOtherVirusType);
                //        labtest_s2.OtherVirus(data.LabTests_Sample3[index].OtherVirus);
                //        labtest_s3.InfA(data.LabTests_Sample3[index].InfA);
                //        labtest_s3.VirusSubTypeID(data.LabTests_Sample3[index].VirusSubTypeID);
                //        labtest_s3.CTSubType(data.LabTests_Sample3[index].CTSubType);
                //        labtest_s3.CTRLSubType(data.LabTests_Sample3[index].CTRLSubType);
                //        labtest_s3.InfB(data.LabTests_Sample3[index].InfB);
                //        labtest_s3.VirusLineageID(data.LabTests_Sample3[index].VirusLineageID);
                //        labtest_s3.CTLineage(data.LabTests_Sample3[index].CTLineage);
                //        labtest_s3.CTRLLineage(data.LabTests_Sample3[index].CTRLLineage);
                //        labtest_s3.ParaInfI(data.LabTests_Sample3[index].ParaInfI);
                //        labtest_s3.ParaInfII(data.LabTests_Sample3[index].ParaInfII);
                //        labtest_s3.ParaInfIII(data.LabTests_Sample3[index].ParaInfIII);
                //        labtest_s3.RSV(data.LabTests_Sample3[index].RSV);
                //        labtest_s3.Adenovirus(data.LabTests_Sample3[index].Adenovirus);
                //        labtest_s3.Metapneumovirus(data.LabTests_Sample3[index].Metapneumovirus);
                //        labtest_s3.RNP(data.LabTests_Sample3[index].RNP);
                //        labtest_s3.CTRLRNP(data.LabTests_Sample3[index].CTRLRNP);
                //        labtest_s3.CTRLNegative(data.LabTests_Sample3[index].CTRLNegative);
                //        if (data.LabTests_Sample3[index].TestEndDate)
                //            labtest_s3.TestEndDate(moment(data.LabTests_Sample3[index].TestEndDate).clone().toDate());
                //        self.LabTests_Sample3.push(labtest_s3);
                //    }
                //}

                //console.log("Data para foreach-START");
                //console.log(self.CaseLabses());
                ////console.log(self.LabTests());
                //console.log("Data para foreach-END");

                $("#FinalResult").prop('disabled', true);
                $("#FinalResultVirusTypeID").prop('disabled', true);
                $("#FinalResultVirusSubTypeID_1").prop('disabled', true);
                $("#FinalResultVirusLineageID").prop('disabled', true);
                $("#FinalResult_2").prop('disabled', true);
                $("#FinalResultVirusTypeID_2").prop('disabled', true);
                $("#FinalResultVirusSubTypeID_2").prop('disabled', true);
                $("#FinalResultVirusLineageID_2").prop('disabled', true);
                $("#FinalResult_3").prop('disabled', true);
                $("#FinalResultVirusTypeID_3").prop('disabled', true);
                $("#FinalResultVirusSubTypeID_3").prop('disabled', true);
                $("#FinalResultVirusLineageID_3").prop('disabled', true);

                if (self.ForeignLabCountry() == true) {

                }

                if (self.NPHL() == true)
                {
                    $("#Rec_Date_NPHL").prop('disabled', false);                    
                    $("#Temp_NPHL").prop('disabled', false);
                    $("#Identification_Test_NPHL").prop('disabled', false);
                    $("#Ship_Date_NPHL").prop('disabled', false);                    
                    $("#Observation_NPHL").prop('disabled', false);
                    $("input[id*='NPHL_Processed']").prop('disabled', false);
                    $("#NPHL_NoProRenId").prop('disabled', false);
                    $("#NPHL_NoReason").prop('disabled', false);

                    $("#Rec_Date_NPHL_2").prop('disabled', false);
                    $("#Temp_NPHL_2").prop('disabled', false);
                    $("#Identification_Test_NPHL_2").prop('disabled', false);
                    $("#Ship_Date_NPHL_2").prop('disabled', false);
                    $("#Observation_NPHL_2").prop('disabled', false);
                    $("input[id*='NPHL_Processed_2']").prop('disabled', false);
                    $("#NPHL_NoProRenId_2").prop('disabled', false);
                    $("#NPHL_NoReason_2").prop('disabled', false);

                    $("#Rec_Date_NPHL_3").prop('disabled', false);
                    $("#Temp_NPHL_3").prop('disabled', false);
                    $("#Identification_Test_NPHL_3").prop('disabled', false);
                    $("#Ship_Date_NPHL_3").prop('disabled', false);
                    $("#Observation_NPHL_3").prop('disabled', false);
                    $("input[id*='NPHL_Processed_3']").prop('disabled', false);
                    $("#NPHL_NoProRenId_3").prop('disabled', false);
                    $("#NPHL_NoReason_3").prop('disabled', false);
                } else
                {
                    $("#Rec_Date_NPHL").prop('disabled', true);                    
                    $("#Temp_NPHL").prop('disabled', true);
                    $("#Identification_Test_NPHL").prop('disabled', true);
                    $("#Ship_Date_NPHL").prop('disabled', true);
                    $("#Observation_NPHL").prop('disabled', true);
                    $("input[id*='NPHL_Processed']").prop('disabled', true);
                    $("#NPHL_NoProRenId").prop('disabled', true);
                    $("#NPHL_NoReason").prop('disabled', true);

                    $("#Rec_Date_NPHL_2").prop('disabled', true);
                    $("#Temp_NPHL_2").prop('disabled', true);     
                    $("#Identification_Test_NPHL_2").prop('disabled', true);
                    $("#Ship_Date_NPHL_2").prop('disabled', true);                    
                    $("#Observation_NPHL_2").prop('disabled', true);
                    $("input[id*='NPHL_Processed_2']").prop('disabled', true);
                    $("#NPHL_NoProRenId_2").prop('disabled', true);
                    $("#NPHL_NoReason_2").prop('disabled', true);

                    $("#Rec_Date_NPHL_3").prop('disabled', true);
                    $("#Temp_NPHL_3").prop('disabled', true);
                    $("#Identification_Test_NPHL_3").prop('disabled', true);
                    $("#Ship_Date_NPHL_3").prop('disabled', true);
                    $("#Observation_NPHL_3").prop('disabled', true);
                    $("input[id*='NPHL_Processed_3']").prop('disabled', true);
                    $("#NPHL_NoProRenId_3").prop('disabled', true);
                    $("#NPHL_NoReason_3").prop('disabled', true);
                    
                }

                self.hasGet(false);
                //console.log("hasGetGeneral");
                //console.log(self.hasGet());
                //self.OrdenFinalResult();  // Esta línea es para probar si el orden estsa funcionando 
                if (self.FinalResult() == "") {
                    self.OrdenFinalResult();
                };

            })
             .fail(function (jqXHR, textStatus, errorThrown) {
                 alert(errorThrown);
             })
    };
    //console.log("\tself.GetLab->Final");

    self.OrdenFinalResult = function () {
        console.log("LAB->P->OrdenFinalResult->START");

        if (self.hasGet() == false) {
            console.log("LAB->P->OFR 1");

            // Declare variable Array Dummy  -- Nueva versión de ordenamiento
            self.OrderDummyIFINegative = ko.observableArray([]);
            self.OrderDummyINFA = ko.observableArray([]);
            self.OrderDummyINFB = ko.observableArray([]);
            self.OrderDummyVRS = ko.observableArray([]);
            self.OrderDummyOtherVirus = ko.observableArray([]);
            
            self.OnlyIFINegative = ko.observableArray([]);
            self.OnlyINFA = ko.observableArray([]);
            self.OnlyINFB = ko.observableArray([]);
            self.OnlyVRS = ko.observableArray([]);
            self.OnlyOtherVirus = ko.observableArray([]);
            self.OrderIFINegative = ko.observableArray([]);
            self.OrderINFA = ko.observableArray([]);
            self.OrderINFB = ko.observableArray([]);
            self.OrderVRS = ko.observableArray([]);
            self.OrderOtherVirus = ko.observableArray([]);
            // Termina nueva forma de ordenar
            self.OrderArrayFinalResult([]);
            self.OrderDummy([]);
            //self.OrderDummy_existvirus([]);
            // Nueva forma de ordenar los Arrays inicializados
            self.OrderDummyINFA([]);
            self.OrderDummyINFB([]);
            self.OrderDummyVRS([]);
            self.OrderDummyOtherVirus([]);
            //self.resetFinalResult();
            self.OnlyIFINegative([]);
            self.OnlyINFA([]);
            self.OnlyINFB([]);
            self.OnlyVRS([]);
            self.OnlyOtherVirus([]);
            self.OrderINFA([]);
            self.OrderINFB([]);
            self.OrderVRS([]);
            self.OrderOtherVirus([]);
            self.OrderIFINegative([]);
            // termina nueva forma de ordenar

            self.resetFinalResult();                    // Limpia campos resultado final
            //console.log("Salida forzada");
            //return true
            //console.log("f1a1");
            //////self.OrderArrayFinalResult(self.LabTests().concat(self.LabTests_Sample2()).concat(self.LabTests_Sample3()));
            ////console.log(self.CaseLabses);
            //console.log(self.CaseLabses());                             // Array de Head
            //console.log(self.CaseLabses().length);
            ////console.log(self.CaseLabses().LabTests);                    // undefined
            ////console.log(self.CaseLabses()[0].LabTests);                 // Expresion de string
            //console.log(self.CaseLabses()[0].LabTests());               // Array de test
            //console.log(self.CaseLabses()[0].LabTests().length);
            for (n = 0; n < self.CaseLabses().length; n++){
                //self.OrderArrayFinalResult(self.CaseLabses()[n].LabTests().concat(self.CaseLabses()[n].LabTests_Sample2()).concat(self.CaseLabses()[n].LabTests_Sample3()));
                //self.OrderArrayFinalResult().concat(self.CaseLabses()[n].LabTests()).concat(self.CaseLabses()[n].LabTests_Sample2()).concat(self.CaseLabses()[n].LabTests_Sample3());
                self.OrderArrayFinalResult(self.OrderArrayFinalResult().concat(self.CaseLabses()[n].LabTests()).concat(self.CaseLabses()[n].LabTests_Sample2()).concat(self.CaseLabses()[n].LabTests_Sample3()));
            }
            console.log("f1a2");
            console.log(self.OrderArrayFinalResult());
            console.log("f1a3");
            //self.OrderArrayFinalResult(self.CaseLabses().LabTests.concat(self.CaseLabses().LabTests_Sample2).concat(self.CaseLabses().LabTests_Sample3));
            //console.log(self.OrderArrayFinalResult);
            //console.log(self.OrderArrayFinalResult());
            //console.log("f1a4");
            //console.log(self.OrderArrayFinalResult());
            //console.log("function OrdenFinalResult");
            // Inicio nuevo procedimiento para orden
            self.FirstSubtypePositive = ko.observable(false);
            self.SecondSubtypePositive = ko.observable(false);
            self.OrderArrayFinalResult().forEach(function (c, i) {
                if (c.VirusTypeID() == 1) {
                    if (c.TestResultID_VirusSubType_2() == 'P') {
                        self.SecondSubtypePositive(true);
                    }
                    if (c.TestResultID_VirusSubType() == 'P') {
                        self.FirstSubtypePositive(true);
                    }

                    self.OnlyINFA().push(c);
                }
            });

            //console.log("OnlyINFA");
            //console.log(self.SecondSubtypePositive());
            //console.log(self.FirstSubtypePositive());
            //console.log(self.OnlyINFA());

            self.OrderArrayFinalResult().forEach(function (c, i) {
                if (c.VirusTypeID() == 2) {
                    self.OnlyINFB().push(c);
                }
            });
            self.OrderArrayFinalResult().forEach(function (c, i) {
                if (c.VirusTypeID() == 6) {
                    self.OnlyVRS().push(c);
                }
            });
            self.OrderArrayFinalResult().forEach(function (c, i) {
                if (c.VirusTypeID() > 2 && c.VirusTypeID() != 6) {
                    self.OnlyOtherVirus().push(c);
                }
            });

            self.OrderArrayFinalResult().forEach(function (c, i) {
                if (self.OnlyINFA().length == 0 && self.OnlyINFB().length == 0 && self.OnlyVRS().length == 0 && self.OnlyOtherVirus().length == 0)
                {
                    if (c.TestResultID() == 'N') {
                        self.OnlyIFINegative().push(c);
                    }
                }
                else {
                    if (c.TestResultID() == 'N' && c.TestType() == "1") {
                        self.OnlyIFINegative().push(c);
                    }
                }
                
            });

            // Termina nueva forma de ordenar

            // Nueva forma de ordenamiento
            if (self.SecondSubtypePositive() && self.FirstSubtypePositive() == false) {
                //console.log("SecondSubtypePositive = true");
                self.OrderDummyINFA(self.OnlyINFA.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));
            }
            else {
                //console.log("FirstSubtypePositive = true");
                self.OrderDummyINFA(self.OnlyINFA.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));
            }

            //console.log(self.OrderDummyINFA());

            self.OrderDummyINFB(self.OnlyINFB.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));
            self.OrderDummyVRS(self.OnlyVRS.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));
            self.OrderDummyOtherVirus(self.OnlyOtherVirus.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));
            self.OrderDummyIFINegative(self.OnlyIFINegative.sort(self.generateSortFn([{ name: 'OrdenLabID' }, { name: 'OrdenTestType' }, { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])))

            // Termina nueva forma de ordenamiento


            // Inicia nueva forma de ordenar
            // Influenza A
            self.INFANegative = ko.observable(true);
            self.INFAData = ko.observable(false);
            if (self.OrderDummyINFA().length > 0) { self.INFAData(true); }
            self.OrderDummyINFA().forEach(function (v, i) {
                //console.log('INFA' + v.TestResultID() + ' -' + v.VirusTypeID() + ' - ');
                if (i == 0) {

                    if (typeof (self.OrderDummyINFA()[i + 1]) === "undefined") {
                        self.OrderINFA.push(v);
                        self.INFANegative(false);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderINFA.push(v);
                        self.INFANegative(false);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummyINFA()[i + 1].TestResultID() == "N") {
                        self.OrderINFA.push(v);
                        
                    }
                    else if (v.TestResultID() == "N") {
                        self.OrderINFA.push(v);
                        
                    }

                } else if (self.OrderDummyINFA()[i - 1].VirusTypeID() != v.VirusTypeID() && v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {

                    if (self.OrderDummyINFA()[0].TestResultID() == "N") {
                        if (v.VirusTypeID() > 2) {
                            self.OrderINFA.push(v);
                        }
                    } else {

                        self.virusexist = ko.observable(false);
                        self.OrderDummyINFA().forEach(function (d, j) {
                            if (j < i) {
                                if (d.VirusTypeID() == v.VirusTypeID()) {
                                    //&& v.TestResultID_VirusSubType == 'undefined'
                                    self.virusexist(true);
                                }
                            }

                        });

                        if (self.virusexist() == false) {
                            self.OrderINFA.push(v);
                        }

                    }

                }
            });


            //console.log(self.OrderINFA());


            // Influenza B
            self.INFBNegative = ko.observable(true);
            self.INFBData = ko.observable(false);
            if (self.OrderDummyINFB().length > 0) { self.INFAData(true); }
            self.OrderDummyINFB().forEach(function (v, i) {
                //console.log('INFB' + v.TestResultID() + ' -' + v.VirusTypeID() + ' - ');
                if (i == 0) {

                    if (typeof (self.OrderDummyINFB()[i + 1]) === "undefined") {
                        self.OrderINFB.push(v);
                        self.INFBNegative(false);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderINFB.push(v);
                        self.INFBNegative(false);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummyINFB()[i + 1].TestResultID() == "N") {
                        self.OrderINFB.push(v);
                        
                    }
                    else if (v.TestResultID() == "N") {
                        self.OrderINFB.push(v);
                        
                    }

                } else if (self.OrderDummyINFB()[i - 1].VirusTypeID() != v.VirusTypeID() && v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {

                    if (self.OrderDummyINFB()[0].TestResultID() == "N") {
                        if (v.VirusTypeID() > 2) {
                            self.OrderINFB.push(v);
                        }
                    } else {
                        self.virusexist = ko.observable(false);
                        self.OrderDummyINFB().forEach(function (d, j) {
                            if (j < i) {
                                if (d.VirusTypeID() == v.VirusTypeID()) {
                                    //&& v.TestResultID_VirusSubType == 'undefined'
                                    self.virusexist(true);
                                }
                            }
                        });

                        if (self.virusexist() == false) {
                            self.OrderINFB.push(v);
                        }

                    }

                }
            });

            // VRS
            self.VRSNegative = ko.observable(true);
            self.VRSData = ko.observable(false);
            if (self.OrderDummyVRS().length > 0) { self.VRSData(true); }
            self.OrderDummyVRS().forEach(function (v, i) {
                //console.log('VRS' + v.TestResultID() + ' -' + v.VirusTypeID() + ' - ');
                if (i == 0) {

                    if (typeof (self.OrderDummyVRS()[i + 1]) === "undefined") {
                        self.OrderVRS.push(v);
                        self.VRSNegative(false);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderVRS.push(v);
                        self.VRSNegative(false);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummyVRS()[i + 1].TestResultID() == "N") {
                        self.OrderVRS.push(v);    
                    }
                    else if (v.TestResultID() == "N") {
                        self.OrderVRS.push(v);
                    }

                } else if (self.OrderDummyVRS()[i - 1].VirusTypeID() != v.VirusTypeID() && v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {

                    if (self.OrderDummyVRS()[0].TestResultID() == "N") {
                        if (v.VirusTypeID() > 2) {
                            self.OrderVRS.push(v);
                        }
                    } else {

                        self.virusexist = ko.observable(false);
                        self.OrderDummyVRS().forEach(function (d, j) {
                            if (j < i) {
                                if (d.VirusTypeID() == v.VirusTypeID()) {
                                    //&& v.TestResultID_VirusSubType == 'undefined'
                                    self.virusexist(true);
                                }
                            }
                        });

                        if (self.virusexist() == false) {
                            self.OrderVRS.push(v);
                        }
                    }
                }
            });

            // Other Virus
            self.OtherVirusNegative = ko.observable(true);
            self.VRSData = ko.observable(false);
            if (self.OrderDummyVRS().length > 0) { self.VRSData(true); }
            self.OrderDummyOtherVirus().forEach(function (v, i) {
                //console.log('OtherVirus' + v.TestResultID() + ' -' + v.VirusTypeID() + ' - ');
                if (i == 0) {

                    if (typeof (self.OrderDummyOtherVirus()[i + 1]) === "undefined") {
                        self.OrderOtherVirus.push(v);
                        self.OtherVirusNegative(false);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderOtherVirus.push(v);
                        self.OtherVirusNegative(false);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummyOtherVirus()[i + 1].TestResultID() == "N") {
                        self.OrderOtherVirus.push(v);
                        
                    }
                    else if (v.TestResultID() == "N") {
                        self.OrderOtherVirus.push(v);
                    }

                } else if (self.OrderDummyOtherVirus()[i - 1].VirusTypeID() != v.VirusTypeID() && v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {

                    if (self.OrderDummyOtherVirus()[0].TestResultID() == "N") {
                        if (v.VirusTypeID() > 2) {
                            self.OrderOtherVirus.push(v);
                        }
                    } else {

                        self.virusexist = ko.observable(false);
                        self.OrderDummyOtherVirus().forEach(function (d, j) {
                            if (j < i) {
                                if (d.VirusTypeID() == v.VirusTypeID()) {
                                    //&& v.TestResultID_VirusSubType == 'undefined'
                                    self.virusexist(true);
                                }
                            }

                        });

                        if (self.virusexist() == false) {
                            self.OrderOtherVirus.push(v);
                        }

                    }

                }
            });

            self.OtherIFINegative = ko.observable(true);
            self.OtherIFINegativeData = ko.observable(false);
            if (self.OrderDummyIFINegative().length > 0) { self.OtherIFINegativeData(true); }
            self.OrderDummyIFINegative().forEach(function (v, i) {
                //console.log('IFINegative' + v.TestResultID() + ' -' + v.VirusTypeID() + ' - ');
                if (i == 0) {

                    if (typeof (self.OrderDummyIFINegative()[i + 1]) === "undefined") {
                        self.OrderIFINegative.push(v);
                        self.OtherIFINegative(false);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderIFINegative.push(v);
                        self.OtherIFINegative(false);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummyIFINegative()[i + 1].TestResultID() == "N") {
                        self.OrderIFINegative.push(v);
                        
                    }
                    else if (v.TestResultID() == "N") {
                        self.OrderIFINegative.push(v);
                        
                    }

                } else if (self.OrderDummyIFINegative()[i - 1].VirusTypeID() != v.VirusTypeID() && v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {

                    if (self.OrderDummyIFINegative()[0].TestResultID() == "N") {
                        if (v.VirusTypeID() > 2) {
                            self.OrderIFINegative.push(v);
                        }
                    } else {

                        self.virusexist = ko.observable(false);
                        self.OrderDummyIFINegative().forEach(function (d, j) {
                            if (j < i) {
                                if (d.VirusTypeID() == v.VirusTypeID()) {
                                    //&& v.TestResultID_VirusSubType == 'undefined'
                                    self.virusexist(true);
                                }
                            }

                        });

                        if (self.virusexist() == false) {
                            self.OrderIFINegative.push(v);
                        }

                    }

                }
            });

            // Termina nueva forma de ordenar


            // Comiensa ordenamiento final
            self.OrderArrayFinalResult([]);
            self.OrderArrayFinalResult(self.OrderINFA().concat(self.OrderINFB()).concat(self.OrderVRS()).concat(self.OrderOtherVirus()).concat(self.OrderIFINegative()));

            //console.log('Final concatenado');
            //console.log(self.OrderArrayFinalResult());

            self.OrderDummy(self.OrderArrayFinalResult.sort(self.generateSortFn([  { name: 'OrdenTestResultID' }, { name: 'OrdenVirusTypeID' }, { name: 'OrdenTestResultID_VirusSubType' }, { name: 'OrdenTestResultID_VirusSubType_2' }, { name: 'OrdenSubTypeID' }, { name: 'OrdenLineageID' }])));

            
            self.OrderArrayFinalResult([]);
            //console.log('Final ordenado');
            //console.log(self.OrderDummy());

            self.OrderDummy().forEach(function (v, i) {

                if (i == 0) {

                    if (typeof (self.OrderDummy()[i + 1]) === "undefined") {
                        self.OrderArrayFinalResult.push(v);
                    }
                    else if (v.TestResultID() == "P") {
                        self.OrderArrayFinalResult.push(v);
                    }
                    else if (v.TestResultID() == "N" && self.OrderDummy()[i + 1].TestResultID() == "N") {
                        self.OrderArrayFinalResult.push(v);
                    }
                    else if (v.TestResultID() == "N" && self.otherviruses() == false){
                        self.OrderArrayFinalResult.push(v);
                    }
                    else if (v.TestResultID() == "N" && self.otherviruses() == true) {
                        if (v.VirusTypeID() == self.OrderDummy()[i + 1].VirusTypeID())
                            self.OrderArrayFinalResult.push(v);
                    }    
                } else if ( v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {
                            self.OrderArrayFinalResult.push(v);       
                }
            });

            //console.log('Final depurado');
            //console.log(self.OrderArrayFinalResult());

            self.TestResultID_VirusSubtype_Two_Positive = ko.observable(false);
            self.OrderArrayFinalResult().forEach(function (v, i) {
                if (i == 0) {
                    self.EndLabDate(v.TestEndDate());
                    self.FinalResult((v.TestResultID() == "NA" || v.TestResultID() == "NB") ? 'N' : v.TestResultID());
                    if (v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {
                        self.FinalResultVirusTypeID(v.VirusTypeID());

                        if (self.UsrCountry() == 7) {
                            if (v.TestResultID_VirusSubType() == "P" && self.UsrCountry() == 7) {
                                self.FinalResultVirusSubTypeID(v.VirusSubTypeID());
                            } else if (v.TestResultID_VirusSubType() != "N" && v.TestResultID_VirusSubType() != "NA" && v.TestResultID_VirusSubType() != "" && typeof v.TestResultID_VirusSubType() != "undefined" && v.TestResultID_VirusSubType() != "NB") {
                                self.FinalResultVirusSubTypeID(v.VirusSubTypeID());
                            }

                            if (v.TestResultID_VirusSubType_2() == "P" && (v.TestResultID_VirusSubType() != "P") && self.UsrCountry() == 7) {
                                self.FinalResultVirusSubTypeID(v.VirusSubTypeID_2());
                            } else if (v.TestResultID_VirusSubType() != "P" && v.TestResultID_VirusSubType_2() != "N" && v.TestResultID_VirusSubType_2() != "NA" && v.TestResultID_VirusSubType_2() != "" && v.TestResultID_VirusSubType_2() != "NB" && typeof v.TestResultID_VirusSubType_2() != "undefined" && self.UsrCountry() == 7) {
                                self.FinalResultVirusSubTypeID(v.VirusSubTypeID_2());
                            }

                            if (v.TestResultID_VirusSubType() == "P" && v.TestResultID_VirusSubType_2() == "P" && self.UsrCountry() == 7) {
                                self.FinalResult_2(v.TestResultID());
                                self.FinalResultVirusTypeID_2(v.VirusTypeID());
                                self.FinalResultVirusSubTypeID_2(v.VirusSubTypeID_2());
                            }
                        }
                        else {
                            self.FinalResultVirusSubTypeID(v.VirusSubTypeID());
                        }

                        self.FinalResultVirusLineageID(v.VirusLineageID());
                    }
                    
                }
                if (i == 1) {

                    
                    if (self.OrderArrayFinalResult()[0].TestResultID_VirusSubType() == "P" && self.OrderArrayFinalResult()[0].TestResultID_VirusSubType_2() == "P" && self.UsrCountry() == 7) {
                        self.FinalResult_3((v.TestResultID() == "NA" || v.TestResultID() == "NB") ? 'N' : v.TestResultID());
                        if (v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {
                            self.FinalResultVirusTypeID_3(v.VirusTypeID());
                            self.FinalResultVirusSubTypeID_3(v.VirusSubTypeID());
                            self.FinalResultVirusLineageID_3(v.VirusLineageID());
                        }
                    }
                    else {
                        self.FinalResult_2((v.TestResultID() == "NA" || v.TestResultID() == "NB") ? 'N' : v.TestResultID());
                        if (v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {
                            self.FinalResultVirusTypeID_2(v.VirusTypeID());
                            self.FinalResultVirusSubTypeID_2(v.VirusSubTypeID());
                            self.FinalResultVirusLineageID_2(v.VirusLineageID());
                        }
                    }

                }
                if (i == 2) {

                    if (self.OrderArrayFinalResult()[0].TestResultID_VirusSubType() != "P" && self.OrderArrayFinalResult()[0].TestResultID_VirusSubType_2() != "P") 
                        {
                            self.FinalResult_3((v.TestResultID() == "NA" || v.TestResultID() == "NB") ? 'N' : v.TestResultID());
                            if (v.TestResultID() != "N" && v.TestResultID() != "NA" && v.TestResultID() != "NB") {
                                self.FinalResultVirusTypeID_3(v.VirusTypeID());
                                self.FinalResultVirusSubTypeID_3(v.VirusSubTypeID());
                                self.FinalResultVirusLineageID_3(v.VirusLineageID());
                            }
                        }
                }
            });

            $("#FinalResult").prop('disabled', true);
            $("#FinalResultVirusTypeID").prop('disabled', true);
            $("#FinalResultVirusSubTypeID_1").prop('disabled', true);
            $("#FinalResultVirusLineageID").prop('disabled', true);
            $("#FinalResult_2").prop('disabled', true);
            $("#FinalResultVirusTypeID_2").prop('disabled', true);
            $("#FinalResultVirusSubTypeID_2").prop('disabled', true);
            $("#FinalResultVirusLineageID_2").prop('disabled', true);
            $("#FinalResult_3").prop('disabled', true);
            $("#FinalResultVirusTypeID_3").prop('disabled', true);
            $("#FinalResultVirusSubTypeID_3").prop('disabled', true);
            $("#FinalResultVirusLineageID_3").prop('disabled', true);
            
        }

        console.log("LAB->P->OrdenFinalResult->END");
    };

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    self.ShowProcessedNPHL = ko.computed(function () {
        self.NPHL_NoProRen("");
        self.NPHL_NoProRenId("");
        self.Ship_Date_NPHL("");
        return (self.NPHL_Processed() === "true")
    }, self);

    self.NotShowNPHL_Processed = ko.computed(function () {
        return (self.NPHL_Processed() === "false")
    }, self);

    self.NotShowNPHL_ProcessedOther = ko.computed(function () {
        return (self.NPHL_NoProRenId() === "5")
    }, self);

    self.ShowProcessedNPHL_2 = ko.computed(function () {
        self.NPHL_NoProRen_2("");
        self.NPHL_NoProRenId_2("");
        self.Ship_Date_NPHL_2("");
        return (self.NPHL_Processed_2() === "true")
    }, self);

    self.NotShowNPHL_Processed_2 = ko.computed(function () {
        return (self.NPHL_Processed_2() === "false")
    }, self);

    self.NotShowNPHL_ProcessedOther_2 = ko.computed(function () {
        return (self.NPHL_NoProRenId_2() === "5")
    }, self);

    self.ShowProcessedNPHL_3 = ko.computed(function () {
        self.NPHL_NoProRen_3("");
        self.NPHL_NoProRenId_3("");
        self.resetFinalResult();
        return (self.NPHL_Processed_3() === "true")
    }, self);

    self.NotShowNPHL_Processed_3 = ko.computed(function () {
        return (self.NPHL_Processed_3() === "false")
    }, self);

    self.NotShowNPHL_ProcessedOther_3 = ko.computed(function () {
        return (self.NPHL_NoProRenId_3() === "5")
    }, self);
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    self.ShowForeignLabCountryContainer = ko.computed(function () {
        return (self.ForeignLabCountry())
    }, self);

    //self.ShowProcessed = ko.computed(function () {        //**** NEW: 190926
    //    self.NoProRen("");
    //    self.NoProRenId("");
    //    if (self.Processed == "true" && self.Processed_National == "false")
    //        self.resetFinalResult();
    //    return (self.Processed() === "true")
    //}, self);
      
    self.ShowProcessed2 = ko.computed(function () {
        self.NoProRen2("");
        self.NoProRenId2("");
        //self.resetFinalResult();
        return (self.Processed2() === "true")
    }, self);

    self.ShowProcessed3 = ko.computed(function () {
        self.NoProRen3("");
        self.NoProRenId3("");
        //self.resetFinalResult();
        return (self.Processed3() === "true")
    }, self);
        
    //self.NotShowProcessedOther = ko.computed(function () {       //**** NEW: 190926 
    //    return (self.NoProRenId() === "5")
    //}, self);

    self.NotShowProcessed2 = ko.computed(function () {
        //self.resetFinalResult();
        //self.OrdenFinalResult();
        return (self.Processed2() === "false")
    }, self);

    self.NotShowProcessedOther2 = ko.computed(function () {
        return (self.NoProRenId2() === "5")
    }, self);

    self.NotShowProcessed3 = ko.computed(function () {
        //self.resetFinalResult();
        //self.OrdenFinalResult();
        return (self.Processed3() === "false")
    }, self);

    self.NotShowProcessedOther3 = ko.computed(function () {
        return (self.NoProRenId3() === "5")
    }, self);

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    self.ShowProcessed_National = ko.computed(function () {
        self.NoProRen_National("");
        self.NoProRenId_National("");
        //self.OrdenFinalResult();
        return (self.Processed_National() === "true")
    }, self);

    self.NotShowProcessed_National = ko.computed(function () {
        //console.log("aqui NotShowProcessed_National");
        //self.resetFinalResult();
        //self.OrdenFinalResult();
        return (self.Processed_National() === "false")
    }, self);
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    //self.NotShowProcessed = ko.computed(function () {     //**** NEW: 190926
    //    //self.resetFinalResult();
    //    //self.OrdenFinalResult();
    //    return (self.Processed() === "false")
    //}, self);

    self.Save = function () {
        console.log("LAB->LabViewModel->self.Save->START");
        app.Views.Home.ValidateAll();
        console.log("LAB->LabViewModel->self.Save->END");
    };

    self.Cancel = function () {
        console.log("self.Cancel->START");
        if (confirm("Usted esta apunto de salir del registro, está seguro...1?")) {
            app.Views.Home.CancelEdit();
        }
        console.log("self.Cancel->END");
    };

    self.SaveLab = function (nextStep) {
        console.log("LAB->self.SaveLab->START");

        var postCaseLabs = [];
        var postData = [];
        //console.log("r1");
        //console.log(self.CaseLabses);
        console.log(self.CaseLabses());     // Array de objetos CaseLab
        console.log("r1a");



        ////////////rec_date = jQuery.type(self.RecDate()) === 'date' ? self.RecDate() : parseDate($("#RecDate").val(), date_format_);
        ////////////rec_date2 = jQuery.type(self.RecDate2()) === 'date' ? self.RecDate2() : parseDate($("#RecDate2").val(), date_format_);
        ////////////rec_date3 = jQuery.type(self.RecDate3()) === 'date' ? self.RecDate3() : parseDate($("#RecDate3").val(), date_format_);
        ////////////rec_date_National = jQuery.type(self.RecDate_National()) === 'date' ? self.RecDate_National() : parseDate($("#RecDate_National").val(), date_format_);
        ////////////date_close_date_lab = jQuery.type(self.EndLabDate()) === 'date' ? self.EndLabDate() : parseDate($("#EndLabDate").val(), date_format_);

        ////////////rec_date_NPHL = jQuery.type(self.Rec_Date_NPHL()) === 'date' ? self.Rec_Date_NPHL() : parseDate($("#Rec_Date_NPHL").val(), date_format_);
        ////////////ship_date_NPHL = jQuery.type(self.Ship_Date_NPHL()) === 'date' ? self.Ship_Date_NPHL() : parseDate($("#Ship_Date_NPHL").val(), date_format_);
        ////////////rec_date_NPHL_2 = jQuery.type(self.Rec_Date_NPHL_2()) === 'date' ? self.Rec_Date_NPHL_2() : parseDate($("#Rec_Date_NPHL_2").val(), date_format_);
        ////////////ship_date_NPHL_2 = jQuery.type(self.Ship_Date_NPHL_2()) === 'date' ? self.Ship_Date_NPHL_2() : parseDate($("#Ship_Date_NPHL_2").val(), date_format_);
        ////////////rec_date_NPHL_3 = jQuery.type(self.Rec_Date_NPHL_3()) === 'date' ? self.Rec_Date_NPHL_3() : parseDate($("#Rec_Date_NPHL_3").val(), date_format_);
        ////////////ship_date_NPHL_3 = jQuery.type(self.Ship_Date_NPHL_3()) === 'date' ? self.Ship_Date_NPHL_3() : parseDate($("#Ship_Date_NPHL_3").val(), date_format_);

        //alert($("#o_S").val());
        // Cabecera de laborarotio
        ////for (var index = 0; index < self.CaseLabses().length; ++index) {
        ////    date_1 = self.CaseLabses()[index].RecDate12();
        ////    var date_RecDate = new Date();
        ////    date_RecDate = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);

        ////    postCaseLabs.push({
        ////        Id: self.CaseLabses()[index].Id,
        ////        FlucaseID: self.CaseLabses()[index].FlucaseID,
        ////        LabID: self.CaseLabses()[index].LabID(),
        ////        RecDate: moment(date_RecDate).format(date_format_ISO),
        ////        Identification_Test: self.CaseLabses()[index].Identification_Test12(),
        ////        Processed: self.CaseLabses()[index].Processed12(),
        ////        TempSample: self.CaseLabses()[index].TempSample12(),
        ////        NoProRenId: self.CaseLabses()[index].NoProRenId12(),
        ////        NoProRen: self.CaseLabses()[index].NoProRen12()
        ////    })
        ////}

        console.log("r1b");
        for (var indexCL = 0; indexCL < self.CaseLabses().length; ++indexCL) {
            var oCaseLab = self.CaseLabses()[indexCL];       // Objeto CaseLab
            console.log(oCaseLab);
            //console.log(oCaseLab.LabTests())                 // Array de objetos LabTest
            //console.log(oCaseLab.LabTests().length)          // # de objetos Labtest

            //**** Cabecera de lab
            date_1 = oCaseLab.RecDate();
            var date_RecDate = new Date();
            date_RecDate = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);

            postCaseLabs.push({
                Id: oCaseLab.Id,
                FlucaseID: oCaseLab.FlucaseID,
                LabID: oCaseLab.LabID(),
                RecDate: moment(date_RecDate).format(date_format_ISO),
                Identification_Test: oCaseLab.Identification_Test(),
                Processed: oCaseLab.Processed(),
                TempSample: oCaseLab.TempSample(),
                NoProRenId: oCaseLab.NoProRenId(),
                NoProRen: oCaseLab.NoProRen()
            })

            //**** Tests de la cabecera de lab  
            // Muestra 1 uno
            for (var index = 0; index < oCaseLab.LabTests().length; ++index) {
                date_1 = oCaseLab.LabTests()[index].TestDate();
                date_2 = oCaseLab.LabTests()[index].TestEndDate();
                var date_test_start = new Date();
                var date_test_final = new Date();
                date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
                date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

                var newLabID = (oCaseLab.LabTests()[index].LabID() === "" || typeof oCaseLab.LabTests()[index].LabID() === "undefined") ?
                                                                oCaseLab.LabTests()[index].ProcLab() : oCaseLab.LabTests()[index].LabID();

                postData.push({
                    ID: oCaseLab.LabTests()[index].Id,
                    CaseLabID: oCaseLab.Id,
                    LabID: newLabID,
                    Processed: oCaseLab.LabTests()[index].ProcessLab(),
                    SampleNumber: oCaseLab.LabTests()[index].SampleNumber(),
                    VirusTypeID: oCaseLab.LabTests()[index].TestResultID() == 'NA' ? 1 : oCaseLab.LabTests()[index].TestResultID() == 'NB' ? 2 : oCaseLab.LabTests()[index].VirusTypeID(),
                    CTVirusType: oCaseLab.LabTests()[index].CTVirusType(),
                    CTRLVirusType: oCaseLab.LabTests()[index].CTRLVirusType(),
                    OtherVirusTypeID: oCaseLab.LabTests()[index].OtherVirusTypeID(),
                    CTOtherVirusType: oCaseLab.LabTests()[index].CTOtherVirusType(),
                    CTRLOtherVirusType: oCaseLab.LabTests()[index].CTRLOtherVirusType(),
                    OtherVirus: oCaseLab.LabTests()[index].OtherVirus(),
                    InfA: oCaseLab.LabTests()[index].InfA(),
                    VirusSubTypeID: oCaseLab.LabTests()[index].VirusSubTypeID(),
                    CTSubType: oCaseLab.LabTests()[index].CTSubType(),
                    CTRLSubType: oCaseLab.LabTests()[index].CTRLSubType(),
                    TestResultID_VirusSubType: oCaseLab.LabTests()[index].TestResultID_VirusSubType(),
                    VirusSubTypeID_2: oCaseLab.LabTests()[index].VirusSubTypeID_2(),
                    CTSubType_2: oCaseLab.LabTests()[index].CTSubType_2(),
                    CTRLSubType_2: oCaseLab.LabTests()[index].CTRLSubType_2(),
                    TestResultID_VirusSubType_2: oCaseLab.LabTests()[index].TestResultID_VirusSubType_2(),
                    InfB: oCaseLab.LabTests()[index].InfB(),
                    VirusLineageID: oCaseLab.LabTests()[index].VirusLineageID(),
                    CTLineage: oCaseLab.LabTests()[index].CTLineage(),
                    CTRLLineage: oCaseLab.LabTests()[index].CTRLLineage(),
                    ParaInfI: oCaseLab.LabTests()[index].ParaInfI(),
                    ParaInfII: oCaseLab.LabTests()[index].ParaInfII(),
                    ParaInfIII: oCaseLab.LabTests()[index].ParaInfIII(),
                    RSV: oCaseLab.LabTests()[index].RSV(),
                    Adenovirus: oCaseLab.LabTests()[index].Adenovirus(),
                    Metapneumovirus: oCaseLab.LabTests()[index].Metapneumovirus(),
                    RNP: oCaseLab.LabTests()[index].RNP(),
                    CTRLRNP: oCaseLab.LabTests()[index].CTRLRNP(),
                    CTRLNegative: oCaseLab.LabTests()[index].CTRLNegative(),
                    TestResultID: oCaseLab.LabTests()[index].TestResultID() == 'NA' || oCaseLab.LabTests()[index].TestResultID() == 'NB' ? 'N' : oCaseLab.LabTests()[index].TestResultID(),
                    TestType: oCaseLab.LabTests()[index].TestType(),
                    TestDate: moment(date_test_start).format(date_format_ISO),
                    TestEndDate: moment(date_test_final).format(date_format_ISO)
                });
            }

            // Muestra 2 dos
            for (var index = 0; index < oCaseLab.LabTests_Sample2().length; ++index) {
                date_1 = oCaseLab.LabTests_Sample2()[index].TestDate();
                date_2 = oCaseLab.LabTests_Sample2()[index].TestEndDate();
                var date_test_start = new Date();
                var date_test_final = new Date();
                date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
                date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

                var newLabID = (oCaseLab.LabTests_Sample2()[index].LabID() === "" || typeof oCaseLab.LabTests_Sample2()[index].LabID() === "undefined") ?
                                                                oCaseLab.LabTests_Sample2()[index].ProcLab() : oCaseLab.LabTests_Sample2()[index].LabID();

                postData.push({
                    ID: oCaseLab.LabTests_Sample2()[index].Id,
                    CaseLabID: oCaseLab.Id,
                    LabID: newLabID,
                    Processed: oCaseLab.LabTests_Sample2()[index].ProcessLab(),
                    SampleNumber: oCaseLab.LabTests_Sample2()[index].SampleNumber(),
                    //VirusTypeID: self.LabTests_Sample2()[index].VirusTypeID(),
                    VirusTypeID: oCaseLab.LabTests_Sample2()[index].TestResultID() == 'NA' ? 1 : oCaseLab.LabTests_Sample2()[index].TestResultID() == 'NB' ? 2 : oCaseLab.LabTests_Sample2()[index].VirusTypeID(),
                    CTVirusType: oCaseLab.LabTests_Sample2()[index].CTVirusType(),
                    CTRLVirusType: oCaseLab.LabTests_Sample2()[index].CTRLVirusType(),
                    OtherVirusTypeID: oCaseLab.LabTests_Sample2()[index].OtherVirusTypeID(),
                    CTOtherVirusType: oCaseLab.LabTests_Sample2()[index].CTOtherVirusType(),
                    CTRLOtherVirusType: oCaseLab.LabTests_Sample2()[index].CTRLOtherVirusType(),
                    OtherVirus: oCaseLab.LabTests_Sample2()[index].OtherVirus(),
                    InfA: oCaseLab.LabTests_Sample2()[index].InfA(),
                    VirusSubTypeID: oCaseLab.LabTests_Sample2()[index].VirusSubTypeID(),
                    CTSubType: oCaseLab.LabTests_Sample2()[index].CTSubType(),
                    CTRLSubType: oCaseLab.LabTests_Sample2()[index].CTRLSubType(),
                    InfB: oCaseLab.LabTests_Sample2()[index].InfB(),
                    VirusLineageID: oCaseLab.LabTests_Sample2()[index].VirusLineageID(),
                    CTLineage: oCaseLab.LabTests_Sample2()[index].CTLineage(),
                    CTRLLineage: oCaseLab.LabTests_Sample2()[index].CTRLLineage(),
                    ParaInfI: oCaseLab.LabTests_Sample2()[index].ParaInfI(),
                    ParaInfII: oCaseLab.LabTests_Sample2()[index].ParaInfII(),
                    ParaInfIII: oCaseLab.LabTests_Sample2()[index].ParaInfIII(),
                    RSV: oCaseLab.LabTests_Sample2()[index].RSV(),
                    Adenovirus: oCaseLab.LabTests_Sample2()[index].Adenovirus(),
                    Metapneumovirus: oCaseLab.LabTests_Sample2()[index].Metapneumovirus(),
                    RNP: oCaseLab.LabTests_Sample2()[index].RNP(),
                    CTRLRNP: oCaseLab.LabTests_Sample2()[index].CTRLRNP(),
                    CTRLNegative: oCaseLab.LabTests_Sample2()[index].CTRLNegative(),
                    //TestResultID: self.LabTests_Sample2()[index].TestResultID(),
                    TestResultID: oCaseLab.LabTests_Sample2()[index].TestResultID() == 'NA' || oCaseLab.LabTests_Sample2()[index].TestResultID() == 'NB' ? 'N' : oCaseLab.LabTests_Sample2()[index].TestResultID(),
                    TestType: oCaseLab.LabTests_Sample2()[index].TestType(),
                    TestDate: moment(date_test_start).format(date_format_ISO),
                    TestEndDate: moment(date_test_final).format(date_format_ISO)
                });
            }

            // Muestra 3 tres
            for (var index = 0; index < oCaseLab.LabTests_Sample3().length; ++index) {
                date_1 = oCaseLab.LabTests_Sample3()[index].TestDate();
                date_2 = oCaseLab.LabTests_Sample3()[index].TestEndDate();
                var date_test_start = new Date();
                var date_test_final = new Date();
                date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
                date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

                var newLabID = (oCaseLab.LabTests_Sample3()[index].LabID() === "" || typeof oCaseLab.LabTests_Sample3()[index].LabID() === "undefined") ?
                                                                oCaseLab.LabTests_Sample3()[index].ProcLab() : oCaseLab.LabTests_Sample3()[index].LabID();

                postData.push({
                    ID: oCaseLab.LabTests_Sample3()[index].Id,
                    CaseLabID: oCaseLab.Id,
                    LabID: newLabID,
                    Processed: oCaseLab.LabTests_Sample3()[index].ProcessLab(),
                    SampleNumber: oCaseLab.LabTests_Sample3()[index].SampleNumber(),
                    //VirusTypeID: self.LabTests_Sample3()[index].VirusTypeID(),
                    VirusTypeID: oCaseLab.LabTests_Sample3()[index].TestResultID() == 'NA' ? 1 : oCaseLab.LabTests_Sample3()[index].TestResultID() == 'NB' ? 2 : oCaseLab.LabTests_Sample3()[index].VirusTypeID(),
                    CTVirusType: oCaseLab.LabTests_Sample3()[index].CTVirusType(),
                    CTRLVirusType: oCaseLab.LabTests_Sample3()[index].CTRLVirusType(),
                    OtherVirusTypeID: oCaseLab.LabTests_Sample3()[index].OtherVirusTypeID(),
                    CTOtherVirusType: oCaseLab.LabTests_Sample3()[index].CTOtherVirusType(),
                    CTRLOtherVirusType: oCaseLab.LabTests_Sample3()[index].CTRLOtherVirusType(),
                    OtherVirus: oCaseLab.LabTests_Sample3()[index].OtherVirus(),
                    InfA: oCaseLab.LabTests_Sample3()[index].InfA(),
                    VirusSubTypeID: oCaseLab.LabTests_Sample3()[index].VirusSubTypeID(),
                    CTSubType: oCaseLab.LabTests_Sample3()[index].CTSubType(),
                    CTRLSubType: oCaseLab.LabTests_Sample3()[index].CTRLSubType(),
                    InfB: oCaseLab.LabTests_Sample3()[index].InfB(),
                    VirusLineageID: oCaseLab.LabTests_Sample3()[index].VirusLineageID(),
                    CTLineage: oCaseLab.LabTests_Sample3()[index].CTLineage(),
                    CTRLLineage: oCaseLab.LabTests_Sample3()[index].CTRLLineage(),
                    ParaInfI: oCaseLab.LabTests_Sample3()[index].ParaInfI(),
                    ParaInfII: oCaseLab.LabTests_Sample3()[index].ParaInfII(),
                    ParaInfIII: oCaseLab.LabTests_Sample3()[index].ParaInfIII(),
                    RSV: oCaseLab.LabTests_Sample3()[index].RSV(),
                    Adenovirus: oCaseLab.LabTests_Sample3()[index].Adenovirus(),
                    Metapneumovirus: oCaseLab.LabTests_Sample3()[index].Metapneumovirus(),
                    RNP: oCaseLab.LabTests_Sample3()[index].RNP(),
                    CTRLRNP: oCaseLab.LabTests_Sample3()[index].CTRLRNP(),
                    CTRLNegative: oCaseLab.LabTests_Sample3()[index].CTRLNegative(),
                    //TestResultID: self.LabTests_Sample3()[index].TestResultID(),
                    TestResultID: oCaseLab.LabTests_Sample3()[index].TestResultID() == 'NA' || oCaseLab.LabTests_Sample3()[index].TestResultID() == 'NB' ? 'N' : oCaseLab.LabTests_Sample3()[index].TestResultID(),
                    TestType: oCaseLab.LabTests_Sample3()[index].TestType(),
                    TestDate: moment(date_test_start).format(date_format_ISO),
                    TestEndDate: moment(date_test_final).format(date_format_ISO)
                });
            }
        }
        console.log("r1c");

        // Muestra 1 uno 
        ////for (var index = 0; index < self.LabTests().length; ++index) {
        ////    date_1 = self.LabTests()[index].TestDate();
        ////    date_2 = self.LabTests()[index].TestEndDate();
        ////    var date_test_start = new Date();
        ////    var date_test_final = new Date();
        ////    date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
        ////    date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

        ////    var newLabID = (self.LabTests()[index].LabID() === "" || typeof self.LabTests()[index].LabID() === "undefined") ?
        ////        self.LabTests()[index].ProcLab() : self.LabTests()[index].LabID();

        ////    postData.push({
        ////        ID: self.LabTests()[index].Id,
        ////        CaseLabID: self.Id,
        ////        LabID: newLabID,
        ////        Processed: self.LabTests()[index].ProcessLab(),
        ////        SampleNumber: self.LabTests()[index].SampleNumber(),
        ////        VirusTypeID: self.LabTests()[index].TestResultID() == 'NA' ? 1 : self.LabTests()[index].TestResultID() == 'NB' ? 2 : self.LabTests()[index].VirusTypeID(),
        ////        CTVirusType: self.LabTests()[index].CTVirusType(),
        ////        CTRLVirusType: self.LabTests()[index].CTRLVirusType(),
        ////        OtherVirusTypeID: self.LabTests()[index].OtherVirusTypeID(),
        ////        CTOtherVirusType: self.LabTests()[index].CTOtherVirusType(),
        ////        CTRLOtherVirusType: self.LabTests()[index].CTRLOtherVirusType(),
        ////        OtherVirus: self.LabTests()[index].OtherVirus(),
        ////        InfA: self.LabTests()[index].InfA(),
        ////        VirusSubTypeID: self.LabTests()[index].VirusSubTypeID(),
        ////        CTSubType: self.LabTests()[index].CTSubType(),
        ////        CTRLSubType: self.LabTests()[index].CTRLSubType(),
        ////        TestResultID_VirusSubType: self.LabTests()[index].TestResultID_VirusSubType(),
        ////        VirusSubTypeID_2: self.LabTests()[index].VirusSubTypeID_2(),
        ////        CTSubType_2: self.LabTests()[index].CTSubType_2(),
        ////        CTRLSubType_2: self.LabTests()[index].CTRLSubType_2(),
        ////        TestResultID_VirusSubType_2: self.LabTests()[index].TestResultID_VirusSubType_2(),
        ////        InfB: self.LabTests()[index].InfB(),
        ////        VirusLineageID: self.LabTests()[index].VirusLineageID(),
        ////        CTLineage: self.LabTests()[index].CTLineage(),
        ////        CTRLLineage: self.LabTests()[index].CTRLLineage(),
        ////        ParaInfI: self.LabTests()[index].ParaInfI(),
        ////        ParaInfII: self.LabTests()[index].ParaInfII(),
        ////        ParaInfIII: self.LabTests()[index].ParaInfIII(),
        ////        RSV: self.LabTests()[index].RSV(),
        ////        Adenovirus: self.LabTests()[index].Adenovirus(),
        ////        Metapneumovirus: self.LabTests()[index].Metapneumovirus(),
        ////        RNP: self.LabTests()[index].RNP(),
        ////        CTRLRNP: self.LabTests()[index].CTRLRNP(),
        ////        CTRLNegative: self.LabTests()[index].CTRLNegative(),
        ////        TestResultID: self.LabTests()[index].TestResultID() == 'NA' || self.LabTests()[index].TestResultID() == 'NB' ? 'N' : self.LabTests()[index].TestResultID(),
        ////        TestType: self.LabTests()[index].TestType(),
        ////        TestDate: moment(date_test_start).format(date_format_ISO),
        ////        TestEndDate: moment(date_test_final).format(date_format_ISO)
        ////    });
        ////}

        // Muestra numero 2 dos
        ////for (var index = 0; index < self.LabTests_Sample2().length; ++index) {
        ////    date_1 = self.LabTests_Sample2()[index].TestDate();
        ////    date_2 = self.LabTests_Sample2()[index].TestEndDate();
        ////    var date_test_start = new Date();
        ////    var date_test_final = new Date();
        ////    date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
        ////    date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

        ////    var newLabID = (self.LabTests_Sample2()[index].LabID() === "" || typeof self.LabTests_Sample2()[index].LabID() === "undefined") ?
        ////        self.LabTests_Sample2()[index].ProcLab() : self.LabTests_Sample2()[index].LabID();

        ////    postData.push({
        ////        ID: self.LabTests_Sample2()[index].Id,
        ////        CaseLabID: self.Id,
        ////        LabID: newLabID,
        ////        Processed: self.LabTests_Sample2()[index].ProcessLab(),
        ////        SampleNumber: self.LabTests_Sample2()[index].SampleNumber(),
        ////        //VirusTypeID: self.LabTests_Sample2()[index].VirusTypeID(),
        ////        VirusTypeID: self.LabTests_Sample2()[index].TestResultID() == 'NA' ? 1 : self.LabTests_Sample2()[index].TestResultID() == 'NB' ? 2 : self.LabTests_Sample2()[index].VirusTypeID(),
        ////        CTVirusType: self.LabTests_Sample2()[index].CTVirusType(),
        ////        CTRLVirusType: self.LabTests_Sample2()[index].CTRLVirusType(),
        ////        OtherVirusTypeID: self.LabTests_Sample2()[index].OtherVirusTypeID(),
        ////        CTOtherVirusType: self.LabTests_Sample2()[index].CTOtherVirusType(),
        ////        CTRLOtherVirusType: self.LabTests_Sample2()[index].CTRLOtherVirusType(),
        ////        OtherVirus: self.LabTests_Sample2()[index].OtherVirus(),
        ////        InfA: self.LabTests_Sample2()[index].InfA(),
        ////        VirusSubTypeID: self.LabTests_Sample2()[index].VirusSubTypeID(),
        ////        CTSubType: self.LabTests_Sample2()[index].CTSubType(),
        ////        CTRLSubType: self.LabTests_Sample2()[index].CTRLSubType(),
        ////        InfB: self.LabTests_Sample2()[index].InfB(),
        ////        VirusLineageID: self.LabTests_Sample2()[index].VirusLineageID(),
        ////        CTLineage: self.LabTests_Sample2()[index].CTLineage(),
        ////        CTRLLineage: self.LabTests_Sample2()[index].CTRLLineage(),
        ////        ParaInfI: self.LabTests_Sample2()[index].ParaInfI(),
        ////        ParaInfII: self.LabTests_Sample2()[index].ParaInfII(),
        ////        ParaInfIII: self.LabTests_Sample2()[index].ParaInfIII(),
        ////        RSV: self.LabTests_Sample2()[index].RSV(),
        ////        Adenovirus: self.LabTests_Sample2()[index].Adenovirus(),
        ////        Metapneumovirus: self.LabTests_Sample2()[index].Metapneumovirus(),
        ////        RNP: self.LabTests_Sample2()[index].RNP(),
        ////        CTRLRNP: self.LabTests_Sample2()[index].CTRLRNP(),
        ////        CTRLNegative: self.LabTests_Sample2()[index].CTRLNegative(),
        ////        //TestResultID: self.LabTests_Sample2()[index].TestResultID(),
        ////        TestResultID: self.LabTests_Sample2()[index].TestResultID() == 'NA' || self.LabTests_Sample2()[index].TestResultID() == 'NB' ? 'N' : self.LabTests_Sample2()[index].TestResultID(),  
        ////        TestType: self.LabTests_Sample2()[index].TestType(),
        ////        TestDate: moment(date_test_start).format(date_format_ISO),
        ////        TestEndDate: moment(date_test_final).format(date_format_ISO)
        ////    });
        ////}

        // Muestra 3 tres
        ////for (var index = 0; index < self.LabTests_Sample3().length; ++index) {
        ////    date_1 = self.LabTests_Sample3()[index].TestDate();
        ////    date_2 = self.LabTests_Sample3()[index].TestEndDate();
        ////    var date_test_start = new Date();
        ////    var date_test_final = new Date();
        ////    date_test_start = jQuery.type(date_1) === 'date' ? date_1 : parseDate(date_1, date_format_);
        ////    date_test_final = jQuery.type(date_2) === 'date' ? date_2 : parseDate(date_2, date_format_);

        ////    var newLabID = (self.LabTests_Sample3()[index].LabID() === "" || typeof self.LabTests_Sample3()[index].LabID() === "undefined") ?
        ////        self.LabTests_Sample3()[index].ProcLab() : self.LabTests_Sample3()[index].LabID();

        ////    postData.push({
        ////        ID: self.LabTests_Sample3()[index].Id,
        ////        CaseLabID: self.Id,
        ////        LabID: newLabID,
        ////        Processed: self.LabTests_Sample3()[index].ProcessLab(),
        ////        SampleNumber: self.LabTests_Sample3()[index].SampleNumber(),
        ////        //VirusTypeID: self.LabTests_Sample3()[index].VirusTypeID(),
        ////        VirusTypeID: self.LabTests_Sample3()[index].TestResultID() == 'NA' ? 1 : self.LabTests_Sample3()[index].TestResultID() == 'NB' ? 2 : self.LabTests_Sample3()[index].VirusTypeID(),
        ////        CTVirusType: self.LabTests_Sample3()[index].CTVirusType(),
        ////        CTRLVirusType: self.LabTests_Sample3()[index].CTRLVirusType(),
        ////        OtherVirusTypeID: self.LabTests_Sample3()[index].OtherVirusTypeID(),
        ////        CTOtherVirusType: self.LabTests_Sample3()[index].CTOtherVirusType(),
        ////        CTRLOtherVirusType: self.LabTests_Sample3()[index].CTRLOtherVirusType(),
        ////        OtherVirus: self.LabTests_Sample3()[index].OtherVirus(),
        ////        InfA: self.LabTests_Sample3()[index].InfA(),
        ////        VirusSubTypeID: self.LabTests_Sample3()[index].VirusSubTypeID(),
        ////        CTSubType: self.LabTests_Sample3()[index].CTSubType(),
        ////        CTRLSubType: self.LabTests_Sample3()[index].CTRLSubType(),
        ////        InfB: self.LabTests_Sample3()[index].InfB(),
        ////        VirusLineageID: self.LabTests_Sample3()[index].VirusLineageID(),
        ////        CTLineage: self.LabTests_Sample3()[index].CTLineage(),
        ////        CTRLLineage: self.LabTests_Sample3()[index].CTRLLineage(),
        ////        ParaInfI: self.LabTests_Sample3()[index].ParaInfI(),
        ////        ParaInfII: self.LabTests_Sample3()[index].ParaInfII(),
        ////        ParaInfIII: self.LabTests_Sample3()[index].ParaInfIII(),
        ////        RSV: self.LabTests_Sample3()[index].RSV(),
        ////        Adenovirus: self.LabTests_Sample3()[index].Adenovirus(),
        ////        Metapneumovirus: self.LabTests_Sample3()[index].Metapneumovirus(),
        ////        RNP: self.LabTests_Sample3()[index].RNP(),
        ////        CTRLRNP: self.LabTests_Sample3()[index].CTRLRNP(),
        ////        CTRLNegative: self.LabTests_Sample3()[index].CTRLNegative(),
        ////        //TestResultID: self.LabTests_Sample3()[index].TestResultID(),
        ////        TestResultID: self.LabTests_Sample3()[index].TestResultID() == 'NA' || self.LabTests_Sample3()[index].TestResultID() == 'NB' ? 'N' : self.LabTests_Sample3()[index].TestResultID(),
        ////        TestType: self.LabTests_Sample3()[index].TestType(),
        ////        TestDate: moment(date_test_start).format(date_format_ISO),
        ////        TestEndDate: moment(date_test_final).format(date_format_ISO)
        ////    });
        ////}

        console.log("An1");
        console.log(postCaseLabs);
        console.log(postData);
        console.log("An2");
        //return false

        $.ajax({
            url: app.dataModel.saveLabUrl,
            type: "POST",
            data: JSON.stringify({
                id: self.Id,

                ////RecDate: $("#RecDate").val() == "" ? null : moment(rec_date).format(date_format_ISO),
                ////Identification_Test: self.Identification_Test() ? self.Identification_Test().toLocaleUpperCase() : "",
                ////Processed: self.Processed() === "true" ? true : self.Processed() === "false" ? false : null,
                ////NoProRen: self.NoProRen() ? self.NoProRen().toLocaleUpperCase() : "",
                ////NoProRenId: self.NoProRenId(),
                ////TempSample1: self.TempSample1(),

                //RecDate2: $("#RecDate2").val() == "" ? null : moment(rec_date2).format(date_format_ISO),
                //Identification_Test2: self.Identification_Test2() ? self.Identification_Test2().toLocaleUpperCase() : "",
                //Processed2: self.Processed2() === "true" ? true : self.Processed2() === "false" ? false : null,
                //NoProRen2: self.NoProRen2() ? self.NoProRen2().toLocaleUpperCase() : "",
                //NoProRenId2: self.NoProRenId2(),
                //TempSample2: self.TempSample2(),

                //RecDate3: $("#RecDate3").val() == "" ? null : moment(rec_date3).format(date_format_ISO),
                //Identification_Test3: self.Identification_Test3() ? self.Identification_Test3().toLocaleUpperCase() : "",
                //Processed3: self.Processed3() === "true" ? true : self.Processed3() === "false" ? false : null,
                //NoProRen3: self.NoProRen3() ? self.NoProRen3().toLocaleUpperCase() : "",
                //NoProRenId3: self.NoProRenId3(),
                //TempSample3: self.TempSample3(),

                //RecDate_National: $("#RecDate_National").val() == "" ? null : moment(rec_date_National).format(date_format_ISO),
                //Identification_Test_National: self.Identification_Test_National() ? self.Identification_Test_National().toLocaleUpperCase() : "",
                //Processed_National: self.Processed_National() === "true" ? true : self.Processed_National() === "false" ? false : null,
                //NoProRen_National: self.NoProRen_National() ? self.NoProRen_National().toLocaleUpperCase() : "",
                //NoProRenId_National: self.NoProRenId_National(),
                //TempSample_National: self.TempSample_National(),

                EndLabDate: $("#EndLabDate").val() == "" ? null : moment(date_close_date_lab).format(date_format_ISO),
                FResult: self.FResult(),          
                Comments: self.Comments() ? self.Comments().toLocaleUpperCase() : "",                  
                FinalResult: self.FinalResult(),
                FinalResultVirusTypeID: self.FinalResultVirusTypeID(),
                FinalResultVirusSubTypeID: self.FinalResultVirusSubTypeID(),
                FinalResultVirusLineageID: self.FinalResultVirusLineageID(),
                FinalResult_2: self.FinalResult_2(),
                FinalResultVirusTypeID_2: self.FinalResultVirusTypeID_2(),
                FinalResultVirusSubTypeID_2: self.FinalResultVirusSubTypeID_2(),
                FinalResultVirusLineageID_2: self.FinalResultVirusLineageID_2(),
                FinalResult_3: self.FinalResult_3(),
                FinalResultVirusTypeID_3: self.FinalResultVirusTypeID_3(),
                FinalResultVirusSubTypeID_3: self.FinalResultVirusSubTypeID_3(),
                FinalResultVirusLineageID_3: self.FinalResultVirusLineageID_3(),

                GeneticGroup: self.GeneticGroup(),
                GeneticGroup_2: self.GeneticGroup_2(),
                GeneticGroup_3: self.GeneticGroup_3(),

                DataStatement: $("#o_S").val(),
                LabTests: postData,
                CaseLabs: postCaseLabs,

                // Laboratorio intermedio
                //Rec_Date_NPHL: $("#Rec_Date_NPHL").val() == "" ? null : moment(rec_date_NPHL).format(date_format_ISO),
                //Identification_Test_NPHL: self.Identification_Test_NPHL() ? self.Identification_Test_NPHL().toLocaleUpperCase() : "",
                //Observation_NPHL: self.Observation_NPHL() ? self.Observation_NPHL().toLocaleUpperCase() : "",
                //Temp_NPHL: self.Temp_NPHL(),
                //Ship_Date_NPHL: $("#Ship_Date_NPHL").val() == "" ? null : moment(ship_date_NPHL).format(date_format_ISO),
                //NPHL_Processed: self.NPHL_Processed(),
                //NPHL_NoProRenId: self.NPHL_NoProRenId(),
                //NPHL_NoProRen: self.NPHL_NoProRen(),
                //NPHL_Conclusion: self.NPHL_Conclusion(),
                
                //Rec_Date_NPHL_2: $("#Rec_Date_NPHL_2").val() == "" ? null : moment(rec_date_NPHL_2).format(date_format_ISO),
                //Identification_Test_NPHL_2: self.Identification_Test_NPHL_2() ? self.Identification_Test_NPHL_2().toLocaleUpperCase() : "",
                //Temp_NPHL_2: self.Temp_NPHL_2(),
                //Ship_Date_NPHL_2: $("#Ship_Date_NPHL_2").val() == "" ? null : moment(ship_date_NPHL_2).format(date_format_ISO),
                //Observation_NPHL_2: self.Observation_NPHL_2() ? self.Observation_NPHL_2().toLocaleUpperCase() : "",
                //NPHL_Processed_2: self.NPHL_Processed_2(),
                //NPHL_NoProRenId_2: self.NPHL_NoProRenId_2(),
                //NPHL_NoProRen_2: self.NPHL_NoProRen_2(),
                //NPHL_Conclusion_2: self.NPHL_Conclusion_2(),

                //Rec_Date_NPHL_3: $("#Rec_Date_NPHL_3").val() == "" ? null : moment(rec_date_NPHL_3).format(date_format_ISO),
                //Identification_Test_NPHL_3: self.Identification_Test_NPHL_3() ? self.Identification_Test_NPHL_3().toLocaleUpperCase() : "",
                //Temp_NPHL_3: self.Temp_NPHL_3(),
                //Ship_Date_NPHL_3: $("#Ship_Date_NPHL_3").val() == "" ? null : moment(ship_date_NPHL_3).format(date_format_ISO),
                //Observation_NPHL_3: self.Observation_NPHL_3() ? self.Observation_NPHL_3().toLocaleUpperCase() : "",
                //NPHL_Processed_3: self.NPHL_Processed_3(),
                //NPHL_NoProRenId_3: self.NPHL_NoProRenId_3(),
                //NPHL_NoProRen_3: self.NPHL_NoProRen_3(),
                //NPHL_Conclusion_3: self.NPHL_Conclusion_3(),

            }),
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (nextStep) nextStep();
                //alert(data);
            }
        });

        console.log("LAB->self.SaveLab->END");
        return true;
    };

    //console.log("function LabViewModel(app, dataModel)->ENDD");
}

app.addViewModel({
    name: "Lab",
    bindingMemberName: "lab",
    factory: LabViewModel
});