import * as yup from "yup";
const subscriptionschema = yup.object().shape({
  name: yup.string().required("Exam name is required"),
  examId: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : Number(value))),
  duration: yup
    .number()
    .required("Total time is required")
    .positive("Total time must be positive"),

  price: yup
    .number()
    .required("price required")
    .positive("price must be positive"),
  reSubscriptionPrice: yup
    .number()
    .required("reSubscriptionPrice required")
    .positive("reSubscriptionPrice must be positive"),
  durationMode: yup.string().required("duration Mode is required"),
  isLive: yup.boolean().required("Status is required"),
  isTrial: yup.boolean().required(" Trial is required"),
});

const addSubscription = yup.object().shape({
  name: yup.string().required("Exam name is required"),
  examId: yup.number().required(),
  duration: yup
    .number()
    .required("Total time is required")
    .positive("Total time must be positive"),

  price: yup
    .number()
    .required("price required")
    .positive("price must be positive"),
  reSubscriptionPrice: yup
    .number()
    .required("reSubscriptionPrice required")
    .positive("reSubscriptionPrice must be positive"),
  durationMode: yup.string().required("duration Mode is required"),
  isLive: yup.boolean().required("Status is required"),
  isTrial: yup.boolean().required(" Trial is required"),
});

export { subscriptionschema, addSubscription };
