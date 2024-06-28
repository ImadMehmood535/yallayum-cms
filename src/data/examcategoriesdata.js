import { Checkbox } from "@nextui-org/react";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";

const examcategoriesdata = [
  {
    id: 1,
    selectionbox: <Checkbox />,
    name: "Obstetrics and Gynecology 12",
    examId: 1,
    examname : "MCQ Exam",
    isLive : false,
  },
  {
    id: 2,
    selectionbox: <Checkbox />,
    name: "Obstetrics and Gynecology 22",
    examId: 2,
    name : "MCQ Exam 2",
    isLive : true,
  },
  {
    id: 3,
    selectionbox: <Checkbox />,
    name: "Obstetrics and Gynecology 22333",
    examId: 3,
    examname : "MCQ Exam 2",
    isLive : true,
  },
  {
    id: 4,
    selectionbox: <Checkbox />,
    name: "Obstetrics and Gynecology 2323232",
    examId: 4,
    examname : "MCQ Exam 2",
    isLive : true,
  },
];

export { examcategoriesdata };