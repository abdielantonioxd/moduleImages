function saveImagesServer(config) {
  var component = config.Module;
  if (component != "upload-image") {
    throw "this Module is not Fount in the configuration Pleace view Documentatin";
  } else {
    var self = this;
  }

  self.registerDataForm = function (configImages) {
    var configFile = configImages[1];
    var config = configImages[0];
    if (configImages.length != 0) {
      if (configFile.data.files && configFile.data.files[0]) {
        var reader = new FileReader();
        if (config.validateSize != false) {
          ValidateImages()
        } else {
          if (config.preview != true) {
            if (config.previewMultiple === undefined) {
              throw "Property PreviewMultiple in not defined in the configuration"
            } else {
              if (config.previewMultiple != false) {
                this.Multiple = true;
              } else {

              }
            }
          } else {
            renderImagesOnlyOne();
          }
        }
      } else {
        throw "File is not Found ";
      }
    } else {
      throw "Object Config is Empty ";
    }

    function ValidateImages() {
      if (configFile.data.files[0].size > config.size) {
        document.getElementById(config.idErr).innerHTML = `${config.templateErr}`;
        setTimeout(() => {
          document.getElementById(config.idErr).innerHTML = "";
        }, 2000);
      } else {
        if (config.preview != true) {
          if (config.previewMultiple != false) {
            this.Multiple = true;
          } else {
            throw "Property PreviewMultiple in not defined in the configuration"
          }
        } else {
          renderImagesOnlyOne();
        }
      }
    }

    function renderImagesOnlyOne() {
      validateObject()
      reader.onload = function (e) {
        document.getElementById(config.contentImput).style.display = "none";
        document.getElementById(config.viewImages).src = `${e.target.result}`;
        document.getElementById(config.contentUpload).style.display = "block";
        document.getElementById(config.titleImages).innerHTML = configFile.data.files[0].name;
      };
      reader.readAsDataURL(configFile.data.files[0]);
    }

    function validateObject() {
      if (config.contentImput === undefined) {
        throw `id of input is undefined in configuration`
      }
      if (config.viewImages === undefined) {
        throw `Container of view images is undefined in the  configuration`
      }

      if (config.contentUpload === undefined) {
        throw `Container of Upload images is undefined in the  configuration`
      }

      if (config.titleImages === undefined) {
        throw `Container of title images is undefined in the configuration`
      }

    }
    self.MultipleImages = function (idResult) {
      if (this.Multiple === true) {
        if (window.File && window.FileList && window.FileReader) {
          var files = event.target.files;
          var output = document.getElementById(idResult.result);
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
              var picFile = event.target;
              var div = document.createElement("div");
              div.className = `${idResult.class}`;
              div.innerHTML = `<img id="images-${i}" class='thumbnail' src="${picFile.result}"  title="${picFile.name}" />`;
              output.insertBefore(div, null);
            });
            picReader.readAsDataURL(file);
          }
        } else {
          throw "Your browser does not support File API";
        }
      }
    }

    self.saveImages = function (link) {
      var URL = link.url;
      var formData = new FormData(document.getElementById(config.nameForm));
      formData.append("dato", "valor");
      saveImagesServer(URL, formData);
    }

    self.removeImages = function () {
      for (let index = 0; index < document.forms.length; index++) {
        if (document.forms[index].id != undefined) {
          if (document.forms[index].id === configFile.data.form.id) {
            document.forms[index].reset();
            document.getElementById(config.contentImput).style.display = "block";
            document.getElementById(config.contentUpload).style.display = "none";
          }
        }
      }
    }

    function saveImagesServer(URL, formData) {
      var request = new XMLHttpRequest();
      request.upload.addEventListener('progress', function (e) {
        var percent_complete = (e.loaded / e.total) * 100;
        // console.log(percent_complete);
      });
      request.responseType = 'json';
      request.open('post', URL);
      request.send(formData);
      if (request.readyState === 1) {
        var response = {
          status: "OK",
          save: true,
          response: "Files save in the server"
        }
        responseImages(response);
      } else {
        var response = {
          status: "Err",
          save: false,
          response: ""
        }
        responseImages(response);
      }
      function responseImages(response) {
        console.log(response)
      }
    }

  }
}

function deleteFileInServer(config) {
  var self = this;
  var component = config.Module;
  if (component != 'delete-image') {
    throw "Module is not register in the configuration"
  } else {
    self.deleteImages = function (params) {
      var dataDelete = params[0]
      if (dataDelete.name != "" && dataDelete.name != undefined) {
        del()
      } else {
        throw "Name File is undefined"
      }
      function del() {
        var request = new XMLHttpRequest();
        request.open("POST", dataDelete.Url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
          name: dataDelete.name
        }));
        if (request.readyState === 1) {
          response = {
            status: "OK",
            save: true,
            response: "Files delete"
          }
          responseFile(response);
        } else {
          response = {
            status: "Err",
            save: false,
            response: ""
          }
          responseFile(response);
        }
        function responseFile(response) {
          console.log(response)
        }
      }

    }
  }
}