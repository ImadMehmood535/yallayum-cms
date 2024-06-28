import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import { promocodescolumn } from "../../../data/promocodescolumn";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";

const PromoCode = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allpromo, setAlPromo] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllPromo();
      setLoading(false);
      setAlPromo(response?.data?.data);
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
        pagetitle={"Promo Code"}
        previous={"Dashboard"}
        currentpage={"Promo Code"}
        btntext={"Add Code"}
        btnlink={"/dashboard/exam/promo-code/add-promo-code"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setfilterdata}
          filterdata={filterdata}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <Tableform
            filterdata={allpromo}
            tablecolumns={promocodescolumn}
            itemPerPage={itemPerPage}
            searchFilter={searchFilter}
            pagename={"edit-promo-code"}
          />
        )}
      </div>
    </div>
  );
};

export default PromoCode;
