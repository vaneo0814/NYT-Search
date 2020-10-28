var apiKey = "XyM54fjceQQhdga75sky6bDDeuroFtGd";
//create empty varibale for where the input user values is going to go:
var searchTerm = "";
var numResults = "0";
var start = "0";
var end = "0";

//create a URL base: 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;

//variable to track number of articles retrieved
var articleCounter = 0;

//create an ajax call function.
//here we are creating 2 arguments in runQUERY, num of articles and the query URL
function runQuery(numArticles, queryURL) {
    //call ajax function
    $.ajax({
        method: "GET",
        url: queryURL
    }).done(function (NYTData) {
        console.log("THIS IS THE QUERY URL: " + queryURL);

        //clear out well section for each time user searches an article.
        $("#wellSection").empty();

        for (var i = 0; i < numArticles; i++) {
            console.log("Headline " + NYTData.response.docs[i].headline.main);
            console.log("Section name " + NYTData.response.docs[i].section_name);
            console.log("Date " + NYTData.response.docs[i].pub_date);
            console.log("Web URL " + NYTData.response.docs[i].web_url);
            console.log("Byline " + NYTData.response.docs[i].byline.original);

            //start dumping into html
            var wellSection = $("<div>"); //creating a div here, creating html dynamically thru js
            wellSection.addClass("well");
            wellSection.attr('id', "articleWell" + i); //i will start at 0 in for loop
            $("#wellSection").append(wellSection);
            //attach the content to the appropraite well ID
            $("#articleWell" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
            $("#articleWell" + i).append("<h4>" + NYTData.response.docs[i].section_name + "</h4>");
            $("#articleWell" + i).append("<h4>" + NYTData.response.docs[i].pub_date + "</h4>");
            $("#articleWell" + i).append("<h4>" + NYTData.response.docs[i].byline.original + "</h4>");
            //since this one is the actual web link to the article lets make it an <a> tag so that its clickable.  
            $("#articleWell" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>" + "<hr>");
        }
    })
} $("#search").on("click", function () {
    //Get search term
    searchTerm = $("#searchTerm").val().trim();

    //add in the search term:
    var newURL = queryURLBase + "&q=" + searchTerm;

    //add in the number of records to be displayed
    numResults = $("#numberRecords").val(); //no .trim here bc its a select box as oppose to an input.

    //add in the start year
    start = $("#startYear").val().trim();
    //add in the end year
    end = $("#endYear").val().trim();

    //now because the parameters (search year and end year) are optional inputs we wants to do an if statement, if user inputs this parameter do if statements:
    if (parseInt(start)) {
        //add in the month and date if they do put in a beg date because that is what is required from NYT
        start = start + "0101";
        newURL = newURL + "&begin_date=" + start;
    }
    if (parseInt(end)) {
        //add in the month and date if they do put in a end date because that is what is required from NYT
        end = end + "0101";
        newURL = newURL + "&end_date=" + end;
    }

    //sends the ajax call the num results and the new url for the 2 arguments that are above.
    runQuery(numResults, newURL);
})

$("#clear").on("click", function(){
    $("#wellSection").empty();
});
