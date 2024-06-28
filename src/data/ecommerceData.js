import { CgProfile } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";

const ecommerceData = [
  {
    id: 1,
    no: 1,
    icon: <CgProfile className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Store",
    link: "/profile",

    subCategories: [
      {
        icon: (
          <CgFileDocument className="" />
        ),

        name: "Categories",
        link: "profile/details",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Products ",
        link: "profile/update",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Custom Product ",
        link: "profile/custom-product",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Reviews ",
        link: "profile/reviews",
      },
 
    ],
  },
  {
    id: 2,
    no: 2,
    icon: <CgProfile className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Orders",
    link: "/profile",

    subCategories: [
      {
        icon: (
          <CgFileDocument className="" />
        ),

        name: "General Orders",
        link: "profile/details",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Custom Orders ",
        link: "profile/update",
      },
 
    ],
  },
];
export { ecommerceData };
