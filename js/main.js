

//EDIT THESE LINES
//Title of the blog
var TITLE = "News Heading";
//RSS url http://goarbanjara.com/index.php?option=com_ninjarsssyndicator&feed_id=1&format=raw 
// http://aajtak.intoday.in.feedsportal.com/c/34152/f/618432/index.rss?option=com_rss&feed=RSS1.0&no_html=1&rsspage=home
 var RSS = "http://aajtak.intoday.in.feedsportal.com/c/34152/f/618432/index.rss?option=com_rss&feed=RSS1.0&no_html=1&rsspage=home ";
//Stores entries
var entries = [];
var selectedEntry = "";

//date format

//end date format


//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});

function renderEntries(entries) {

    var s = '';
	

    $.each(entries, function(i, v) {
        s += '<li><a href="#contentPage" style="text-decoration:none;" class="contentLink" data-entryid="'+i+'">' + v.title +'<div class="itemDate" style="text-decoration:none;">'+ v.publishedDate + '</div> </a></li>'; 
    });
	
    $("#linksList").html(s);
    $("#linksList").listview("refresh");
} 



// test scripts

//{ v = new Date(t.publishedDate); s += '<div class="itemDate">' + v.toLocaleDateString() + "</div>" }
// test scripts

//Listen for Google's library to load
function initialize() {
	console.log('ready to use google');
	var feed = new google.feeds.Feed(RSS);
	feed.setNumEntries(50);
	$.mobile.showPageLoadingMsg();
	feed.load(function(result) {
		$.mobile.hidePageLoadingMsg();
		if(!result.error) {
			entries = result.feed.entries;
			localStorage["entries"] = JSON.stringify(entries);
			renderEntries(entries);
		} else {
			console.log("Error - "+result.error.message);
			if(localStorage["entries"]) {
				$("#status").html("Using cached version...");
				entries = JSON.parse(localStorage["entries"]);
				renderEntries(entries);
			} else {
				$("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			}
		}
	});
}

//Listen for main page
$("#mainPage").live("pageinit", function() {
	//Set the title
	$("h1", this).text(TITLE ) ;
	
	google.load("feeds", "1",{callback:initialize});
});

$("#mainPage").live("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
		$("h1", data.prevPage).text("");
		$("#date", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
});

//Listen for the content page to load
$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text(entries[selectedEntry].title);
	$("#date", this).text(entries[selectedEntry].publishedDate);

	var contentHTML = "";
	contentHTML += entries[selectedEntry].content;
	// contentHTML += '<p/><a href="'+entries[selectedEntry].link + '" class="fullLink" data-role="button">Read Entry on Site</a>';
	$("#entryText",this).html(contentHTML);
	$("#entryText .fullLink",this).button();

});
	
$(window).on("touchstart", ".fullLink", function(e) {
	e.preventDefault();
	window.plugins.childBrowser.showWebPage($(this).attr("href"));
});

