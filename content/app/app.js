'use strict'
window.saveImages = new saveImagesServer({ Module: "upload-image" })
window.deleteFile = new deleteFileInServer({ Module: "delete-image" })
this.config= [{
  contentImput: "image-upload-wrap",
  input: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  idErr: "errMessage",
  templateErr: `<div class="alert alert-danger" role="alert">
  Imagen no soportada,Intente con otra
</div>`,
  nameForm: "imagesUploadOne",
  validateFormats:true,
  size: 1024,
  validateSize: false,
  preview: false,
  previewMultiple: true
}];

function imagesPlugdo(input) {
  config.push({ data: input });
  saveImages.registerDataForm(config);
  saveImages.MultipleImages({ result: "result", class: "col-md-3" })
}

function removeImagesPlugdo() {
  saveImages.removeImages(config);
}

function saveImagesServ() {
  saveImages.saveImages({ url: '/images/upload' });
}

