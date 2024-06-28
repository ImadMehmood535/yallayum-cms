import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { promoschema } from "../../../validations/promo";
import { errorToast, successToast } from "../../../hooks/useToast";
import { CodeType, PromoUsage } from "../../../data/codeData";

const AddPromoCode = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState(null);

  const [allsubscription, setallsubscription] = useState([
    {
      id: "isGlobal",
      name: "To all subscriptions",
    },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(promoschema) });

  const getData = async () => {
    try {
      const response = await API.getAllSubscription();
      setallsubscription((prev) => [prev[0], ...response?.data?.data]);

      const response1 = await API.getAllUsers();
      setAllMembers(response1?.data?.data);
    } catch (error) {
      errorToast(error, "Cannot fetch exams");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //onsubmit
  const onSubmit = async (data) => {
    console.log(data, "data");
    setLoading(true);
    let global = false;
    try {
      if (!data?.expire) {
        delete data?.expireDate;
      }

      if (data?.subscriptionId === "isGlobal") {
        delete data.subscriptionId;
        global = true;
      } else {
        data.subscriptionId = Number(data.subscriptionId);
      }

      if (data?.userId) {
        data.userId = Number(data.userId);
      } else {
        delete data.userId;
      }

      // console.log(data, "data");
      const response = await API.addPromo({
        ...data,
        isGlobal: global,
      });
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add addPromo");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Promo Codes"}
        previous={"Dashboard"}
        currentpage={"Add Promo"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <InputField
            label="Promo Name"
            type="text"
            isInvalid={isInvalid}
            isRequired={true}
            placeholder="Promo Name"
            errortext="Promo Name Is Required"
            errors={errors}
            name="name"
            register={register}
          />
          <InputField
            label="Subscription Name"
            placeholder="Subscription Name"
            type="select"
            options={allsubscription}
            isInvalid={isInvalid}
            isRequired={true}
            errortext="Subscription Name Is Required"
            errors={errors}
            name="subscriptionId"
            register={register}
          />
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Promo Code Type"
              placeholder="Promo Code Type"
              type="select"
              options={CodeType}
              isInvalid={isInvalid}
              isRequired={true}
              errortext="Promo Code Type Is Required"
              errors={errors}
              name="type"
              register={register}
            />

            <InputField
              label={
                watch("type") === "percentage"
                  ? "Value in Percentage"
                  : "Value in Amount"
              }
              type="number"
              isInvalid={false}
              isRequired={true}
              placeholder="10"
              errortext="Amount Is Required"
              errors={errors}
              name="typeValue"
              register={register}
            />
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Promo Code Usage:"
              placeholder="Promo Code Usage:"
              type="select"
              options={PromoUsage}
              isInvalid={isInvalid}
              isRequired={true}
              errortext="Promo Code Usage: Is Required"
              errors={errors}
              name="usage"
              register={register}
            />
            {watch("usage") == "more" && (
              <InputField
                label={`Usage Limit`}
                type="number"
                isInvalid={false}
                isRequired={false}
                placeholder="10"
                errortext="Usage Limit Is Required"
                errors={errors}
                name="usageLimit"
                register={register}
              />
            )}
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Promo Code Expiry:"
              placeholder="Promo Code Expiry:"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              isRequired={true}
              errortext="Promo Code Expiry Is Required"
              errors={errors}
              name="expire"
              register={register}
            />
            {watch("expire") == "true" && (
              <InputField
                label={`Date`}
                type="date"
                isInvalid={false}
                isRequired={false}
                placeholder="10"
                errortext="Date Is Required"
                errors={errors}
                name="expiryDate"
                register={register}
              />
            )}
          </div>

          <div className="grid grid-col-1 sm:grid-cols-2 items-center gap-4 mt-4">
            <InputField
              label="Apply only to a specific user?"
              type="Checkbox"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Use Discount Ad on website:"
              isRequired={false}
              errortext="isTrial Is Required"
              errors={errors}
              name="isSpecificUser"
              register={register}
            />
            {watch("isSpecificUser") === true && (
              <InputField
                emailTrue={true}
                label="Member"
                type="select"
                options={allMembers}
                placeholder="Member Email"
                errors={errors}
                name="userId"
                register={register}
              />
            )}
          </div>
          <div className="grid grid-col-1 sm:grid-cols-1 gap-4 mt-4">
            <InputField
              label="Status"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Status"
              isRequired={true}
              errortext="Status Is Required"
              errors={errors}
              name="isActive"
              register={register}
            />
            <InputField
              label="Use Discount Ad on website:"
              type="Checkbox"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Use Discount Ad on website:"
              isRequired={false}
              errortext="isTrial Is Required"
              errors={errors}
              name="discountAd"
              register={register}
            />
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
                onClick={() => handleCancle()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPromoCode;
