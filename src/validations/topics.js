import * as yup from "yup";
const topicsschema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  examId: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : Number(value))),
  categoryId: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : Number(value))),
  isLive: yup.boolean().required("Status is required"),
});

const addTopicSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  examId: yup.number().required(),
  categoryId: yup.number().required(),
  isLive: yup.boolean().required("Status is required"),
});

export { topicsschema, addTopicSchema };
