 var strRequest;
 var strLatest;
 var mmToMonth;
 
 var strRateTitel;
 var strRateMsg;
 var strRateButtons;
 
 
 var strings_en = {
    "taxhead" : "Tax",
    "currhead" : "Currency",
	"ratehead" : "rate $1=",
	"swipehead" : "< swipe to change / shake to reset >",
	"wothead" : "amount without tax",
	"wthead" : "amount with tax",
	"sethead" : "Settings",
	"taxswipehead" : "< swipe to change tax >",
	"updaterates" : "Update rates",
	"credits" : "The exchange rates are provided by the <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates Project</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">Follow How much Euro? on Twitter</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">Like How Much Euro? on Facebook</a>"
};
 var strings_pt = {
    "taxhead": "Imposto",
    "currhead": "Moeda",
	"ratehead": "taxa 1$=",
	"swipehead": "< deslize para mod. / agite para anular >",
	"wothead": "montante sem taxa",
	"wthead": "montante com taxa",
	"sethead": "Definições",
	"taxswipehead": "< deslize para modificar a taxa >",
	"updaterates": "Atualizar taxas",
	"credits": "As taxas de câmbio são disponibilizadas pela <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">Siga How much Euro? no Twitter</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">How Much Euro? no Facebook</a>"
};

 var strings_de = {
    "taxhead": "Steuer",
    "currhead": "Währung",
	"ratehead": "Kurs 1$=",
	"swipehead": "< Swipe = Ändern / Schütteln = $0 >",
	"wothead": "Betrag ohne Steuer",
	"wthead": "Betrag mit Steuer",
	"sethead": "Einstellungen",
	"taxswipehead": "< Swipe um Steuer zu ändern >",
	"updaterates": "Wechselkurs aktualisieren",
	"credits": "Wechselkurse bereitgestellt durch <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates Project</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">How much Euro? auf Twitter folgen</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">How Much Euro? auf Facebook</a>"
};

 var strings_it = {
    "taxhead": "Tassa",
    "currhead": "Valuta",
	"ratehead": "Scambio",
	"swipehead": "< tocca per cambiare/scuoti per azzerare >",
	"wothead": "somma senza tassa",
	"wthead": "somma con tassa",
	"sethead": "Impostazioni",
	"taxswipehead": "< tocca per cambiare tassa >",
	"updaterates": "Aggiorna scambi",
	"credits": "Scambi messi a disposizione grazie a <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates Project</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">Segui How much Euro? su Twitter</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">How Much Euro? su Facebook</a>"
};

 var strings_fr = {
    "taxhead": "impôt",
    "currhead": "monnaie",
	"ratehead": "cours",
	"swipehead": "< glisser=changer/secouez=réinitialiser >",
	"wothead": "montant sans taxe",
	"wthead": "montant avec la taxe",
	"sethead": "Paramètres",
	"taxswipehead": "< glisser pour changer d'impôt >",
	"updaterates": "Actualiser les taux de change",
	"credits": "Les taux de change sont fournis par le <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates Project</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">Suivre How much Euro? sur Twitter</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">How Much Euro? sur Facebook</a>"
};

 var strings_es = {
    "taxhead" : "impuesto",
    "currhead" : "moneda",
	"ratehead" : "tipo 1$=",
	"swipehead" : "< deslice=cambiar / agitar=restablecer >",
	"wothead" : "cantidad sin impuestos",
	"wthead" : "cantidad con el impuesto",
	"sethead" : "Ajustes",
	"taxswipehead" : "< deslice para cambiar impuestos >",
	"updaterates" : "Actualizar	 tipos de cambio",
	"credits" : "Los tipos de cambio proporcionados por <a href=\"http://openexchangerates.org/\">Open Source Exchange Rates Project</a>.<br/><br/><a href=\"http://twitter.com/howmucheuro\">Siguenos How much Euro? en Twitter</a><br/><br/><a href=\"http://facebook.com/howmucheuro\">How Much Euro? en Facebook</a>"
};

function Setlanguage() {

var lang;
var workstring;

// PhoneGap on Android would always return EN in navigator.*language.
// Parse userAgent instead
// Mozilla/5.0 (Linux; U; Android 2.2; de-ch; HTC Desire Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
if ( navigator && navigator.userAgent
        && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))
) {
        lang = lang[1];
}


if (!lang && navigator) {

        if (navigator.language) {
                lang = navigator.language;
        } else if (navigator.browserLanguage) {
                lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
                lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
        }
		lang = lang.substr(0, 2);
}

logger("####: " + lang);

switch(lang)
{
	case "en":
	workstring = strings_en;
	strRequest = "Requesting rates..."
	strLatest = "Latest rates: "
	mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	strRateTitel="Rate How Much Euro?";
	strRateMsg="Would you like review this App?";
	strRateButtons="Yes,Later,No";
	break;
	
	case "de":
	workstring = strings_de;
	strRequest = "Anfrage läuft..."
	strLatest = "Aktueller Kurs: "
	mmToMonth = new Array("Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez");
	strRateTitel="How Much Euro? bewerten";
	strRateMsg="Wie gefällt die diese App? Möchten Sie eine Bewertung abgeben?";
	strRateButtons="Ja,Später,Nein";
	break;
	
	case "it":
	strRequest = "Richiesta iniziata..."
	strLatest = "Cambio attualizzato: "
	mmToMonth = new Array("Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic");
	workstring = strings_it;
	strRateTitel="Valuta e Recensisci";
	strRateMsg="Desidera valutare l'applicazione?";
	strRateButtons="Si,Più tardi,No";
	break;
	
	case "pt":
	strRequest = "Solicitando taxas..."
	strLatest = "Últimas taxas: "
	mmToMonth = new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez");
	workstring = strings_pt;
	strRateTitel="Avalie & Comentar";
	strRateMsg="Gostaria avalie este aplicativo?";
	strRateButtons="Sim,Mais tarde,Não";
	break;

	case "es":
	strRequest = "Solicitud de los tipos..."
	strLatest = "Últimos: "
	mmToMonth = new Array("enero", "feb", "marzo", "abr", "mayo", "jun", "jul", "agosto", "set", "oct", "nov", "dic");
	workstring = strings_es;
	strRateTitel="Puntar y Comentar";
	strRateMsg="¿Le gustaría puntar esta aplicación?";
	strRateButtons="Sí,Adelante,No";
	break;
	
	case "fr":
	strRequest = "Demande a commencé..."
	strLatest = "Courant: "
	mmToMonth = new Array("janv", "fevr", "mars", "avril", "mai", "juin", "juil", "aout", "sept", "oct", "nov", "dec");
	workstring = strings_fr;
	strRateTitel="Note et commentaire";
	strRateMsg="Aimeriez-vous donnez votre avis?";
	strRateButtons="Oui,Plus tard,Aucune";

	break;
	
	default:
	workstring = strings_en;
	strRequest = "Requesting rates..."
	strLatest = "Latest rates: "
	mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	strRateTitel="Rate How Much Euro?";
	strRateMsg="Would you like review this App?";
	strRateButtons="Yes,Later,No";
	break;

}

$.each(workstring,function(key, value) {
$('#'+key).html(value);
logger('#'+key+ " " + value);
});

}