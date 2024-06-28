import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import { examcategoriescolumn } from "../../../data/examcategoriescolumn";
import { examcategoriesdata } from "../../../data/examcategoriesdata";
import { examtabledata } from "../../../data/examtabledata";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";

const ExamCategories = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllCategories();
      setAllCategories(response?.data?.data);
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
        pagetitle={"Categories"}
        previous={"Dashboard"}
        currentpage={"Categories"}
        btntext={"Add Categories"}
        btnlink={"/dashboard/exam/exam-categories/add-categories"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllCategories}
          filterdata={allcategories}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            {allcategories && (
              <Tableform
                filterdata={allcategories}
                tablecolumns={examcategoriescolumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit-category"}
                preview={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExamCategories;
