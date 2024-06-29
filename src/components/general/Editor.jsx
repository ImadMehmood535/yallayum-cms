import React from "react";
import { Editor as ClassicEditor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomUploadAdapterPlugin from "../../utils/MyCustomUploadAdapter";

const Editor = ({ name, errors, label, register, setValue, defaultValue }) => {
  return (
    <div className="w-[99%] max-w-[100%] break-words">
      <p className="text-[#8F8F8F] text-sm font-medium px-2 capitalize relative z-0 mb-3">
        {label}
      </p>
      <CKEditor
        activeClass="p10"
        editor={ClassicEditor}
        data={defaultValue}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin], // Add the custom upload adapter plugin
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(name, data);
        }}
      />
      {errors && errors[name] && (
        <p className="text-tiny text-danger pl-3 mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Editor;
