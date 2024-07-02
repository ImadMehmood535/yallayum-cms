import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  function (config) {
    let token;
    if (Cookies.get("token")) {
      token = Cookies.get("token");
    }
    config.headers.authorization = `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//adminlogin
API.adminLogin = (data) => {
  return API.post("admin/login", data);
};

API.changePassword = (data) => {
  return API.patch("admin/change-password", data);
};

API.updateProfile = (data) => {
  return API.patch(`admin/`, data);
};

// exam
API.getAllExams = () => {
  return API.get("exam");
};
API.updateExam = (id, data) => {
  return API.patch(`exam/${id}`, data);
};

API.addExam = (data) => {
  return API.post("exam", data);
};

API.getSingleExam = (id) => {
  return API.get(`exam/${id}`);
};

//Category

API.getAllCategories = () => {
  return API.get("category");
};

API.getSingleCategorey = (id, data) => {
  return API.patch(`category/${id}`, data);
};

API.createCategory = (data) => {
  return API.post("category", data);
};

API.updateCategory = (id, data) => {
  return API.patch(`category/${id}`, data);
};

// Promo
API.getAllPromo = () => {
  return API.get("promo");
};
API.addPromo = (data) => {
  return API.post("promo", data);
};
API.updatePromo = (id, data) => {
  return API.patch(`promo/${id}`, data);
};

// blogs

API.getBlogHeading = () => {
  return API.get("/blog-heading");
};

API.updateBlogHeading = (id, data) => {
  return API.patch(`/blog-heading/${id}`, data);
};

API.getAllBlogs = () => {
  return API.get("blog");
};

API.getSingleBlog = (id) => {
  return API.get(`/blog/id/${id}`);
};

API.createBlogs = (data) => {
  return API.post("blog", data);
};

API.updateBlogs = (id, data) => {
  return API.patch(`blog/${id}`, data);
};

API.deleteBlogs = (id) => {
  return API.delete(`blog/${id}`);
};

// Recipes

API.getRecipeHeading = () => {
  return API.get("/recipe-heading");
};

API.updateRecipeHeading = (id, data) => {
  return API.patch(`/recipe-heading/${id}`, data);
};

API.getAllRecipes = () => {
  return API.get("recipe");
};

API.getSingleRecipe = (id) => {
  return API.get(`/recipe/id/${id}`);
};

API.createRecipe = (data) => {
  return API.post("recipe", data);
};

API.updateRecipe = (id, data) => {
  return API.patch(`recipe/${id}`, data);
};

API.deleteRecipe= (id) => {
  return API.delete(`recipe/${id}`);
};

//users
API.registerUser = (data) => {
  return API.post("user", data);
};

//MembersManagement
API.getAllUsers = () => {
  return API.get("user");
};

API.getSingleUsers = (id) => {
  return API.get(`user/${id}`);
};

API.getAllSubscribedMembers = () => {
  return API.get("user/subscription");
};
API.registerUserSubscription = (data) => {
  return API.post("user/subscription", data);
};
API.getSingleSubscribedMembers = (id) => {
  return API.get(`user/subscription/${id}`);
};
API.updateUserSubscription = (id, data) => {
  return API.patch(`user/subscription/${id}`, data);
};

API.createuser = (data) => {
  return API.post("user/by-admin", data);
};

API.updateUser = (data) => {
  return API.patch(`user/by-admin`, data);
};

//adming
// API.updateUserByAdmin = (data) => {
//   return API.patch(`user`, data);
// };

API.logInUser = (data) => {
  return API.post("user/login", data);
};
API.forgetPassword = (data) => {
  return API.post("user/forget-password", data);
};
API.resetPassword = (data) => {
  return API.post("user/reset-password", data);
};

//subscription
API.getAllSubscription = (data) => {
  return API.get("subscription", data);
};
API.addSubscription = (data) => {
  return API.post("subscription", data);
};
API.updateSubscription = (id, data) => {
  return API.patch(`subscription/${id}`, data);
};

//topics
API.getAllTopics = (data) => {
  return API.get("topic", data);
};
API.addTopics = (data) => {
  return API.post("topic", data);
};
API.updateTopics = (id, data) => {
  return API.patch(`topic/${id}`, data);
};

//questions
API.getAllQuestion = (data) => {
  return API.get("question", data);
};
API.getSingleQuestion = (id) => {
  return API.get(`question/${id}`);
};
API.addQuestion = (data) => {
  return API.post("question", data);
};
API.updateQuestion = (id, data) => {
  return API.patch(`question/${id}`, data);
};

//questions
API.SubscriptionUser = (data) => {
  return API.get("/user/subscription", data);
};

//all country
API.getAllCountry = (data) => {
  return API.get("/country", data);
};

//all feedback
API.getAllFeedBack = () => {
  return API.get("/feedback");
};

API.updatefeedBackStatus = (id, data) => {
  return API.patch(`feedback/${id}`, data);
};

//all reports
API.getAllReports = () => {
  return API.get("/report");
};

API.updateReportStatus = (id, data) => {
  return API.patch(`report/${id}`, data);
};

//product

API.uploadProduct = (data) => {
  return API.post("/product", data);
};

API.getProducts = () => {
  return API.get("/product/admin");
};

API.getSingleProduct = (id) => {
  return API.get(`/product/id/${id}`);
};

API.updateProduct = (id, data) => {
  return API.patch(`/product/${id}`, data);
};

// productReviews
API.getAllProductReviews = () => {
  return API.get("productReview");
};

API.getSingleReview = (id) => {
  return API.get(`/productReview/single/${id}`);
};

API.updateProductReview = (id, data) => {
  return API.patch(`productReview/${id}`, data);
};
//newsletter
API.getAllNewsletter = () => {
  return API.get("/newsletter");
};

API.uploadImages = (data) => {
  return API.post("/image", data);
};

//order

API.getAllOrders = () => {
  return API.get("/order");
};

API.getSingleOrder = (id) => {
  return API.get(`/order/${id}`);
};

API.orderUpdateStatus = (id, data) => {
  return API.patch(`/order/${id}`, data);
};

//custom order

API.getAllCustomOrders = () => {
  return API.get("/custom-order");
};

API.getSingleCustomOrder = (id) => {
  return API.get(`/custom-order/${id}`);
};

API.updateCustomOrder = (id, data) => {
  return API.patch(`/custom-order/${id}`, data);
};

//statistics

API.getStatistics = () => {
  return API.get("/statistics");
};

// custom product
API.getAllFlavor = () => {
  return API.get("flavor");
};
API.createFlavor = (data) => {
  return API.post("flavor", data);
};
API.updateFlavor = (id, data) => {
  return API.patch(`flavor/${id}`, data);
};
API.getAllSize = () => {
  return API.get("size");
};
API.updateSize = (id, data) => {
  return API.patch(`size/${id}`, data);
};
export { API };
