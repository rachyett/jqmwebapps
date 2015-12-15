$(document).ready(function() {
  $(document).on("pageshow", "[data-role='page']", function() {
     if ($($(this)).hasClass("header_default")) {
     	$('<div data-theme="b" data-role="header"><h1></h1><a href="" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back" data-rel="back">Back</a><a href="#mydialog" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-info">Info</a></div>')
		.appendTo( $(this) )
		.toolbar({position: "fixed" });
		$("[data-role='header'] h1").text($(this).jqmData("title"));
		}  // if header default
		$.mobile.resetActivePageHeight();
	if ($($(this)).hasClass("footer_default")) {
		$('<div data-theme="b" data-role="footer" data-position="fixed"><nav data-role="navbar"><ul><li><a href="#home" class="ui-btn ui-icon-home ui-btn-icon-top">Home</a></li><li><a href="#blog" class="ui-btn ui-icon-edit ui-btn-icon-top">Blog</a></li><li><a href="#videos" class="ui-btn ui-icon-video ui-btn-icon-top">Videos</a></li><li><a href="#photos" class="ui-btn ui-icon-camera ui-btn-icon-top">Photos</a></li><li><a href="#tweets" class="ui-btn ui-icon-comment ui-btn-icon-top">Tweets</a></li></ul></nav></div>')
		.appendTo( $(this) )
		.toolbar({position: "fixed" });
		}
    });  // show page
}); // document ready

function listPosts(data){
	var output ='<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';

	output += ' <ul data-role="listview" data-filter="true" data-input="#searchposts">';
	$.each(data.posts, function(key, val){
	
 		var tempDiv =   document.createElement("tempDiv"); 
 		tempDiv.innerHTML = val.excerpt;
 		$("a", tempDiv).remove();
 		var excerpt = tempDiv.innerHTML;

		output += '<li>';
		output += '<a href="#blogpost" onclick = "showPost(' + val.id + ')">';
		output += (val.thumbnail) ?
		 '<img src="' + val.thumbnail + '" alt="' + val.title + '">':
		 '<img src="images/viewsourcelogo.png" alt="View Source Logo">';
		output += '<h3>' + val.title + "</h3>";
		output += '<p>' + excerpt + "</p>";
		output += '</a>';
		output += '</li>';
	});  // go through each post
	output += "</ul>";

	$('#postlist').html(output);

	// listPosts	
}

function showPost(id) {
	 $.getJSON('http://www.seenewcastle.com/api/?json=get_post&post_id=' + id + '&callback=?',
	 	function(data) {
	 		var output = '<h3>' + data.post.title + '</h3>';
	 		output += data.post.content;
	 		$('#mypost').html(output);
	 	});
}

function listVideos(data) {
	console.log(data);
	var output = '';
	for (var i=0; i < data.items.length; i++)
	{
	var title = data.items[i].snippet.title;
	console.log(data.items[i].snippet.title);
	output += '<li>' + title + '</li>';
	}

$('#videolist').html(output);

} // listVideos

function listTweets(data) {
		console.log(data);
	var output = '<ul data-role="listview">';
	$.each(data, function(key,val) {
		var text = data[key].text;
		// var thumbnail = data[key].entities.media[0].media_url;
		// var thumbnail = data[key].extended_entities.media[0].media_url;
		
		var thumbnail = data[key].user.profile_image_url;
		thumbnail = thumbnail.substring(0, thumbnail.length - 11) + '_bigger.jpg';
		var name = data[key].user.name;
	
		// Parse URLs in twitter text
		text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(i) {
			var url = i.link(i);
			return url;
		});

		// Parse @mentions in twitter text
		text = text.replace(/[@]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("@",'');
			var url = i.link("http://twitter.com/" + item);
			return url;
		});

		// Hashtags in twitter text
		text = text.replace(/[#]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("#",'');
			var url = i.link("http://twitter.com/" + item);
			return url;
		});

	
	output += '<li>'; 
	output += '<img src="' + thumbnail + '" alt="Photo of ' + name + '" >';
	output += '<div>' + text + '</div>';
	output += '</li>';
	});  // go through each data
	
	output += '</ul>';
	$('#tweetlist').html(output);
}


function jsonFlickrFeed(data){

var output = '';
 for (var i=0; i < data.items.length; i++) {
 	var title = data.items[i].title;
 	var link = data.items[i].media.m;
 	link = link.replace(/\_m.jpg$/, '');
 	// var link = data.items[i].media.m.substring(0,57);
 	var blocktype = 
 	(( i % 4) === 3) ? 'd':
 	(( i % 4) === 2) ? 'c':
 	(( i % 4) === 1) ? 'b':
 	'a';
 	output += '<div class="ui-block-' + blocktype + '">';
 	output += '<a href="#showphoto" data-transition="fade" onclick="showPhoto(\'' + link + '\',\'' + title + '\')".>';
 	output += '<img src="' + link + '_q.jpg" alt="' + title + '">';
 	output += '</a>';
 	output += '</div>';
 }

 $('#photolist').html(output);
}


function showPhoto(link, title){
	var output = '<a href="#photos" data-transition="fade">';
 	output += '<img src="' + link + '_b.jpg" alt="' + title + '">';
	output += '</a>';
	$('#myphoto').html(output);

}