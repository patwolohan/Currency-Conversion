// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');



});

var eur_rate = 1;


$$.getJSON("http://www.apilayer.net/api/live?access_key=2460d56dd4475d384807c7a7844c1281", function (data) {

    var quotesForView = "";
    var quotes = data.quotes;
    var keys = Object.keys(quotes);
    
    
    

    keys.forEach((element) => {
        quotesForView += "1 USD is equivalent to " + quotes[element] + " " + element + "<br>";
        if(element == "USDEUR"){
            eur_rate = quotes[element];
            //console.log(eur_rate);
            //console.log(quotes[element]);
        }
        
    });
    
    document.getElementById('title').innerHTML = "**** Dollar Euro Currency Converter ****<br><br>";
    document.getElementById('intro').innerHTML = "Enter Dollar Amount to Convert: <br><br>";
    // document.getElementById('status').innerHTML = quotesForView;
    //console.log(keys);

});






function convert() {
    var in_amt, euro;
    var rate = eur_rate;

    in_amt = document.getElementById("inAmt").value;

    if(in_amt == "" || in_amt == 0 || in_amt <0 || isNaN(in_amt)){
        alert("Invalid Entry");
        document.getElementById("inAmt").innerHTML = "";
        reset();
        return;
        }
    
    //alert(eur_rate);
    //alert(in_amt);
    //console.log(in_amt);
    euro = in_amt * rate;

    document.getElementById("entered").innerHTML = "Dollar Amount Entered: " + "$" + in_amt + "<br>";
    document.getElementById("rate").innerHTML = "Current Rate: " + rate + "<br>";
    // document.getElementById("converted").innerHTML = "Euro Amount: " + "€" + euro.toFixed(2) + "<br>";
    document.getElementById("converted").value = "€ " + euro.toFixed(2);

};

function reset() {
    document.getElementById("form1").reset();
    document.getElementById("entered").innerHTML = "";
    document.getElementById("rate").innerHTML = "";
    document.getElementById("converted").value = "";
}
