import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/signin/ForgotPassword";
import ResetPassword from "../pages/signin/ResetPassword";
import LogIn from "../pages/signin/LogIn";
import RootLayout from "../components/layout/RootLayout";
import Indexdashboard from "../pages/dashboarddefault/Indexdashboard";
import SubscriptionComponent from "../pages/SubscriptionManagement/SubscriptionPackages/SubscriptionComponent";
import AddSubscription from "../pages/SubscriptionManagement/SubscriptionPackages/AddSubscription";
import EditSubscription from "../pages/SubscriptionManagement/SubscriptionPackages/EditSubscription";

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
import EditProducts from "../pages/ecommerce/products/EditProducts";
import Categories from "../pages/ecommerce/Categories/Categories";
import AddCategories from "../pages/ecommerce/Categories/AddCategories";
import EditCategory from "../pages/ecommerce/Categories/EditCategory";
import AllReviews from "../pages/ecommerce/reviews/AllReviews";
import EditReviews from "../pages/ecommerce/reviews/EditReviews";
import CustomProduct from "../pages/ecommerce/custom-product/CustomProduct";
import EditCustomProduct from "../pages/ecommerce/custom-product/EditCustomProduct";
import AddCustomFlavor from "../pages/ecommerce/custom-product/AddCustomFlavor";
import AllOrders from "../pages/ecommerce/order/AllOrders";
import AllCustomOrder from "../pages/ecommerce/custom-order/AllCustomOrder";
import EditCustomOrder from "../pages/ecommerce/custom-order/EditCustomOrder";

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
              {
                path: "edit",
                element: <EditProducts />,
              },
            ],
          },

          {
            path: "reviews",
            children: [
              {
                path: "",
                element: <AllReviews />,
              },
              {
                path: "edit",
                element: <EditReviews />,
              },
            ],
          },
          {
            path: "order",
            children: [
              {
                path: "",
                element: <AllOrders />,
              },
              {
                path: "edit",
                element: <AllReviews />,
              },
            ],
          },
          {
            path: "custom-order",
            children: [
              {
                path: "",
                element: <AllCustomOrder />,
              },
              {
                path: "edit",
                element: <EditCustomOrder />,
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
                element: <EditCategory />,
              },
            ],
          },
        ],
      },
      {
        path: "store",
        children: [
          {
            path: "custom-product",
            children: [
              {
                path: "",
                element: <CustomProduct />,
              },
              {
                path: "add-flavor",
                element: <AddCustomFlavor />,
              },
              {
                path: "edit-flavor",
                element: <EditCustomProduct />,
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
