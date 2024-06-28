import axios from 'axios';

class MyCustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    const formData = new FormData();
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          formData.append("image", file, file.name);

          axios.post("https://backend.qbankmodel.com/api/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((response) => {
              const data = response.data;
            //   console.log('Upload response:', data);  // Log the response for debugging
              if (data && data.data) {
                resolve({
                  default:` https://backend.qbankmodel.com${data.data}`,
                });
              } else {
                reject(`Couldn't upload file: ${file.name}. Server responded with: ${JSON.stringify(data)}`);
              }
            })
            .catch((error) => {
              console.error('Upload failed:', error);
              reject(`Couldn't upload file: ${file.name}. ${error.message}`);
            });
        })
    );
  }

  abort() {
    // Implement your abort logic if necessary
  }
}

export default function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyCustomUploadAdapter(loader);
  };
}
