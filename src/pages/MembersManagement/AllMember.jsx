import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import ResultFilterBar from "../../components/general/ResultFilterBar";
import Tableform from "../../components/general/Tableform";
import Loader from "../../components/general/Loader";
import { API } from "../../api";
import { errorToast } from "../../hooks/useToast";
import { allmembercolumn } from "../../data/allmembercolumn";

const AllMember = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllUsers();
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
        pagetitle={"Members Management"}
        previous={"Dashboard"}
        currentpage={"All Member"}
        btntext={"Add Members "}
        btnlink={"/dashboard/members-management/add-members"}
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
                tablecolumns={allmembercolumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit-members"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllMember;
