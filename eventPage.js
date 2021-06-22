var menuItem = {
    "id": "getty",
    "title": "Download Getty Image",
    "contexts": ["image"],
    "documentUrlPatterns":["https://www.gettyimages.co.uk/*"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	var imgUrl = clickData.srcUrl;
	const id = imgUrl.split('m=')[1].split('&')[0];
	let url1 = "https://media.gettyimages.com/photos/-id%s?s=2048x2048&w=125";
	let url2 = "https://media.gettyimages.com/photos/-id%s?s=2048x2048&w=5";
	url1 = url1.replace('%s', id);
	url2 = url2.replace('%s', id);
	console.log(id);
	console.log(url1);
	console.log(url2);

	var sources = {
		img1: url1,
		img2: url2
    };
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources) {
	  numImages++;
	}
	for(var src in sources) {
	  images[src] = new Image();
	  images[src].crossOrigin= '*';
	  images[src].onload = function() {
		if(++loadedImages >= numImages) {
			var canvas = window.document.createElement('canvas');
			canvas.width = images.img1.width;
			canvas.height = images.img1.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(images.img1, 0, 0, images.img1.width, images.img1.height);
			let sx = images.img2.width/4;
			let sy = images.img2.height/4;
			let sWidth = images.img2.width/2;
			let sHeight = images.img2.height/2;
			ctx.drawImage(images.img2, sx, sy, sWidth, sHeight, sx, sy, sWidth, sHeight);
			canvas.toBlob(function(blob) {
				saveAs(blob, "getty.png");
			});
	
		}
	  };
	  images[src].src = sources[src];
	}
});

