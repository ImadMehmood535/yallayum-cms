import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import Loader from "../../../components/general/Loader";
import { promocodescolumn } from "../../../data/topicscolumn";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";

const TopicsComponents = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [alltopics, setAllTopics] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllTopics();
      setAllTopics(response?.data?.data);
      setLoading(false);
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
        pagetitle={"Topics"}
        previous={"Dashboard"}
        currentpage={"topics"}
        btntext={"Add Topic"}
        btnlink={"/dashboard/exam/topics/add-topics"}
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
            tablecolumns={promocodescolumn}
            itemPerPage={itemPerPage}
            searchFilter={searchFilter}
            pagename={"edit-topic"}
          />
        )}
      </div>
    </div>
  );
};

export default TopicsComponents;
