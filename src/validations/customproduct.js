import * as yup from "yup";
const editFlavor = yup.object().shape({
  name: yup.string().required("Category name is required"),
  price: yup.number().required("Status is required"),
});

const AddFlavor = yup.object().shape({
  name: yup.string().required("Category name is required"),
  price: yup.number().required("Status is required"),
//   imageUrl: yup
//     .mixed()
//     .required("Image is required")
//     .test("fileSize", "The file is too large", (value) => {
//       return value && value.size <= 2000000; // 2MB
//     })
//     .test("fileType", "Unsupported file format", (value) => {
//       return (
//         value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
//       );
//     }),
});

export { AddFlavor, editFlavor };
