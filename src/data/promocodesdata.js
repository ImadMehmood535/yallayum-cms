import { Checkbox } from "@nextui-org/react";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
const promocodesdata = [
  {
    id: 1,
    selectionbox: <Checkbox></Checkbox>,
    name: "50ty",
    type: "Percentage",
    discount: 50,
    usage: "Unlimited",
    expiry: "30-09-2017",
    total: 10000,
    used: 2,
    subscriptiontype: "All",
    setting: (
      <div className="flex ite start gap-4">
        <RiEdit2Line className="text-2xl text-themeBtn-0" />
        <RiDeleteBin6Line className="text-2xl text-red-500" />
      </div>
    ),
  },
  {
    id: 2,
    selectionbox: <Checkbox></Checkbox>,
    name: "51ty",
    type: "Percentage",
    discount: 50,
    usage: "Unlimited",
    expiry: "30-09-2017",
    total: 10000,
    used: 2,
    subscriptiontype: "All",
    setting: (
      <div className="flex ite start gap-4">
        <RiEdit2Line className="text-2xl text-themeBtn-0" />
        <RiDeleteBin6Line className="text-2xl text-red-500" />
      </div>
    ),
  },
  {
    id: 3,
    selectionbox: <Checkbox></Checkbox>,
    name: "52ty",
    type: "Percentage",
    discount: 50,
    usage: "Unlimited",
    expiry: "30-09-2017",
    total: 10000,
    used: 2,
    subscriptiontype: "All",
    setting: (
      <div className="flex ite start gap-4">
        <RiEdit2Line className="text-2xl text-themeBtn-0" />
        <RiDeleteBin6Line className="text-2xl text-red-500" />
      </div>
    ),
  },
  {
    id: 4,
    selectionbox: <Checkbox></Checkbox>,
    name: "53ty",
    type: "Percentage",
    discount: 50,
    usage: "Unlimited",
    expiry: "30-09-2017",
    total: 10000,
    used: 2,
    subscriptiontype: "All",
    setting: (
      <div className="flex ite start gap-4">
        <RiEdit2Line className="text-2xl text-themeBtn-0" />
        <RiDeleteBin6Line className="text-2xl text-red-500" />
      </div>
    ),
  },
  {
    id: 5,
    selectionbox: <Checkbox></Checkbox>,
    name: "54ty",
    type: "Percentage",
    discount: 50,
    usage: "Unlimited",
    expiry: "30-09-2017",
    total: 10000,
    used: 2,
    subscriptiontype: "All",
    setting: (
      <div className="flex ite start gap-4">
        <RiEdit2Line className="text-2xl text-themeBtn-0" />
        <RiDeleteBin6Line className="text-2xl text-red-500" />
      </div>
    ),
  },
  
];
export { promocodesdata };
