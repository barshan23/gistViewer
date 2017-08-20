var page = 1;
function cardContent(gist) {
	var time = gist['updated_at'];
	time = time.slice(0,time.search("T"));
	console.log(time);
	time = time.split('-');
	console.log(time);
	return '<div class="col s12 m6 l4">\
				<div class="card-panel hoverable">\
					<div class="card-content">\
						<span class="card-title">User: '+gist['user']+'</span><br />\
						<span >	Updated at: '+time[2]+'/'+time[1]+'/'+time[0]+'</span>\
						<p class="truncate">Description:'+(gist['description']?
							gist['description']:"No Description")+'</p> \
					</div>\
					<div class="card-action"><a href='+gist['html_url']+'>Learn More</a></div>\
				</div>\
			</div>';
}
function ajx(page) {
	$.ajax({
		url:'https://api.github.com/gists/public?page='+page+'&per_page=12', 
		success:function(result) {
			console.log(result);
			//console.log(result[0]['commits_url']);
			$.each(result, function(i, gist){
				//console.log(gist['html_url']);
				$(".row").append(cardContent(gist));
			});
		}
	});
}
$(document).ready(function(){
	ajx(page);
	$("button").click(function(){
		page += 1;
		ajx(page);
	});
});
