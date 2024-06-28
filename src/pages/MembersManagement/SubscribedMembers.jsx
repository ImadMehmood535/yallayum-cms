import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import ResultFilterBar from "../../components/general/ResultFilterBar";
import Loader from "../../components/general/Loader";
import Tableform from "../../components/general/Tableform";
import { API } from "../../api";
import { errorToast } from "../../hooks/useToast";

import { subscribedmemberscolumn } from "../../data/subscribedmemberscolumn";

const SubscribedMembers = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
   const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllSubscribedMembers();
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
        currentpage={"Subscribed Member"}
        btntext={"Add Member Subscription "}
        btnlink={"/dashboard/members-management/subscribed-members/add-subscribed-members"}
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
                tablecolumns={subscribedmemberscolumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit-subscribed-members"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribedMembers;
