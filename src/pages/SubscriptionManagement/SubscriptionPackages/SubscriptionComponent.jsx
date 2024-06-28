import React, { useEffect, useState } from "react";
import { API } from "../../../api";
import Header from "../../../components/dashboard/Header";
import Tableform from "../../../components/general/Tableform";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import { subscriptiontablecolumn } from "../../../data/subscriptiontablecolumn";

const SubscriptionComponent = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allsubscriptions, setAllSubscriptions] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllSubscription();
      setLoading(false);
      setAllSubscriptions(response?.data?.data);
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
        pagetitle={"Subscription Management"}
        previous={"Dashboard"}
        currentpage={"Subscription packages"}
        btntext={"Add Subscription"}
        btnlink={"/dashboard/subscription-packages/add-subscription"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllSubscriptions}
          filterdata={allsubscriptions}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <Tableform
            filterdata={allsubscriptions}
            tablecolumns={subscriptiontablecolumn}
            itemPerPage={itemPerPage}
            searchFilter={searchFilter}
            pagename={"edit-subscription"}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionComponent;
