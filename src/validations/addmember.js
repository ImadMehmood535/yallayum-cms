import * as yup from "yup";
const Editmember = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
  country: yup.string().required("country is required"),
  hearFrom: yup.string(),
  country: yup
    .string()
    .transform((value, original) => (original === "" ? null : String(value))),
  isBlocked: yup.boolean().required("Status is required"),
});
const Addmember = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
  country: yup.string().required("country is required"),
  hearFrom: yup.string(),
});

const addSubscribedMemberSchema = yup.object().shape({
  userId: yup.number().typeError("Member Email is required").required("Member Id is required"),
  subscriptionId: yup
    .number()
    .typeError("Please select a subscription")
    .required("Member Id is required"),
  // discountType: yup.string().required("Please select discount type"),
  // discount: yup.number().typeError("Enter amount").required(""),
  isActive: yup.boolean().typeError("Please select status").required(),
  sendEmail: yup
    .boolean()
    .typeError("Let us know if you want to send email or not!")
    .required(),
  startDate: yup.date().optional().typeError("Start Date is required"),
  endDate: yup.date().optional().typeError("End date is required"),
});
const editSubscribedMemberSchema = yup.object().shape({
  userId: yup.number().typeError("Member Email is required").optional(),
  subscriptionId: yup
    .number()
    .typeError("Please select a subscription")
    .required("Member Id is required"),
  // discountType: yup.string().required("Please select discount type"),
  // discount: yup.number().typeError("Enter amount").required(""),
  isActive: yup.boolean().typeError("Please select status").required(),
  sendEmail: yup
    .boolean()
    .typeError("Let us know if you want to send email or not!")
    .required(),
  startDate: yup.date().optional().typeError("Start Date is required"),
  endDate: yup.date().optional().typeError("End date is required"),
});

export {
  Addmember,
  Editmember,
  addSubscribedMemberSchema,
  editSubscribedMemberSchema
};
