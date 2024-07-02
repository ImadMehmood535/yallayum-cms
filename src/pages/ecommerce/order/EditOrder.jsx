import React, { useEffect, useState } from "react";
import { useQuery } from "../../../hooks/queryParam";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/general/ButtonComponent";

const EditOrders = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const [orderData, setOrderData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getData = async () => {
    try {
      const response = await API.getSingleOrder(id);
      setOrderData(response?.data?.data);
    } catch (error) {
      errorToast(error, "Failed to load data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!data?.adminReply) {
      delete data?.adminReply;
    }

    try {
      const response = await API.updateProductReview(id, {
        adminReply: data?.adminReply,
        isApproved: data?.isApproved === "true" ? true : false,
      });

      successToast(response?.data?.message, "Updated");
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Order"}
        previous={"Dashboard"}
        currentpage={"Edit Order"}
      />

      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        {orderData && (
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="flex justify-start items-center gap-12">
              <div
                className={`w-[150px] py-2 ${
                  orderData?.orderStatus === "PENDING"
                    ? "bg-red-500"
                    : "bg-themePrimary-0"
                } rounded-md`}
              >
                <p className="text-white text-center">
                  {orderData?.orderStatus}
                </p>
              </div>
              <div className={`w-[200px] py-2 bg-themePrimary-0 rounded-md`}>
                <div className="flex justify-center gap-5 items-center">
                  <p className="text-white text-center">Order No:</p>
                  <p className="text-white text-center">{orderData?.name}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex justify-between items-center gap-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md w-full py-4 px-6 shadow-lg">
                <p className="text-white text-lg font-semibold">User Name</p>
                <p className="text-white text-lg font-light">
                  {orderData?.userName}
                </p>
              </div>
              <div className="flex justify-between items-center gap-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md w-full py-4 px-6 shadow-lg">
                <p className="text-white text-lg font-semibold">User Contact</p>
                <p className="text-white text-lg font-light">
                  {orderData?.userPhone}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex justify-between items-center gap-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md w-full py-4 px-6 shadow-lg">
                <p className="text-white text-lg font-semibold">User Email</p>
                <p className="text-white text-lg font-light">
                  {orderData?.userEmail}
                </p>
              </div>
              <div className="flex justify-between items-center gap-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md w-full py-4 px-6 shadow-lg">
                <p className="text-white text-lg font-semibold">Order Date</p>
                <p className="text-white text-lg font-light">
                  {orderData?.date}
                </p>
              </div>
            </div>

            {/* Map over order items */}
            <div className="mt-6">
              {orderData.orderItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-md w-full py-4 px-6 shadow-lg mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-white text-lg font-semibold">
                        {item.name}
                      </p>
                      <p className="text-white text-md font-light">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-lg font-semibold">
                      Price: ${item.price}
                    </p>
                    <p className="text-white text-lg font-semibold">
                      SubTotal: ${item.subTotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center gap-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md w-full py-4 px-6 shadow-lg">
          <p className="text-white text-lg font-semibold">Total Price</p>
          <p className="text-white text-lg font-light">{orderData?.totalPrice}</p>
        </div>

        <div className="w-full md:w-1/4 mt-4">
          <div className="flex gap-3">
            <ButtonComponent
              type="submit"
              text="Save"
              loading={loading}
              isActive={true}
            />
            <ButtonComponent
              text="Cancel"
              isActive={true}
              btnclass={"bg-red-500"}
              onClick={handleCancel}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOrders;
