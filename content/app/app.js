'use strict'
window.saveImages = new saveImagesServer({ Module: "upload-image" })
window.deleteFile = new deleteFileInServer({ Module: "delete-image" })

this.config_Images = [{
  contentImput: "image-upload-wrap",
  input: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  size: "1024",
  idErr: "errMessage",
  templateErr: ``,
  nameForm: "imagesUploadOne",
  validateSize: false,
  preview: false,
  previewMultiple: false
}];

function imagesPlugdo(input) {
  config_Images.push({ data: input });
  saveImages.registerDataForm(config_Images);
  saveImages.MultipleImages({ result: "result", class: "col-md-3" })
}

function removeImagesPlugdo() {
  saveImages.removeImages(config_Images);
}

function saveImagesServ() {
  saveImages.saveImages({ url: '/images/upload' });
}

