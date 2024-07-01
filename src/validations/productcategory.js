import * as yup from "yup";
const Category = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
});
const AddCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
});

export { Category, AddCategory };
