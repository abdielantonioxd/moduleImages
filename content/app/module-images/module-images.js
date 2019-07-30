function ModulePreview(config) {
  var component = config.ModuleImages;
  if (component != "upload-image") {
    console.log("Plugdo Upload-Image requires a configuration")

  } else{
    var self = this;
  }

    self.registerDataForm = function (configImages) {
      if (configImages[1].data.files && configImages[1].data.files[0]) {
        var reader = new FileReader();
        if (configImages[0].validateSize != false) {
          ValidateImages()
        } else {
          if (configImages[0].preview != true) {
          } else {
             renderImages()
          }
          btnNewImages(configImages)
        }
      }

      function ValidateImages() {
        if (configImages[1].data.files[0].size > configImages[0].size) {
          document.getElementById(configImages[0].idErr).innerHTML = `${configImages[0].templateErr}`;
          setTimeout(() => {
            document.getElementById(configImages[0].idErr).innerHTML = "";
          }, 2000);
        } else {
          if (configImages[0].preview != true) {
          } else {
             renderImages()
          }
         
          btnNewImages(configImages)
        }
      }

      function renderImages() {
        reader.onload = function (e) {
          document.getElementById(configImages[0].contentImput).style.display = "none";
          document.getElementById(configImages[0].viewImages).src = `${e.target.result}`;
          document.getElementById(configImages[0].contentUpload).style.display = "block";
          document.getElementById(configImages[0].titleImages).innerHTML = configImages[1].data.files[0].name;
        };
        reader.readAsDataURL(configImages[1].data.files[0]);
      }

      function btnNewImages(configImages) {
        if (configImages[0].addImages === true) {
          document.getElementById(configImages[0].idAddNewImages).innerHTML = `${configImages[0].templatedBtn}`
        }
      }

      self.addNewData = function () {
        count = 1;
        document.getElementById(configImages[0].idAddNewImages).innerHTML += configImages[0].templateNewFileInput
        count++;
      }

      self.saveImages = function (link){
        console.log('this')
        var formData = new FormData(document.getElementById(configImages[0].nameForm));
        formData.append("dato", "valor");
        $.ajax({
          url:link.url,
          type: "post",
          dataType: "html",
          data:formData,
          cache: false,
          contentType: false,
          processData: false,
          success: function (data) {
          alert('yes')
          }
        })
      }
    }

    self.removeImages = function (configImages) {
      for (let index = 0; index < document.forms.length; index++) {
        if (document.forms[index].id != undefined) {
          if (document.forms[index].id === configImages[1].data.form.id) {
            document.forms[index].reset();
            document.getElementById(configImages[0].contentImput).style.display = "block";
            document.getElementById(configImages[0].contentUpload).style.display = "none";
          }
        }
      }
    }
  }



