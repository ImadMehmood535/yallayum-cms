import * as yup from "yup";
const ExamSchema = yup.object().shape({
    name: yup.string().required("Exam name is required"),
    noOfQuestions: yup
      .number()
      .required("Number of questions is required")
      .positive("Number of questions must be positive"),
    totalTime: yup
      .number()
      .required("Total time is required")
      .positive("Total time must be positive"),
    isLive: yup.boolean().required("Status is required"),
    isFeatured: yup.boolean().required("Status is required"),
  });
 


  export {ExamSchema };
