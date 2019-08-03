function saveImagesServer(config) {

  if (config.Module != "upload-image") {
    throw "this Module is not Fount in the configuration";
  } else {
    var self = this;
    var configFile = "";
    var config = "";
    var ObjectMultipleImages = []
  }

  self.registerDataForm = function (configImages) {

    configFile = configImages[1];
    config = configImages[0];
    if (configImages.length != 0) {
      if (configFile.data.files && configFile.data.files[0]) {
        if (config.validateSize === true) {
          ValidateSizeImages()
        } else {
          if (config.validateFormats === true) {
            validateFormatImages();
            validatePreviewImages();
          } else {
            validatePreviewImages();
          }
        }
      } else {
        throw "File is not Found";
      }
    } else {
      throw "Object 'config' is Empty";
    }

    function validatePreviewImages() {
      if (config.preview === undefined) {
        throw "Property 'preview' in not defined in the configuration"
      } else {
        if (config.preview === false) {
          if (config.previewMultiple === undefined) {
            throw "Property 'PreviewMultiple' in not defined in the configuration"
          } else {
            if (config.previewMultiple === true) {
              Multiple = true;
            } else {
              Multiple = false;
            }
          }
        } else {
          renderImagesOnlyOne();
        }
      }
    }

    function validateFormatImages() {
      if (config.validateFormats === undefined) {
        throw "The property 'validateFormats' is not defined"
      } else {
        if (config.validateFormats != false) {
          ValidateFormatsImages()
        }
      }
    }


    function ValidateFormatsImages() {
      if (config.idInput != "") {
        var fileInput = document.getElementById(config.idInput);
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!allowedExtensions.exec(filePath)) {
          if (config.useAlertify != false) {
            FuncErrAlertify()
          } else {
            if (config.useSweetAlert != false) {
              FuncErr()
            } else {
              if (config.idErr != undefined) {
                if (config.idErr != "") {
                  document.getElementById(config.idErr).innerHTML = `${config.templateErr}`;
                  setTimeout(() => {
                    document.getElementById(config.idErr).innerHTML = "";
                  }, 2000);
                }
              } else {
                throw 'Id  "Error" is not defined in the configuration';
              }
            }
          }
          if (config.previewMultiple != false) {
            Multiple = true;
          } else {
            Multiple = false;
          }
          document.getElementById(config.idInput).value = "";
          throw new Error('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');

        } else {
          if (config.validateSize != false) {
            document.getElementById(config.contentImput).style.display = "block";
            document.getElementById(config.contentUpload).style.display = "none";
          } else {
            if (config.preview === true) {
              renderImagesOnlyOne();
            }
          }
        }

        function FuncErrAlertify() {
          if (ObjectMultipleImages.length != 0) {
            if (ObjectMultipleImages[0] != undefined) {
              if (ObjectMultipleImages[0].result != undefined) {
                if (ObjectMultipleImages[0].result != "") {
                  document.getElementById(ObjectMultipleImages[0].result).innerHTML = "";
                }
              } else {
                throw "Error the object 'result' of MultipleImages is not defined in the configuration"
              }
            } else {
              throw "Error the position [0] of MultipleImages is not defined in the configuration"
            }
          }
          alertify.set('notifier', 'position', 'top-right');
          alertify.error("Solo se aceptan formatos .jpeg/.jpg/.png");

        }

        function FuncErr() {
          if (ObjectMultipleImages.length != 0) {
            if (ObjectMultipleImages[0] != undefined) {
              if (ObjectMultipleImages[0].result != undefined) {
                if (ObjectMultipleImages[0].result != "") {
                  document.getElementById(ObjectMultipleImages[0].result).innerHTML = "";
                }
              }
            }
          }
          swal({
            title: "Erorr",
            text: "Solo se aceptan formatos .jpeg/.jpg/.png",
            icon: "error",
          })
          if (config.validateSize != false) {
            if (config.preview != false) {
              for (let index = 0; index < document.forms.length; index++) {
                if (document.forms[index].id != undefined) {
                  if (document.forms[index].id === configFile.data.form.id) {
                    document.forms[index].reset();
                  }
                }
              }
            }
          }
        }
      } else {
        throw "The id of input in not defined in the configuration"
      }
    }

    function ValidateSizeImages() {
      if (config.templateErr === undefined) {
        throw "The property 'templatedErr'   is undefined in the configuration"
      } else {
        if (config.templateErr != undefined) {
          if (configFile.data.files[0].size > config.size) {
            if (config.useSweetAlert === true) {
              swal({
                title: "Erorr",
                text: "Imagen excede el limite autorizado",
                icon: "error",
              })
            } else {
              if (config.useAlertify === true) {
                alertify.set('notifier', 'position', 'top-right');
                alertify.error('Imagen excede el limite autorizado');
              } else {
                if (config.templateErr != "" && config.idErr != "") {
                  document.getElementById(config.idErr).innerHTML = `${config.templateErr}`;
                  setTimeout(() => {
                    document.getElementById(config.idErr).innerHTML = "";
                  }, 2000);
                } else {
                  throw "The propertys of 'error'   is empty in the configuration"
                }
              }
            }
          } else {
            if (config.preview === true) {
              renderImagesOnlyOne();
            } else {
              if (config.previewMultiple != true) {
                validateFormatImages();
              } else {

              }

            }
          }
        }
      }

      if (config.validateFormats != undefined) {
        if (config.validateFormats != false) {
          ValidateFormatsImages()
        } else {
          return false
        }
      } else {
        throw new Error("The property  'validateFormats' is undefined in the configuration")
      }
    }
    if (config.validateSpace != undefined) {
        if (config.validateSpace != false ) {
        var  nameImage = configFile.data.files[0].name;
        if (nameImage.indexOf(" ") === -1) {
      } else {
         throw new Error ("la imagen no deve contener espacios ")
      }
        } else {
          
        }
    } else {
      
    }

    function renderImagesOnlyOne() {
      validateObject()
    }

    function validateObject() {
      if (config.contentImput === undefined) {
        throw new Error(`id of input is undefined in configuration`)
      }
      if (config.viewImages === undefined) {
        throw new Error(`Container of view images is undefined in the  configuration`)
      }

      if (config.contentUpload === undefined) {
        throw new Error(`Container of Upload images is undefined in the  configuration`)
      }

      if (config.titleImages === undefined) {
        throw new Error(`Container of title images is undefined in the configuration`)
      }
      if (config.contentImput && config.viewImages && config.contentUpload && config.titleImages != "") {
        renderI()
      } else {
        throw new Error(`the image cannot be displayed because some properties are not defined`)
      }

      function renderI() {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById(config.contentImput).style.display = "none";
          document.getElementById(config.viewImages).src = `${e.target.result}`;
          document.getElementById(config.contentUpload).style.display = "block";
          if (configFile.data.files.length != 0) {
            document.getElementById(config.titleImages).innerHTML = configFile.data.files[0].name;
          } else {
            if (config.validateFormats != false) {
              document.getElementById(config.viewImages).src = "";
              throw new Error("Solo se aceptan formatos .jpeg/.jpg/.png")
            }
          }
        };
        reader.readAsDataURL(configFile.data.files[0]);
      }
    }

    self.MultipleImages = function (idResult) {
      if (idResult.active != false) {
        ObjectMultipleImages.push(idResult)
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
              div.innerHTML = `<img id="images-${i}" class="img-thumbnail" src="${picFile.result}"  title="${picFile.name}" />`;
              output.insertBefore(div, null);
            });
            picReader.readAsDataURL(file);
          }
        } else {
          throw new Error("Your browser does not support File API")
        }
      }
    }

    self.saveImages = function (link) {
      var URL = link.url;
      var formData = new FormData(document.getElementById(config.nameForm));
      formData.append("dato", "valor");
      saveImagesServer(URL, formData);
    }

    function saveImagesServer(URL, formData) {
      var request = new XMLHttpRequest();
      request.responseType = 'json';
      request.open('post', URL);
      request.send(formData);
      if (request.readyState === 1) {
        var successObj = {
          title: "Excelente",
          text: "Imagen Guardada correctamente",
          icon: "success"
        }
        msgErr(successObj)

      } else {
        var successObj = {
          title: "Error",
          text: "Ocurrio un error vuelva a Ingresar la Imagen",
          icon: "error"
        }
        msgErr(msn)
      }

      function msgErr(msn) {
        if (config.useSweetAlert === true) {
          swal({
            title: msn.title,
            text: msn.text,
            icon: msn.icon,
          })
          responseImages()
        } else {
          if (config.useAlertify === true) {
            alertify.set('notifier', 'position', 'top-right');
            if (msn.icon != "success") {
              alertify.error(msn.text);
            } else {
              alertify.success(msn.text);
            }
            responseImages()
          } else {
            if (config.templateErr != "" && config.idErr != "") {
              document.getElementById(config.idErr).innerHTML = msn.text;
              setTimeout(() => {
                document.getElementById(config.idErr).innerHTML = "";
              }, 2000);
              responseImages()
            } else {
              throw "The propertys of 'error'   is empty in the configuration"
            }
          }
        }
      }

      function responseImages() {
        for (let index = 0; index < document.forms.length; index++) {
          if (document.forms[index].id != undefined) {
            if (document.forms[index].id === configFile.data.form.id) {
              document.forms[index].reset();
              if (config.preview != false) {
                document.getElementById(config.contentImput).style.display = "block";
                document.getElementById(config.contentUpload).style.display = "none";
              } else {}
            }
          }
        }
      }
    }
  }
  self.removeImages = function (configDelete) {
    configFile = configDelete[1];
    config = configDelete[0];
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
}

function deleteFileInServer(config) {
  var self = this;
  var component = config.Module;
  if (config.Module != undefined) {
    if (config.msgErrActive != undefined) {
      if (config.useAlertify != undefined) {
        if (config.useSweetAlert != undefined) {
          if (config.useConsole != undefined) {
            if (component != 'delete-image') {
              throw new Error("Module is not register in the configuration")
            } else {
              self.deleteImages = function (params) {
                console.log(params)
                var dataDelete = params
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
                    var successObj = {
                      title: "Excelente",
                      text: "Archivo eliminado correctamente",
                      icon: "success"
                    }
                    msgErr(successObj)
                  } else {
                    var errorObj = {
                      title: "error",
                      text: "El rchivo no fue  eliminado ",
                      icon: "error"
                    }
                    msgErr(errorObj)
                  }
                }

                function msgErr(msn) {
                  if (config.useSweetAlert === true) {
                    swal({
                      title: msn.title,
                      text: msn.text,
                      icon: msn.icon,
                    })
                  } else {
                    if (config.useAlertify === true) {
                      alertify.set('notifier', 'position', 'top-right');
                      if (msn.icon != "success") {
                        alertify.error(msn.text);
                      } else {
                        alertify.success(msn.text);
                      }
                    } else {
                      if (config.useConsole === true) {
                        console.log(msn)
                      }
                    }
                  }
                }
              }
            }
          } else {
            throw new Error("The property useConsole in not defined")
          }
        } else {
          throw new Error("The property SweetAlert in not defined")
        }
      } else {
        throw new Error("The property useAlertify in not defined")
      }
    } else {
      throw new Error("the  property  msgErrActive is  not  defined")
    }
  } else {
    throw new Error("the  property  Module is  not  defined")
  }
}