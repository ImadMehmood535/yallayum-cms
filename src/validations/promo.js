import * as yup from "yup";

const promoschema = yup.object({
  name: yup.string().required("Exam name is required"),
  subscriptionId: yup.string().required("subscription is required"),
  type: yup.string().required("Discount Type is required"),
  typeValue: yup
    .number()
    .required("price required")
    .positive("price must be positive"),
  usage: yup.string().required("Discount Type is required"),
  usageLimit: yup.number().when("usage", {
    is: "one",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.required(),
  }),
  expire: yup.boolean(),
  expiryDate: yup.string().when("expire", {
    is: true,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  isActive: yup.boolean().required("Status is required"),
  isSpecificUser: yup.boolean().required("This is required"),
  userId: yup.string().when("isSpecificUser", {
    is: true,
    then: (schema) =>
      schema.required(
        "Please select the email because you want to apply this promo code to specific individual"
      ),
    otherwise: (schema) => schema.optional(),
  }),
  discountAd: yup.boolean().required(" discountAd is required"),
});

export { promoschema };
