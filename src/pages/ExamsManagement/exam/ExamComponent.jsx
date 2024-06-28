import React, { useEffect, useState } from "react";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Header from "../../../components/dashboard/Header";
import Tableform from "../../../components/general/Tableform";
import { examtablecolumn } from "../../../data/examtablecolumn";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";

const ExamComponent = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allexams, setAllExams] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllExams();
      setLoading(false);
      setAllExams(response?.data?.data);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Exams"}
        previous={"Dashboard"}
        currentpage={"Exams"}
        btntext={"Add Exam"}
        btnlink={"/dashboard/allexam/add-exam"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllExams}
          filterdata={allexams}
          setSearchFilter={setSearchFilter}
        /> 
        {loading ? (
          <Loader />
        ) : (
          <Tableform
             filterdata={allexams}
            tablecolumns={examtablecolumn}
            itemPerPage={itemPerPage}
            searchFilter={searchFilter}
            pagename={"edit-exam"}
          />
        )}
      </div>
    </div>
  );
};

export default ExamComponent;
