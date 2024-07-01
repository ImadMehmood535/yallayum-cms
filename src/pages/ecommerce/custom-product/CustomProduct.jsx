import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";
import { customproduct } from "../../../data/customproducttable";
import CustomLinkComp from "../../../components/general/CustomLinkComp";
import PopupModal from "../../../components/general/PopupModal";
import EditSizeModal from "../../../components/general/EditSizeModal";

const CustomProduct = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [filterdata, setfilterdata] = useState();
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allcategories, setAllCategories] = useState(null);
  const [allflavor, setAllFlavor] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllFlavor();
      setAllFlavor(response?.data?.data);
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
        pagetitle={"Custom Product"}
        previous={"Dashboard"}
        currentpage={"Custom Product"}
        btntext={"Add Flavor"}
        btnlink={"/dashboard/store/custom-product/add-flavor"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllFlavor}
          filterdata={allflavor}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="my-4">
              {/* <CustomLinkComp btntext="Edit Sizes" btnlink="/" /> */}
              <EditSizeModal btntitle="edit sizes"/>
            </div>
            {allflavor && (
              <Tableform
                filterdata={allflavor}
                tablecolumns={customproduct}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit-flavor"}
                preview={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomProduct;
