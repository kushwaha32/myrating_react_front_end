import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductEditor = ({setEditorData, editorData}) => {
  

  const handleEditorDataChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const editorConfig = {
    toolbar: ["imageUpload", "undo", "redo"],
    image: {
        toolbar: [
            // All default CKEditor options
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'alignment',
            '|',
            'link',
            'insertTable',
            '|',
            'imageUpload',
            '|',
            'undo',
            'redo',
            '|',
            'colorButton', // Color option
          ],
      styles: ["full", "alignLeft", "alignRight"],
      upload: {
        // Replace with your backend upload endpoint
        // Example: '/api/v1/product/uploadImg'
        url: "/your-upload-url",
      },
    },
  };

  return (
    <CKEditor
      editor={ClassicEditor}
    //   config={editorConfig}
      data={editorData}
      onReady={(editor) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return {
            upload: () => {
              return loader.file.then((file) => {
                return new Promise((resolve, reject) => {
                  const formData = new FormData();
                  formData.append("image", file);

                  fetch("http://localhost:4000/api/v1/product/uploadImg", {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                  })
                    .then((response) => response.json())
                    .then((responseData) => {
                      resolve({
                        default: responseData.url,
                      });
                    })
                    .catch((error) => {
                      reject(error);
                    });
                });
              });
            },
          };
        };
      }}
      onChange={handleEditorDataChange}
    />
  );
};


export default ProductEditor;
