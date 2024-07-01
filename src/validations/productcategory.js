import * as yup from "yup";
const editCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
  // imageUrl: yup
  //   .mixed()
  //   .required("Image is required")
  //   .test("fileSize", "The file is too large", (value) => {
  //     return value && value.size <= 2000000; // 2MB
  //   })
  //   .test("fileType", "Unsupported file format", (value) => {
  //     return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  //   }),
});

 
const AddCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
  // imageUrl: yup.mixed().required("Image is required"),
});

export {   AddCategory , editCategory };
