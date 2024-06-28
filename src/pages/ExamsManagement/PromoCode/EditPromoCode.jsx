import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { promoschema } from "../../../validations/promo";
import ButtonComponent from "../../../components/general/ButtonComponent";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import { useQuery } from "../../../hooks/queryParam";
import { formatDate } from "../../../utils/date";
import PromoCode from "./PromoCode";

const EditPromoCode = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState(null);

  let query = useQuery();
  let id = Number(query.get("id"));
  let PromoData = JSON.parse(query.get("object"));

  const [allsubscription, setallsubscription] = useState([
    {
      id: "isGlobal",
      name: "To all subscriptions",
    },
  ]);
  const CodeType = [
    {
      id: "fixed",
      key: "fixed",
      name: "fixed",
    },
    {
      id: "percentage",
      key: "percentage",
      name: "percentage",
    },
  ];
  const PromoUsage = [
    {
      id: "one",
      key: "one",
      name: "one",
    },
    {
      id: "more",
      key: "more",
      name: "more",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(promoschema) },
    {
      defaultValues: {
        name: PromoData?.name,
        subscriptionId: Number(PromoData?.subscriptionId),
        type: PromoData?.type,
        typeValue: PromoData?.typeValue,
        usage: PromoData?.usage,
        usageLimit: PromoData?.usageLimit,
        expire: PromoData?.expire,
        expiryDate: formatDate(PromoData?.expiryDate),
        isGlobal: PromoData?.isGlobal,
        isActive: PromoData?.isActive,
        discountAd: PromoData?.discountAd,
        isSpecificUser: PromoData?.isSpecificUser,
        userId: PromoData?.userId,
      },
    }
  );

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

  const onSubmit = async (formData) => {
    setLoading(true);
    let global = false;

    try {
      if (!formData.expire) {
        delete formData.expiryDate;
      } else {
        formData.expiryDate = new Date(formData.expiryDate);
      }
      if (formData?.subscriptionId === "isGlobal") {
        delete formData.subscriptionId;
        global = true;
      } else {
        formData.subscriptionId = Number(formData.subscriptionId);
      }

      if (formData.userId) {
        formData.userId = Number(formData.userId)
      } else {
        delete formData.userId
      }

      const response = await API.updatePromo(id, {
        ...formData,
        isGlobal: global,
      });
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update exam data");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  console.log(PromoData, "PromoData");

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Promo Codes"}
        previous={"Dashboard"}
        currentpage={"Add Promo"}
      />
      {PromoData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <InputField
              label="Promo Name"
              type="text"
              isInvalid={isInvalid}
              isRequired={true}
              defaultValue={PromoData?.name}
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
              defaultValue={PromoData?.subscriptionId}
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
                defaultValue={PromoData?.type}
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
                defaultValue={PromoData?.typeValue}
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
                defaultValue={PromoData?.usage}
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
                  defaultValue={PromoData?.usageLimit}
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
                defaultValue={PromoData?.expire}
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
                  defaultValue={formatDate(PromoData?.expiryDate)}
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
                defaultValue={PromoData?.isSpecificUser}
                register={register}
              />
              {allMembers && (
                <>
                  {watch("isSpecificUser") === true && (
                    <InputField
                      emailTrue={true}
                      label="Member"
                      type="select"
                      options={allMembers}
                      placeholder="Member Email"
                      errors={errors}
                      name="userId"
                      defaultValue={PromoData?.userId}
                      register={register}
                    />
                  )}
                </>
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
                defaultValue={PromoData?.isActive}
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
                defaultValue={PromoData?.discountAd}
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
      )}
    </div>
  );
};

export default EditPromoCode;
