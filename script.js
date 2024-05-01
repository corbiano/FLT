let tsNotes = "";
let tsTitle = "";
let sidebar = "";
let tempNotes = "";
let inputModal = "";
let outputModal = "";
let group = ""

let canRun = false;

switch (document.title) {
    case "DOC - Frontline":
        tsNotes = "Frontline_TechnicalTroubleshootingNotes";
	tsTitle = $("container-left-b").find("sectiontitle");

        inputModal = "#Modal_Frontline";
        outputModal = "#Modal_CopyPaste_Frontline";

        sidebar = "#Frontline_TemplateHelper";

        tempNotes = "#Frontline_TempNotes";

        $("#Frontline_InteractionDetails").css("cursor", "text");
        $(`#${tsNotes}`).css("cursor", "text");
        $("#Frontline_BackgroundInfo").css("cursor", "text");
        $("#Frontline_StepsTaken").css("cursor", "text");
        $("#Frontline_NextStep").css("cursor", "text");
        $(tempNotes).css("cursor", "text");

        group = "Frontline"
        
        canRun = true;
        break;
    case "DOC - Proactive Support":
        tsNotes = "ProactiveSupportGroups_TechnicalTroubleshootingNotes";
        
        inputModal = "#Modal_ProactiveSupportGroups";
        outputModal = "#Modal_CopyPaste_ProactiveSupportGroups";

        sidebar = "#ProactiveSupportGroups_TemplateHelper";
        
        tempNotes = "#ProactiveSupportGroups_TempNotes";
        
        $("#ProactiveSupportGroups_InteractionDetails").css("cursor", "text");
        $(`#${tsNotes}`).css("cursor", "text");
        $("#ProactiveSupportGroups_BackgroundInfo").css("cursor", "text");
        $("#ProactiveSupportGroups_StepsTaken").css("cursor", "text");
        $("#ProactiveSupportGroups_NextStep").css("cursor", "text");
        $(tempNotes).css("cursor", "text");
	


        group = "ProactiveSupportGroups"
        
        canRun = true;
        break;

    default:
        alert("This template page is not yet supported");
        break;
}

if (canRun) {
    const toolExtensionID = "apoimnejodnlchgeggcckdglipheigpn";

    let openNMP = localStorage.getItem("openNMP")
        ? JSON.parse(localStorage.getItem("openNMP"))
        : true;
    let autoSaveInterval = localStorage.getItem("autoSaveInterval")
        ? JSON.parse(localStorage.getItem("autoSaveInterval"))
        : 60;
    let getIPsecInterface = localStorage.getItem("getIPsecInterface")
        ? JSON.parse(localStorage.getItem("getIPsecInterface"))
        : false;
    let templateSeparator = localStorage.getItem("templateSeparator")
        ? JSON.parse(localStorage.getItem("templateSeparator"))
        : false;
    let separationText = localStorage.getItem("separationText")
        ? localStorage.getItem("separationText")
        : "========================";
    let shortGWDetect = localStorage.getItem("shortGWDetect")
        ? JSON.parse(localStorage.getItem("shortGWDetect"))
        : true;
    let placeholderAnimation = localStorage.getItem("placeholderAnimation")
        ? JSON.parse(localStorage.getItem("placeholderAnimation"))
        : false;
    let uptimeUnderAsset = localStorage.getItem("uptimeUnderAsset")
        ? JSON.parse(localStorage.getItem("uptimeUnderAsset"))
        : true;
    let noSubmitAnimation = localStorage.getItem("noSubmitAnimation")
        ? JSON.parse(localStorage.getItem("noSubmitAnimation"))
        : false;
    let noSubTemplateAnimation = localStorage.getItem("noSubTemplateAnimation")
        ? JSON.parse(localStorage.getItem("noSubTemplateAnimation"))
        : false;

    if (noSubmitAnimation) {
        $(inputModal).css("transition", "none");
        $(outputModal).css("transition", "none");
    } else {
        $(inputModal).css("transition", "");
        $(outputModal).css("transition", "");
    }

    if (noSubTemplateAnimation) {
        $(".SubTemplateRow").css("transition", "none");
        $(".subtemplatesection").css("transition", "none");
    } else {
        $(".SubTemplateRow").css("transition", "");
        $(".subtemplatesection").css("transition", "");
    }


    localStorage.setItem("openNMP", openNMP);
    localStorage.setItem("autoSaveInterval", autoSaveInterval);
    localStorage.setItem("getIPsecInterface", getIPsecInterface);
    localStorage.setItem("templateSeparator", templateSeparator);
    localStorage.setItem("separationText", separationText);
    localStorage.setItem("shortGWDetect", shortGWDetect);
    localStorage.setItem("placeholderAnimation", placeholderAnimation);
    localStorage.setItem("uptimeUnderAsset", uptimeUnderAsset);
    localStorage.setItem("noSubmitAnimation", noSubmitAnimation);

    $(`#${tsNotes}`).css("maxHeight", "calc(100vh - 468px)");

    $("#Frontline_InteractionDetails").css("cursor", "text");

    $(`#${tsNotes}`).css("cursor", "text");

    $("#Frontline_BackgroundInfo").css("cursor", "text");

    $("#Frontline_StepsTaken").css("cursor", "text");

    $("#Frontline_NextStep").css("cursor", "text");

    $(tempNotes).css("cursor", "text");


$(`#Frontline_TechnicalTroubleshootingNotes`).parent().parent().find(`.sectiontitle`).html(`

<input type="text" class="fieldformtext" style="width: auto;" id="assetBox" placeholder="Asset ID" autocomplete="off">

<button type="submit" class="templatebutton" onclick="getAssets()">Run Tools</button>

`);
    

    try {
        chrome.runtime.sendMessage(
            toolExtensionID,
            {
                request: "heartbeat",
            },
            function (response) {
                console.log("Extension Ready");
            }
        );
    } catch (error) {
        open(
            "https://chromewebstore.google.com/detail/find-nmp-device/apoimnejodnlchgeggcckdglipheigpn"
        );
    }

    $(sidebar).append(
        `<div class="accordion" id="SettingsHeader">
    <i style="float:left; font-size: 14px;margin-top: 2px; margin-left: 5px;margin-right: 11px;" class="ResourceIcon fas fa-gear"></i>
    Tool Runner Settings
    </div>`
    );

    $("#SettingsHeader").on("click", function () {
        this.classList.toggle("activeacc");
        var panel = this.nextElementSibling;

        $("#openNMP")[0].checked = openNMP;
        $("#IPSecInterface")[0].checked = getIPsecInterface;
        $("#shortGWDetect")[0].checked = shortGWDetect;
        $("#uptimeUnderAsset")[0].checked = uptimeUnderAsset;
        $("#templateSeparator")[0].checked = templateSeparator;
        $("#separationText")[0].hidden = !templateSeparator;
        $("#separationText")[0].value = separationText;
        $("#noSubmitAnimation")[0].checked = noSubmitAnimation;
        $("#noSubTemplateAnimation")[0].checked = noSubTemplateAnimation;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });

    $(sidebar).append(
        `<div id="ToolRunnerSettings" class="panel" style="padding: 0px;">
        <div class="col-subtemplates-1" style="width: 100%;padding: 10px 3px 0px 3px;">
            <div class="ToolResourceBox" style="padding:0px;">
                <table border="0" style="font-size:12px;">
                    <tbody id="ToolTable">
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`
    );

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Opens asset in NMP when running tools">
            Auto Open NMP
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="openNMP">
        </td>
    </tr>`
    );

    $("#openNMP")[0].checked = openNMP;

    $("#openNMP").on("change", function () {
        openNMP = $("#openNMP")[0].checked;
        localStorage.setItem("openNMP", openNMP);
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Gets the IPSec tunnel status in the interface status">
            IPSec Interface
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="IPSecInterface">
        </td>
    </tr>`
    );

    $("#IPSecInterface")[0].checked = getIPsecInterface;

    $("#IPSecInterface").on("change", function () {
        getIPsecInterface = $("#IPSecInterface")[0].checked;
        localStorage.setItem("getIPsecInterface", getIPsecInterface);
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Only gets the Alive / Die line from the gateway detect result">
            Shorten Gateway Detect
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="shortGWDetect">
        </td>
    </tr>`
    );

    $("#shortGWDetect")[0].checked = shortGWDetect;

    $("#shortGWDetect").on("change", function () {
        shortGWDetect = $("#shortGWDetect")[0].checked;
        localStorage.setItem("shortGWDetect", shortGWDetect);
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Places the device's uptime underneath the asset ID, if off it is placed in the interface status">
            Uptime Under Asset
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="uptimeUnderAsset">
        </td>
    </tr>`
    );

    $("#uptimeUnderAsset")[0].checked = uptimeUnderAsset;

    $("#uptimeUnderAsset").on("change", function () {
        uptimeUnderAsset = $("#uptimeUnderAsset")[0].checked;
        localStorage.setItem("uptimeUnderAsset", uptimeUnderAsset);
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Adds a separator between the assets in tool results">
            Template Separator
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="templateSeparator">
            <input type="text" class="fieldformtext" style="width: auto;margin-bottom: -7px;margin-top: -10px;" id="separationText" placeholder="Separator Text" autocomplete="off"></input>
        </td>
    </tr>`
    );

    $("#templateSeparator")[0].checked = templateSeparator;

    $("#separationText")[0].hidden = !templateSeparator;
    $("#separationText")[0].value = separationText;

    $("#templateSeparator").on("change", function () {
        templateSeparator = $("#templateSeparator")[0].checked;
        $("#separationText")[0].hidden = !templateSeparator;
        localStorage.setItem("templateSeparator", templateSeparator);
    });

    $("#separationText").on("change", function () {
        separationText = $("#separationText")[0].value;

        localStorage.setItem("separationText", separationText);
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Disables animations on submitting notes">
            Remove Submit Animation
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="noSubmitAnimation">
        </td>
    </tr>`
    );

    $("#noSubmitAnimation")[0].checked = noSubmitAnimation;

    $("#noSubmitAnimation").on("change", function () {
        noSubmitAnimation = $("#noSubmitAnimation")[0].checked;
        localStorage.setItem("noSubmitAnimation", noSubmitAnimation);
        if (noSubmitAnimation) {
            $(inputModal).css("transition", "none");
            $(outputModal).css("transition", "none");
        } else {
            $(inputModal).css("transition", "");
            $(outputModal).css("transition", "");
        }
    });

    $("#ToolTable").append(
        `<tr>
        <td style="width: 50%; text-align: right;" title="Disables animations on opening and switching subtemplates">
            Remove Subtemplate Animations
        </td>
        <td style="width: 50%;">
            <input type="checkbox" id="noSubTemplateAnimation">
        </td>
    </tr>`
    );

    $("#noSubTemplateAnimation")[0].checked = noSubTemplateAnimation;

    $("#noSubTemplateAnimation").on("change", function () {
        noSubTemplateAnimation = $("#noSubTemplateAnimation")[0].checked;
        localStorage.setItem("noSubTemplateAnimation", noSubTemplateAnimation);
        if (noSubTemplateAnimation) {
            $(".SubTemplateRow").css("transition", "none");
            $(".subtemplatesection").css("transition", "none");
        } else {
            $(".SubTemplateRow").css("transition", "");
            $(".subtemplatesection").css("transition", "");
        }
    });

    function InboundTaskTypeSection(evt, ESCgroup, SubTemplateName) {
        var width = 1281

        if (ESCgroup == "Frontline") {
            if (width > 1280) {
                document.getElementById(
                    ESCgroup + "_InteractionDetails"
                ).style.maxHeight = "calc(100vh - 420px)";
                document.getElementById(
                    ESCgroup + "_InteractionDetails"
                ).style.height = "100%";

                document.getElementById(
                    ESCgroup + "_TechnicalTroubleshootingNotes"
                ).style.maxHeight = "calc(100vh - 420px)";
                document.getElementById(
                    ESCgroup + "_TechnicalTroubleshootingNotes"
                ).style.height = "100%";
            }

            if (SubTemplateName == "Live Chat Session") {
                document.getElementById(
                    ESCgroup + "_Live Chat Session"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_Live Chat Session"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_Live Chat Session")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 574px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 622px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_Live Chat Session"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_Live Chat Session"
                ).style.display = "none";
            }

            if (SubTemplateName.endsWith("Call")) {
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_InboundCallDetails")
                        .scrollHeight + "px";

                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 465px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 513px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.display = "none";
            }
        }

        if (ESCgroup == "ControlDesk") {
            if (width > 1280) {
                document.getElementById(
                    ESCgroup + "_InteractionDetails"
                ).style.maxHeight = "calc(100vh - 420px)";
                document.getElementById(
                    ESCgroup + "_TechnicalTroubleshootingNotes"
                ).style.maxHeight = "calc(100vh - 420px)";
            }

            if (SubTemplateName == "Customer Escalation") {
                document.getElementById(
                    ESCgroup + "_Customer Escalation"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_Customer Escalation"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_Customer Escalation")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 529px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 529px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_Customer Escalation"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_Customer Escalation"
                ).style.display = "none";
            }

            if (SubTemplateName.endsWith("Hughes Escalation")) {
                document.getElementById(
                    ESCgroup + "_InboundEmailDetails"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_InboundEmailDetails"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_InboundEmailDetails")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 465px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 465px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_InboundEmailDetails"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_InboundEmailDetails"
                ).style.display = "none";
            }
        }

        if (ESCgroup == "AdvSupport") {
            if (width > 1280) {
                document.getElementById(
                    ESCgroup + "_InteractionDetails"
                ).style.maxHeight = "calc(100vh - 420px)";
                document.getElementById(
                    ESCgroup + "_TechnicalTroubleshootingNotes"
                ).style.maxHeight = "calc(100vh - 420px)";
            }

            openSubTemplate(
                event,
                "AdvSupport",
                "AdvSupport_ST_WWTSRepair",
                "Close"
            );
            openSubTemplate(
                event,
                "AdvSupport",
                "AdvSupport_ST_Install",
                "Close"
            );
            openSubTemplate(event, "AdvSupport", "AdvSupport_ST_POS", "Close");
            openSubTemplate(
                event,
                "AdvSupport",
                "AdvSupport_ST_Escalation",
                "Close"
            );

            if (SubTemplateName == "WWTS Tech Call") {
                openSubTemplate(
                    event,
                    "AdvSupport",
                    "AdvSupport_ST_WWTSRepair",
                    "Open"
                );
            }
            if (SubTemplateName == "Installer Call") {
                openSubTemplate(
                    event,
                    "AdvSupport",
                    "AdvSupport_ST_Install",
                    "Open"
                );
            }
            if (SubTemplateName == "POS Vendor Call") {
                openSubTemplate(
                    event,
                    "AdvSupport",
                    "AdvSupport_ST_POS",
                    "Open"
                );
            }

            if (SubTemplateName == "ESC Agent Call") {
                document.getElementById(
                    ESCgroup + "_InboundCall_ESC"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_InboundCall_ESC"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_InboundCall_ESC")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 465px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 465px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_InboundCall_ESC"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_InboundCall_ESC"
                ).style.display = "none";
            }

            if (
                SubTemplateName.endsWith("Call") &&
                SubTemplateName != "ESC Agent Call"
            ) {
                document.getElementById(
                    ESCgroup + "_InboundCall_Other"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_InboundCall_Other"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_InboundCall_Other")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 465px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 465px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_InboundCall_Other"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_InboundCall_Other"
                ).style.display = "none";
            }
        }

        if (ESCgroup == "DigitalMedia") {
            if (width > 1280) {
                document.getElementById(
                    ESCgroup + "_InteractionDetails"
                ).style.maxHeight = "calc(100vh - 420px)";
                document.getElementById(
                    ESCgroup + "_TechnicalTroubleshootingNotes"
                ).style.maxHeight = "calc(100vh - 420px)";
            }

            if (SubTemplateName.endsWith("Call")) {
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.display = "block";
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.maxHeight =
                    document.getElementById(ESCgroup + "_InboundCallDetails")
                        .scrollHeight + "px";
                if (width > 1280) {
                    document.getElementById(
                        ESCgroup + "_InteractionDetails"
                    ).style.maxHeight = "calc(100vh - 465px)";
                    document.getElementById(
                        ESCgroup + "_TechnicalTroubleshootingNotes"
                    ).style.maxHeight = "calc(100vh - 465px)";
                }
            } else {
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.maxHeight = "0px";
                document.getElementById(
                    ESCgroup + "_InboundCallDetails"
                ).style.display = "none";
            }
        }

        if (ESCgroup == "ProactiveSupportGroups") {
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_Confirmation",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_Input",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_Monitoring",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_Weather",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_NAP",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_WWTSDispatch",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_VendorMeet",
                "Close"
            );
            openSubTemplate(
                event,
                "ProactiveSupportGroups",
                "ProactiveSupportGroups_ST_AIOps",
                "Close"
            );

            if (SubTemplateName == "AI Ops - New Case") {
                openSubTemplate(
                    event,
                    "ProactiveSupportGroups",
                    "ProactiveSupportGroups_ST_AIOps",
                    "Open"
                );
            }
        }
    }


    InboundTaskTypeSection(null, group, '')


    const tools = {
        Ping: "{PCs",
        PingHTS: "{PHm",
        PingECM: "{PCm",
        PingJupEntTerminal: "{PJm",
        PingOrCurrentStatusFortimgr: "{PFr",
        PingOrCurrentStatusMeraki: "{PMr",
        PingOrCurrentStatusVeloCloud: "{PVr",
        PingOrCurrentStatusWattbox: "{PWb",
        PingOrCurrentStatusHughesApe: "{PHa",
        PingInterfaces: "{In",
        getIPSecStatus: "{Ip",
        getSysArp: "{As",
        getRouterGWDetect: "{Gd",
    }; //dictionary of tools and the tags for the notes

    const assetOrder = [
        "Router",
        "Dedicated Fiber L3",
        "Dedicated IP BB",
        "Cable L3",
        "891F",
        "Acceleration Appliance",
        "Wireless Modem",
        "Modem",
        "IBR650C-150M-D",
        "Satellite Modem",
        "Wireline Modem",
        "Switch",
        "IoT Device",
    ]; //easiest way I could find to have the assets in a less random order

    const toolOrder = [
        "Ping",
        "PingHTS",
        "PingECM",
        "PingJupEntTerminal",
        "PingOrCurrentStatusFortimgr",
        "PingOrCurrentStatusMeraki",
        "PingOrCurrentStatusVeloCloud",
        "PingOrCurrentStatusWattbox",
        "PingOrCurrentStatusHughesApe",
        "PingInterfaces",
        "getIPSecStatus",
        "getSysArp",
        "getRouterGWDetect",
    ]; //provides order for the tool results to be uniform

    function firstContaining(lines, subString) {
        let index = lines.findIndex((element) => element.includes(subString));
        if (index !== -1) {
            return lines[index];
        } else {
            return "";
        }
    }

    function getAssets() {
        let assetID = document.getElementById("assetBox").value.trim();
        if (assetID == "") {
            return;
        }
        if (openNMP) {
            open(
                `https://faultuser.hughes.net/RapidSuite/externalObjectDetails.gsp?name=${assetID}`
            );
        }

        chrome.runtime.sendMessage(
            toolExtensionID,
            {
                request: "assets",
                assetID: assetID,
            },
            parseAssetResponse
        );
    }

    function parseAssetResponse(response) {
        let page = new DOMParser().parseFromString(response.page, "text/html");
        let assets = {
            0: {
                assetID: document.getElementById("assetBox").value.trim(),
                type: page.getElementsByClassName("table")[0].children[0]
                    .children[1].children[1].textContent,
            },
        };
        if (page.getElementById("otherDevicesTable")) {
            let otherDevicesTable =
                page.getElementById("otherDevicesTable").rows;
            for (let row = 1; row < otherDevicesTable.length; row++) {
                assets[row] = {
                    assetID:
                        otherDevicesTable[row].cells[0].children[0].innerHTML,
                    // name : otherDevicesTable[row].cells[1].innerHTML,
                    type: otherDevicesTable[row].cells[2].innerHTML,
                };
            }
        }
        // console.log(assets);
        createAssetTemplate(assets);
    }

    function createAssetTemplate(assets) {
        let template = "";
        // it is not the best means of doing this likely but
        // the nested loops go through the array of asset types from above
        // checks for all of the devices of that type from the list of assets from site
        // just to add the devices in the right order
        for (const type in assetOrder) {
            for (const asset in assets) {
                if (assets[asset].type == assetOrder[type]) {
                    if (templateSeparator) {
                        template += `${separationText}\n`;
                    }
                    template +=
                        assets[asset].type +
                        " " +
                        assets[asset].assetID +
                        ":\n{" +
                        assets[asset].assetID +
                        "}\n";
                }
            }
        }

        document.getElementById(tsNotes).value = template;
        getTools(assets);
    }

    function getTools(assets) {
        for (const asset in assets) {
            chrome.runtime.sendMessage(
                toolExtensionID,
                {
                    request: "tools",
                    assetID: assets[asset].assetID,
                    type: assets[asset].type,
                },
                parseAssetTools
            );
        }
    }

    function parseAssetTools(response) {
        let page = new DOMParser().parseFromString(response.page, "text/html");
        let assetID = response.assetID;
        let type = response.type;
        let troubleshooting = page.getElementById("troubleshootingActions");
        let advanced = page.getElementById("advancedActions");
        let toolList = { hasTools: false };
        for (let i = 0; i < troubleshooting.length; i++) {
            try {
                let tool = troubleshooting.options[i]
                    .getAttribute("onclick")
                    .split("action=")[1]
                    .split("', '")[0];
                if (tools[tool]) {
                    toolList[i] = {
                        id: tool,
                        name: troubleshooting[i].value,
                    };
                    toolList.hasTools = true;
                }
            } catch (error) {}
        }
        if (advanced) {
            for (let i = 0; i < advanced.length; i++) {
                try {
                    let tool = advanced.options[i]
                        .getAttribute("onclick")
                        .split("action=")[1]
                        .split("', '")[0];
                    if (tools[tool]) {
                        toolList[i + troubleshooting.length] = {
                            id: tool,
                            name: advanced[i].value,
                        };
                        toolList.hasTools = true;
                    }
                } catch (error) {}
            }
        }
        if (toolList.hasTools) {
            delete toolList.hasTools;
            createTemplate(type, assetID, toolList);
        } else {
            removeAsset(assetID);
        }
    }

    function createTemplate(type, assetID, toolList) {
        let template;
        let hasInterface = false;
        for (const tool in toolList) {
            if (toolList[tool].id == "PingInterfaces") hasInterface = true;
        }
        if (hasInterface && uptimeUnderAsset) {
            template = `{uT${assetID}}\n`;
        } else {
            template = "\n";
        }

        for (order in toolOrder) {
            for (const tool in toolList) {
                if (toolList[tool].id == toolOrder[order]) {
                    template +=
                        toolList[tool].name +
                        " -\n" +
                        tools[toolList[tool].id] +
                        assetID +
                        "}\n";
                }
            }
        }

        let n = document.getElementById(tsNotes).value;
        document.getElementById(tsNotes).value = n.replace(
            "{" + assetID + "}",
            template
        );
        runAllTools(type, assetID, toolList);
    }

    function removeAsset(assetID) {
        let str = document.getElementById(tsNotes).value;
        let n;
        n = str.split("\n");
        let lineNum = n.indexOf("{" + assetID + "}");
        if (lineNum == -1) {
            return;
        }
        if (templateSeparator) {
            n.splice(lineNum - 2, 3);
        } else {
            n.splice(lineNum - 1, 2);
        }
        n = n.join("\n").trim();
        document.getElementById(tsNotes).value = n;
    }

    function runAllTools(type, assetID, toolList) {
        for (const tool in toolList) {
            remoteRunTool(type, assetID, toolList[tool].id);
        }
    }

    function remoteRunTool(type, assetID, tool) {
        if (type != "Acceleration Appliance" && tool == "Ping") {
            tool = "Ping50";
        }

        chrome.runtime.sendMessage(
            toolExtensionID,
            {
                request: "run",
                assetID: assetID,
                tool: tool,
                type: type,
            },
            parseToolResults
        );
    }

    function parseToolResults(response) {
        let page = new DOMParser().parseFromString(response.page, "text/html");
        let assetID = response.assetID;
        let tool = response.tool == "Ping50" ? "Ping" : response.tool;
        let type = response.type;
        let results = "";
        try {
            switch (tool) {
                case "Ping":
                    results = page.getElementById("pingResults");
                    let pingResult = "";
                    let offset = results.children.length % 7 == 1 ? 3 : 2; //Hackiest bit of code so far, failed PCS on core2 has an extra child at the end that makes the result one earlier
                    pingResult =
                        results.children[
                            results.children.length - offset
                        ].textContent
                            .split("\n")
                            .slice(0, 3)
                            .join("\n") + "\n\n";
                    if (type.trim() == "Acceleration Appliance") {
                        try {
                            for (
                                let i = 0;
                                i < results.querySelectorAll("table").length;
                                i++
                            ) {
                                pingResult +=
                                    results.querySelectorAll("table")[i]
                                        .innerText + "\n";
                            }
                        } catch (exception) {}
                    }
                    addToolResult(assetID, tool, pingResult);
                    break;
                case "PingHTS":
                    results = page.getElementById("pingResults");

                    let pingHTSResult = results.children[8].innerText;
                    pingHTSResult += results.children[9].innerText;
                    pingHTSResult += results.children[10].innerText;

                    if (pingHTSResult.trim() == "") {
                        pingHTSResult += results.children[3].innerText;
                        pingHTSResult += results.children[4].innerText;
                    }
                    addToolResult(assetID, tool, pingHTSResult);
                    break;
                case "PingECM":
                    results = page.querySelectorAll("table");

                    let pingECMResult = tableParse(results[0]);
                    pingECMResult += `\n${tableParse(results[1])}`;

                    addToolResult(assetID, tool, pingECMResult);
                    break;
                case "PingJupEntTerminal":
                    results = page.querySelectorAll("table");

                    let pingJupiter = tableParse(results[0]);
                    if (results[1]) {
                        pingJupiter += `\n${tableParse(results[1])}`;
                    }

                    addToolResult(assetID, tool, pingJupiter);
                    break;
                case "PingOrCurrentStatusFortimgr":
                    results = page.getElementById("pingResults");

                    let pingFortimgrResult = tableParse(
                        results.querySelectorAll("table")[0]
                    );

                    addToolResult(assetID, tool, pingFortimgrResult);
                    break;
                case "PingOrCurrentStatusMeraki":
                    let pingMerakiResult = tableParse(
                        page.querySelector("table")
                    );
                    addToolResult(assetID, tool, pingMerakiResult);
                    break;
                case "PingOrCurrentStatusVeloCloud":
                    results = page.getElementById("pingResults");

                    let pingVeloCloudResult = tableParse(
                        results.querySelectorAll("table")[0]
                    ).trim();
                    pingVeloCloudResult +=
                        "\n" + tableParse(results.querySelectorAll("table")[1]);
                    if (results.querySelectorAll("table").length > 2) {
                        pingVeloCloudResult +=
                            "\n" +
                            tableParse(results.querySelectorAll("table")[2]);
                    }
                    // .innerText.split("\n")
                    // .map((s) => s.trim())
                    // .join("\n")
                    // .replace(/\n{3,}/g, "|")
                    // .replace(/\n{1}/g, " ")
                    // .replaceAll("|", "\n")
                    // .trim();

                    addToolResult(assetID, tool, pingVeloCloudResult);
                    break;
                case "PingInterfaces":
                    results = page.querySelector("table");
                    let uptime = page.querySelectorAll("b");
                    let interfaceResult;
                    if (results) {
                        interfaceResult = results.innerText
                            .replaceAll(" ", "")
                            .split("\n\n")
                            .filter((line) => line.includes("wan"))
                            .join(".")
                            .replaceAll("\n", " ")
                            .replaceAll(".", "\n");
                        if (getIPsecInterface) {
                            interfaceResult +=
                                "\n" +
                                results.innerText
                                    .replaceAll(" ", "")
                                    .split("\n\n")
                                    .filter((line) =>
                                        line.includes("ipsec-tunnel")
                                    )
                                    .join(".")
                                    .replaceAll("\n", " ")
                                    .replaceAll(".", "\n");

                            interfaceResult +=
                                "\n" +
                                results.innerText
                                    .replaceAll(" ", "")
                                    .split("\n\n")
                                    .filter((line) =>
                                        line.includes("ipsec-backup")
                                    )
                                    .join(".")
                                    .replaceAll("\n", " ")
                                    .replaceAll(".", "\n");
                        }
                    }
                    if (uptime[2] && uptimeUnderAsset) {
                        // console.log(uptime)
                        addUptimeResult(
                            uptime[2].innerText.replace("=", "-"),
                            assetID
                        );
                    } else if (uptime[2] && !uptimeUnderAsset) {
                        interfaceResult += `\n\n${uptime[2].innerText.replace(
                            "=",
                            "-"
                        )}`;
                    } else {
                        removeUptimeResult(assetID);
                    }

                    addToolResult(assetID, tool, interfaceResult);
                    break;
                case "getIPSecStatus":
                    results = page.getElementById("pingResults");
                    let textResult = results.textContent.split("\n");

                    let IPSecResult =
                        firstContaining(textResult, "ipsec-tunnel") +
                        "\n" +
                        firstContaining(textResult, "ipsec-backup");

                    addToolResult(assetID, tool, IPSecResult);
                    break;
                case "getSysArp":
                    results = page.getElementById("pingResults");

                    let sysArpResult = results.textContent
                        .split("\n")
                        .filter((line) => line.includes("wan"))
                        .join("\n");

                    addToolResult(assetID, tool, sysArpResult);
                    break;
                case "getRouterGWDetect":
                    results = page.getElementById("pingResults");
                    let GWDetectResult = "";
                    if (shortGWDetect) {
                        GWDetectResult =
                            results.children[0].children[5].textContent
                                .split("\n")
                                .filter((line) => line.includes("WAN"))
                                .join("\n");

                        if (GWDetectResult.trim().length < 1) {
                            GWDetectResult =
                                results.children[0].children[5].textContent
                                    .split("\n")
                                    .filter((line) => line.includes("VLAN"))
                                    .join("\n");
                        }
                    } else {
                        GWDetectResult =
                            results.children[0].children[5].textContent
                                .split("#")[1]
                                .split("\n")
                                .slice(1, -1)
                                .join("\n")
                                .split("\n\n")
                                .filter((line) => line.includes("wan"))
                                .join("\n\n");

                        if (GWDetectResult.trim().length < 1) {
                            GWDetectResult =
                                results.children[0].children[5].textContent
                                    .split("#")[1]
                                    .split("\n")
                                    .slice(1, -1)
                                    .join("\n")
                                    .split("\n\n")
                                    .filter((line) => line.includes("vlan"))
                                    .join("\n\n");
                        }
                    }
                    addToolResult(assetID, tool, GWDetectResult);
                    break;
                case "PingOrCurrentStatusWattbox":
                    results = page.getElementById("pingResults");
                    let WBPingResults = "";
                    WBPingResults = tableParse(
                        results.querySelectorAll("table")[0]
                    )
                        .split("\n")
                        .slice(0, 12)
                        .join("\n");
                    addToolResult(assetID, tool, WBPingResults);
                    break;
                case "PingOrCurrentStatusHughesApe":
                    results = page.getElementById("pingResults");
                    let HAPingResults = "";
                    HAPingResults = tableParse(
                        results.querySelectorAll("table")[1]
                    );
                    addToolResult(assetID, tool, HAPingResults);
                    break;
                default:
                    break;
            }
        } catch (error) {
            addToolResult(assetID, tool, "");
            console.error(assetID, tool, error);
        }
    }

    function addUptimeResult(uptime, asset) {
        let str = document.getElementById(tsNotes).value; //gets current tool results box contents
        let n;
        if (uptime.replace(/\s/g, "").length > 0) {
            n = str.replace(`{uT${asset}}`, uptime.trim() + "\n").trim(); //replaces the appropriate placeholder based on tool result
        } else {
            n = str.split("\n");
            let lineNum = n.indexOf(`{uT${asset}}`);
            if (lineNum != -1) {
                n[lineNum] = "";
            }
            n = n.join("\n").trim();
        }
        document.getElementById(tsNotes).value = n; //sets the box value to the new value with the tool result inserted in place of the tag
    }

    function removeUptimeResult(asset) {
        let str = document.getElementById(tsNotes).value; //gets current tool results box contents
        let n;

        n = str.split("\n");
        let lineNum = n.indexOf(`{uT${asset}}`);
        if (lineNum != -1) {
            n[lineNum] = "";
        }
        n = n.join("\n").trim();
        document.getElementById(tsNotes).value = n; //sets the box value to the new value with the tool result inserted in place of the tag
    }

    function addToolResult(assetID, tool, res) {
        let str = document.getElementById(tsNotes).value; //gets current tool results box contents
        let n;
        if (res && typeof res === "string") {
            if (res.replace(/\s/g, "").length > 0) {
                n = str
                    .replace(tools[tool] + assetID + "}", res.trim() + "\n")
                    .trim(); //replaces the appropriate placeholder based on tool result
            } else {
                n = str.split("\n");
                let lineNum = n.indexOf(tools[tool] + assetID + "}");
                if (lineNum != -1) {
                    n.splice(lineNum - 1, 2);
                }
                n = n.join("\n").trim();
            }
        } else {
            n = str.split("\n");
            let lineNum = n.indexOf(tools[tool] + assetID + "}");
            if (lineNum != -1) {
                n.splice(lineNum - 1, 2);
            }
            n = n.join("\n").trim();
        }
        document.getElementById(tsNotes).value = n; //sets the box value to the new value with the tool result inserted in place of the tag
    }

    function tableParse(HTMLtable) {
        let output = "";
        for (let row = 0; row < HTMLtable.rows.length; row++) {
            for (
                let cell = 0;
                cell < HTMLtable.rows[row].cells.length;
                cell++
            ) {
                output += `${HTMLtable.rows[row].cells[
                    cell
                ].innerText.trim()}\t`;
            }
            output = output.trim() + "\n";
        }
        return output.trim();
    }

    $(
        tempNotes
    )[0].placeholder = `Click here to document temp notes (not included in the documentation template).

The information in this section will be saved automatically and restored when loading the tool script`;

    $(tempNotes)[0].value = localStorage.getItem("StickyNotes")
        ? localStorage.getItem("StickyNotes")
        : "";

    localStorage.setItem("StickyNotes", $(tempNotes)[0].value);

    $(tempNotes).on("change", function () {
        localStorage.setItem("StickyNotes", $(tempNotes)[0].value);
    });

    function styleTemp(){
	
	$("body").css("background-image", "linear-gradient(45deg, #1c1c1c, #1c1c1c)");
	$(`.docsmalllogo`).html("C̸̩͖̖͊͋̍A̴̡͖̿͋̓̈́͛̉͛̃͘͝Ŕ̶̨͔͉͛̇͋̌́̀̇̚ͅS̵̨̔̈́̓̀̈́͂O̴̖̮͂͋̋̐́̒̏̑͠͠N̶̗̞̬̹̙̤̙̻̭͐́̑̂̒̉͑͑̽͝S̸̡̮͔̻̬͚͈̝͈̋͜ ̴͎̦̗̓̎̇͗Ţ̷̯͒̃̀̐̔̃̐́͘È̶̡̞̗͓̻̐̐́̈́̎͆̊̉̕M̵̯̮̪̲̠̀̊P̵̳͌́̚͜Ḽ̸̙͍͙͇͖̤̬̤̒̓̑̑Ạ̴̢̡̑̇͆̓̔͛͂̓͠͠T̵̛̛̟̦̲͎̉̇͗̽̆͆̇̔Ȅ̵̱̮̯͑̓̄̀̔̽͜")
	$('.sectiontitle').css("background-color", "#855672");
	$('.container-left').css("background-color", "#00000");
	$('.panel').css("background-color", "#00000");
	$('.panel').css("background-image", "linear-gradient(45deg, black, black)");
	$('.collapslist').css("background-image", "linear-gradient(45deg, black, black)");
	$('.fieldformselect').css("background-image", "linear-gradient(45deg, black, black)");
	$('.fieldformtext').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left-a').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left-b').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left-1').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left-2').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left-3').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-right').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-right-a').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-right-b').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-left').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-output-right').css("background-image", "linear-gradient(45deg, black, black)");
	$('.container-output-left').css("background-image", "linear-gradient(45deg, black, black)");
	$('.Frontline_ESCSpecialTemplatecontainer').css("background-image", "linear-gradient(45deg, black, black)");
	$('.Frontline_ESCSpecialTemplatecontainer').css("background-color", "#00000");
	$('.borderlight').css("background-image", "linear-gradient(45deg, black, black)");
	$('.borderlight').css("border-radius", "10px");
	$('.borderlight').css("border-top", "none");
	$('.borderdark').css("border-bottom", "none");
	$('textarea').css("background-color", "transparent");
	$('.DOCSmallIcon').css("color", "#ffffff");
	$('.SubTemplateIcon').css("color", "#ffffff");
	$('.ResourceIcon').css("color", "#ffffff");
	$('.templatebutton').css("padding", "0px 5px 0px 5px");
	document.querySelector(':root').style.setProperty("--color-13", "#1c1c1c");
	document.querySelector(':root').style.setProperty("--color-0B", "#fff");
	document.querySelector(':root').style.setProperty("--color-0C", "#FFFFFF");
	document.querySelector(':root').style.setProperty("--color-0D", "#855672");
	document.querySelector(':root').style.setProperty("--color-0I", "#855672");
	document.querySelector(':root').style.setProperty("--color-0J", "#FFFFFF");
	document.querySelector(':root').style.setProperty("--color-0K", "#FFFFFF");
	
	
    }
}
