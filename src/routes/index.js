import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/signin/ForgotPassword";
import ResetPassword from "../pages/signin/ResetPassword";
import LogIn from "../pages/signin/LogIn";
import RootLayout from "../components/layout/RootLayout";
import Indexdashboard from "../pages/dashboarddefault/Indexdashboard";
import ExamComponent from "../pages/ExamsManagement/exam/ExamComponent";
import ExamCategories from "../pages/ExamsManagement/Categories/ExamCategories";
import AddExam from "../pages/ExamsManagement/exam/AddExam";
import AddCategories from "../pages/ecommerce/Categories/AddCategories";
import EditCategory from "../pages/ecommerce/Categories/EditCategory";
import PromoCode from "../pages/ExamsManagement/PromoCode/PromoCode";
import AddPromoCode from "../pages/ExamsManagement/PromoCode/AddPromoCode";
import EditExam from "../pages/ExamsManagement/exam/EditExam";
// import EditCategory from "../pages/ExamsManagement/Categories/EditCategory";
import SubscriptionComponent from "../pages/SubscriptionManagement/SubscriptionPackages/SubscriptionComponent";
import AddSubscription from "../pages/SubscriptionManagement/SubscriptionPackages/AddSubscription";
import EditSubscription from "../pages/SubscriptionManagement/SubscriptionPackages/EditSubscription";
import EditPromoCode from "../pages/ExamsManagement/PromoCode/EditPromoCode";
import TopicsComponents from "../pages/ExamsManagement/Topics/TopicsComponents";
import AddTopic from "../pages/ExamsManagement/Topics/AddTopic";
import EditTopics from "../pages/ExamsManagement/Topics/EditTopics";
import QuestionsComponent from "../pages/ExamsManagement/Questions/QuestionsComponent";
import AddQuestions from "../pages/ExamsManagement/Questions/AddQuestions";
import EditQuestions from "../pages/ExamsManagement/Questions/EditQuestions";
import AllMember from "../pages/MembersManagement/AllMember";
import AddMember from "../pages/MembersManagement/AddMember";
import EditMember from "../pages/MembersManagement/EditMember";
import SubscribedMembers from "../pages/MembersManagement/SubscribedMembers";
import ProfileDetails from "../pages/profile/ProfileDetails";
import ProfileUpdate from "../pages/profile/ProfileUpdate";
import ProfilePassword from "../pages/profile/ProfilePassword";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoutes from "../components/general/ProtectedRoutes";
import FeedBack from "../pages/SiteManagement/FeedBack";
import Reports from "../pages/SiteManagement/Reports";
import Newsletter from "../pages/SiteManagement/Newsletter";
import AddSubscribedMembers from "../pages/MembersManagement/AddSubscribedMembers";
import EditSubscribedMembers from "../pages/MembersManagement/EditSubscribedMembers";
import BlogsComponent from "../pages/SiteManagement/blogs/BlogsComponent";
import AddBlogs from "../pages/SiteManagement/blogs/AddBlogs";
import EditBlogs from "../pages/SiteManagement/blogs/EditBlogs";
import Products from "../pages/ecommerce/products/Products";
import AddProduct from "../pages/ecommerce/products/AddProduct";
import Categories from "../pages/ecommerce/Categories/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-password",
    element: <ResetPassword />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <RootLayout />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "store",
        children: [
          {
            path: "products",
            children: [
              {
                path: "",
                element: <Products />,
              },
              {
                path: "add",
                element: <AddProduct />,
              },
            ],
          },
        ],
      },
      {
        path: "store",
        children: [
          {
            path: "categories",
            children: [
              {
                path: "",
                element: <Categories />,
              },
              {
                path: "add-category",
                element: <AddCategories />,
              },
              {
                path: "edit-category",
                element: <EditCategory/>,
              },
            ],
          },
        ],
      },
      {
        path: "",
        element: <Indexdashboard />,
      },
      {
        path: "allexam",
        element: <ExamComponent />,
      },
      {
        path: "exam/exam-categories",
        element: <ExamCategories />,
      },
      {
        path: "allexam/add-exam",
        element: <AddExam />,
      },
      {
        path: "allexam/edit-exam",
        element: <EditExam />,
      },
      {
        path: "exam/exam-categories/add-categories",
        element: <AddCategories />,
      },
      // {
      //   path: "exam/exam-categories/edit-category",
      //   element: <EditCategory />,
      // },
      {
        path: "exam/promo-code",
        element: <PromoCode />,
      },
      {
        path: "exam/promo-code/add-promo-code",
        element: <AddPromoCode />,
      },
      {
        path: "exam/promo-code/edit-promo-code",
        element: <EditPromoCode />,
      },
      {
        path: "exam/topics",
        element: <TopicsComponents />,
      },
      {
        path: "exam/topics/add-topics",
        element: <AddTopic />,
      },
      {
        path: "exam/topics/edit-topic",
        element: <EditTopics />,
      },
      {
        path: "exam/questions",
        element: <QuestionsComponent />,
      },
      {
        path: "exam/questions/add-question",
        element: <AddQuestions />,
      },
      {
        path: "exam/questions/edit-question",
        element: <EditQuestions />,
      },
      {
        path: "all-subscription-packages",
        element: <SubscriptionComponent />,
      },
      {
        path: "subscription-packages/add-subscription",
        element: <AddSubscription />,
      },
      {
        path: "all-subscription-packages/edit-subscription",
        element: <EditSubscription />,
      },

      {
        path: "members-management",
        children: [
          {
            path: "all-members",
            element: <AllMember />,
          },
          {
            path: "add-members",
            element: <AddMember />,
          },
          {
            path: "all-members/edit-members",
            element: <EditMember />,
          },
          {
            path: "subscribed-members",
            element: <SubscribedMembers />,
          },
          {
            path: "subscribed-members/add-subscribed-members",
            element: <AddSubscribedMembers />,
          },
          {
            path: "subscribed-members/edit-subscribed-members",
            element: <EditSubscribedMembers />,
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "details",
            element: <ProfileDetails />,
          },
          {
            path: "update",
            element: <ProfileUpdate />,
          },
          {
            path: "password",
            element: <ProfilePassword />,
          },
        ],
      },
      {
        path: "blogs",
        children: [
          {
            path: "",
            element: <BlogsComponent />,
          },
          {
            path: "add",
            element: <AddBlogs />,
          },
          {
            path: "edit",
            element: <EditBlogs />,
          },
        ],
      },
      {
        path: "feedback",
        element: <FeedBack />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
    ],
  },
]);

export { router };
