import * as yup from "yup";
const ExamCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  examId: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : Number(value))),
  isLive: yup.boolean().required("Status is required"),
});
const AddExamCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  examId: yup.number().required(),
  isLive: yup.boolean().required("Status is required"),
});

export { ExamCategory, AddExamCategory };
