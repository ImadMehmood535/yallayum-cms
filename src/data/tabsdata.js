import { PiPresentationChartThin } from "react-icons/pi";
import { LiaTasksSolid } from "react-icons/lia";
import { TbCategory } from "react-icons/tb";
import { TbWorld } from "react-icons/tb";

import {
  addquestion,
  discount1,
  examManagement,
  examicon,
  memberManagement,
  siteManagement,
  subscriptionManagement,
  topic,
} from "../assets";
import { SlNotebook } from "react-icons/sl";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { CiMedicalClipboard } from "react-icons/ci";
import { RiFolderAddLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { BiPackage } from "react-icons/bi";
import { LuPackagePlus } from "react-icons/lu";
import { LiaBlogSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
import { SlEnvolopeLetter } from "react-icons/sl";

const tabsdata = [
  {
    id: 1,
    no: 1,
    icon: <img src={examManagement} alt="examManagement" />,
    name: "Exams Management",
    link: "/exam",

    subCategories: [
      {
        icon: <SlNotebook />,
        name: "Exams",
        link: "/dashboard/allexam",
      },
      {
        icon: <TbCategory className="" />,
        name: "Categories",
        link: "/dashboard/exam/exam-categories",
      },
      {
        icon: <TbShoppingBagDiscount />,
        name: "Promo Code",
        link: "/dashboard/exam/promo-code",
      },
      {
        icon: <CiMedicalClipboard className="text-xl" />,
        name: "Topics",
        link: "/dashboard/exam/topics",
      },
      {
        icon: <RiFolderAddLine />,
        name: "Questions",
        link: "/dashboard/exam/questions",
      },
    ],
  },
  {
    id: 2,
    no: 2,
    icon: <img src={memberManagement} alt="examManagement" />,
    name: "Members Management",

    subCategories: [
      {
        icon: <FaUserPlus className="" />,
        name: "Add Member",
        link: "members-management/add-members",
      },
      {
        icon: <FaUser className="text-[15px] " />,
        name: "All Members ",
        link: "members-management/all-members",
      },
      {
        icon: <FaUserCheck className="" />,
        name: "Subscribed Members",
        link: "members-management/subscribed-members",
      },
    ],
  },
  {
    id: 3,
    no: 3,
    icon: <img src={subscriptionManagement} alt="examManagement" />,
    name: "Subscription Management",
    link: "/",

    subCategories: [
      {
        icon: <LuPackagePlus className="" />,
        name: "Add Subscription",
        link: "subscription-packages/add-subscription",
      },
      {
        icon: <BiPackage className="" />,
        name: "Subscription Packages",
        link: "all-subscription-packages",
      },
    ],
  },
  {
    id: 4,
    no: 4,
    icon: <img src={siteManagement} alt="examManagement" />,
    name: "Site Management",
    link: "/",

    subCategories: [
      {
        icon: <LiaBlogSolid className="" />,
        name: "Blogs",
        link: "blogs",
      },
      {
        icon: <VscFeedback className="" />,
        name: "Feebacks",
        link: "feedback",
      },
      {
        icon: <GoReport className="" />,
        name: "Reports",
        link: "reports",
      },
      {
        icon: <SlEnvolopeLetter className="" />,
        name: "Newsletters Subscriptions",
        link: "newsletter",
      },
    ],
  },
];
export { tabsdata };
