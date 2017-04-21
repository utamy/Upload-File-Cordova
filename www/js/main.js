function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

  // Old code
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);
}

function upload() {
    var photo = document.getElementById("photo");
    var file = photo.files[0];

    console.log("File name: " + file.fileName);
    console.log("File size: " + file.fileSize);
    console.log("Binary content: " + file.getAsBinary());
    console.log("Text content: " + file.getAsText(""));

    var preview = document.getElementById("preview");
    preview.src = file.getAsDataURL();

    return false;
};

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
//$$(document).ready(function(){
$$('#frm').submit(function(){
var datafile = $('#file').files[0];   
var dataform = new FormData();
// dataform.append('id', page.query.id);
dataform.append('file', dataURItoBlob(datafile));
//dataform.append('file', dataURItoBlob($$(page.container).find('.preview').attr('src')));
$$.ajax({
    url: 'https://test.mountoya.id/upload.php',
    type: 'POST',
    data: dataform,
    cache: false,
    dataType: 'json',
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
        myApp.alert(data.message);
        //mainView.router.loadPage('index.html');
        //myApp.alert(data);
        alert("ok");
        
    }
});
});
