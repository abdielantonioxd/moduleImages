'use strict'
window.saveImages = new saveImagesServer({ Module: "upload-image" })
window.deleteFile = new deleteFileInServer({ Module: "delete-image" })
this.config = [{
  contentImput: "image-upload-wrap",
  idInput: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  idErr: "errMessage",
  templateErr: "",
  nameForm: "imagesUploadOne",
  validateFormats: true,
  size: 1024 * 1024,
  validateSize: true,
  preview: false,
  previewMultiple: false,
  useSweetAlert: false,
  useAlertify: true
}];

function templated() {
  return `<div class="alert alert-danger" role="alert">
  Imagen excede el limite autorizado
  </div>`;
}

function imagesPlugdo(input) {
  config.push({ data: input });
  saveImages.registerDataForm(config);
  saveImages.MultipleImages({ result: "result", class: "col-lg-4", active: true })
}

function removeImagesPlugdo() {
  saveImages.removeImages(config);
}

function saveImagesServ() {
  saveImages.saveImages({ url: '/post' });
}

