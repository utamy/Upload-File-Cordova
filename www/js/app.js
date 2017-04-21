var myApp = new Framework7({
    modalTitle: 'Chat',
    animateNavBackIcon: true,
    init: false
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
myApp.onPageInit('index', function(page){

	var reader = new FileReader();
	

	reader.addEventListener('load', function(){
		$$('.preview').attr('src', reader.result);
	});

	$$('#file').on('change', function(e){
		reader.readAsDataURL(e.target.files[0]);
	});

	$$('#btn').on('click', function(){
		//var datafile = reader.readAsDataURL($$('#file').files[0]); 
		var datafile = $$('.preview').attr('src'); 
		var dataform = new FormData();
		dataform.append('file', dataURItoBlob(datafile));
		$$.ajax({
		    url: 'https://test.mountoya.id/upload.php',
		    type: 'POST',
		    data: dataform,
		    cache: false,
		    processData: false,
		    contentType: false,
		    beforeSend: function (xhr) {
		        myApp.showIndicator();
		    },
		    error: function (xhr, status) {
		        myApp.hideIndicator();
		        myApp.alert('Terjadi kesalahan jaringan..');
		    },
		    success: function(data, status, xhr) {
		        myApp.hideIndicator();
		        myApp.alert("success");
		    }
		});
	});
});

myApp.init();

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}