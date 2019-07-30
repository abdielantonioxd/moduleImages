'use strict'
window.moduleP = new initModuleImages({
  ComponentImages: [
    {
      ModuleImages: "upload-image"
    }
  ],
})

this.config_Images = [{
  contentImput: "image-upload-wrap",
  input: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  size: "1024",
  validateSize: false,
  idErr: "errMessage",
  templateErr: `<div class="alert alert-danger" role="alert">La Imagen no es soportada,Elija otra Imagen</div>`,
  addImages: false,
  idAddNewImages: "",
  templatedBtn: `<button type="button" class="btn btn-success btn-lg btn-sm" onclick="moduleP.addNewData();">Add</button>`,
  templateNewFileInput: "",
  nameForm: "imagesUploadOne"
}];

function imagesPlugdo(input) {
  config_Images.push({ data: input });
  moduleP.registerDataForm(config_Images);
}

function removeImagesPlugdo() {
  moduleP.removeImages(config_Images);
}

function save() {
  moduleP.saveImages({ url: '/images/upload' });
}


