import { CgProfile } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import { MdCoffeeMaker } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { SiMake } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";

const ecommerceData = [
  {
    id: 1,
    no: 1,
    icon: <IoIosCreate className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Store",
    link: "/store",

    subCategories: [
      {
        icon: <CgFileDocument className="" />,

        name: "Categories",
        link: "store/categories",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Products ",
        link: "store/products",
      },
      {
        icon: <MdCoffeeMaker className="" />,
        name: "Custom Product ",
        link: "store/custom-product",
      },
      {
        icon: <MdOutlineRateReview className="" />,
        name: "Reviews ",
        link: "store/reviews",
      },
    ],
  },
  {
    id: 2,
    no: 2,
    icon: <SiMake className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Orders",
    link: "/store",

    subCategories: [
      {
        icon: <CgFileDocument className="" />,

        name: "General Orders",
        link: "store/details",
      },
      {
        icon: <TbListDetails className="" />,
        name: "Custom Orders ",
        link: "store/update",
      },
    ],
  },
];
export { ecommerceData };
