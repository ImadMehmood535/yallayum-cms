import * as Yup from "yup";

const examQuestions = Yup.object().shape({
  examId: Yup.string().required("Exam Name is required"),
  categoryId: Yup.string().required("Category Name is required"),
  topicId: Yup.string().required("Topic Name is required"),
  difficultyMode: Yup.string().required("Difficulty Level is required"),
  isLive: Yup.boolean().required("Status is required"),
  isTrial: Yup.boolean().required("Trial is required"),
  name: Yup.string().required("Statement is required"),
  type: Yup.string().required("Answer Type is required"),

  answerDetails: Yup.string().required("Answer Details is required"),
  referenceDetails: Yup.string().required("Reference Details is required"),
});

export { examQuestions };
