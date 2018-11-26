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
    
    
    
    //iterate through elements to find USDEUR rate
    keys.forEach((element) => {
        quotesForView += "1 USD is equivalent to " + quotes[element] + " " + element + "<br>";
        
        //find USDEUR rate and assign to variable
        if(element == "USDEUR"){
            eur_rate = quotes[element];
            console.log(eur_rate);
            //console.log(quotes[element]);
        }
        
    });
    
    //write the intro and title to screen
    document.getElementById('title').innerHTML = "**** Dollar-Euro Currency Converter ****<br><br>";
    document.getElementById('intro').innerHTML = "Enter Currency Amount to Convert: <br><br>";
    // document.getElementById('status').innerHTML = quotesForView;
    //console.log(keys);

});





function convert() {
    var in_amtDollar, inAmtEuro, euro, dollar;
    //take in euro rate from API
    var rate = eur_rate;
    // take in Dollar Conversion Value
    in_amtDollar = document.getElementById("inAmtDollar").value;
    //take in Euro conversion value
    in_amtEuro = document.getElementById("inAmtEuro").value;    

    
    
    //alert(eur_rate);
    //alert(in_amt);
    //console.log(in_amt);
    //euro conversion
    euro = in_amtDollar * rate;
    //dollar conversion
    dollar = in_amtEuro / rate;

    //output entered currencies and rate to screen
    document.getElementById("enteredEuro").innerHTML = "Amount Entered Euro: " + in_amtEuro + "<br>";
    document.getElementById("enteredDollar").innerHTML = "Amount Entered Dollar: " + in_amtDollar + "<br>";
    document.getElementById("rate").innerHTML = "Current Rate: " + rate + "<br>";
    
    //output conversions to screen
    document.getElementById("convertedEuro").innerHTML = " Euro € " + euro.toFixed(2);
    document.getElementById("convertedDollar").innerHTML = " Dollar $ " + dollar.toFixed(2);
    //document.getElementById("inAmtEuro").value = euro.toFixed(2);
   //document.getElementById("inAmtDollar").value = dollar.toFixed(2);
};

//reset the values entered
function reset() {
    document.getElementById("form1").reset();
    document.getElementById("enteredEuro").innerHTML = "";
    document.getElementById("enteredDollar").innerHTML = "";
    document.getElementById("rate").innerHTML = "";
    document.getElementById("convertedEuro").innerHTML = "";
    document.getElementById("convertedDollar").innerHTML = "";
}
