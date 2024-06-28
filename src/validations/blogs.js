import * as yup from "yup";

const addBlogsSchema = yup.object().shape({
  name: yup.string().required("Blog Titlle is required"),
  short_description: yup.string().required("Short Discription is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Discription is required"),
});

export { addBlogsSchema };
