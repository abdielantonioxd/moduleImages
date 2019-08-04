'use strict'
window.upload = new uploadImagesServer({
  Module: "upload-image"
})

window.deleteFile = new deleteFileInServer({
  Module: "delete-image",
  msgErrActive: true,
  useSweetAlert: false,
  useAlertify: false,
  useConsole: true
})

this.config = [{
  contentImput: "image-upload-wrap",
  idInput: "file-upload-input",
  contentUpload: "file-upload-content",
  viewImages: "file-upload-image",
  titleImages: "image-title",
  idErr: "errMessage",
  templateErr: "",
  nameForm: "imagesUploadOne",
  size: 1024 *1024,
  validateSize:false,
  validateFormats: false,
  validateSpace:true,
  preview: true,
  useSweetAlert: true,
  useAlertify: false,
}];

function validateUpload(input) {
  config.push({
    data: input
  });
  upload.registerDataForm(config);
  upload.MultipleImages({
    result: "previewMultiple",
    class: "",
    active: false
  })
}

function chooseAnotherImages() {
  upload.chooseAnother(config);
}

function uploadImagesServ() {
  upload.saveImages({
    url: '/upload'
  });
}


function deleteFiles() {
  deleteFile.deleteImages({
    name: '863587.jpg',
    Url: "/delete"
  })
}