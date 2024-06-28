import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Loader from "../../../components/general/Loader";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import { questioncolumns } from "../../../data/questionscolumn";

const QuestionsComponent = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [alltopics, setAllTopics] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllQuestion();
      setLoading(false);
      setAllTopics(response?.data?.data);
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
        pagetitle={"Questions"}
        previous={"Dashboard"}
        currentpage={"topics"}
        btntext={"Add Questions"}
        btnlink={"/dashboard/exam/questions/add-question"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllTopics}
          filterdata={alltopics}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <Tableform
            filterdata={alltopics}
            tablecolumns={questioncolumns}
            itemPerPage={itemPerPage}
            searchFilter={searchFilter}
            pagename={"edit-question"}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsComponent;
