import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { errorToast, successToast } from "../../../hooks/useToast";
import { useForm } from "react-hook-form";
import { subscriptionschema } from "../../../validations/subscription";

const EditSubscription = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let query = useQuery();
  let id = parseInt(query.get("id"));
  let subscriptionData = JSON.parse(query.get("object"));
  const [allexams, setAllExams] = useState([]);

  const durationMode = [
    {
      id: "days",
      key: "days",
      name: "days",
    },
    {
      id: "years",
      key: "years",
      name: "years",
    },
    {
      id: "months",
      key: "months",
      name: "months",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(subscriptionschema) },
    {
      defaultValues: {
        name: subscriptionData.name,
        examId: Number(subscriptionData?.examId),
        price: Number(subscriptionData?.price),
        duration: Number(subscriptionData?.duration),
        durationMode: subscriptionData?.durationMode,
        reSubscriptionPrice: Number(subscriptionData?.reSubscriptionPrice),
        isLive: subscriptionData?.isLive,
        isTrial: subscriptionData?.isTrial,
      },
    }
  );

  const getData = async () => {
    try {
      const response = await API.getAllExams();
      setAllExams(response?.data?.data);
    } catch (error) {
      errorToast(error, "Cannot fetch exams");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateSubscription(id, {
        ...formData,
        examId: formData.examId ? formData?.examId : subscriptionData?.examId,
      });
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not Subscription  data");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Subscription"}
        previous={"Dashboard"}
        currentpage={"Edit Subscription"}
      />
      {subscriptionData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Subscription Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={subscriptionData?.name}
                placeholder="Subscription Name"
                errortext="Subscription Name"
                errors={errors}
                name="name"
                register={register}
              />
              <InputField
                label="Exam Name"
                placeholder="Exam Name"
                type="select"
                options={allexams}
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={subscriptionData?.examId}
                errortext="Exam Name Is Required"
                errors={errors}
                name="examId"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Number Of Days"
                type="number"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={subscriptionData?.duration}
                placeholder="60"
                errortext="Subscription Duration is Required"
                errors={errors}
                name="duration"
                register={register}
              />
              <InputField
                label="Duration Mode"
                placeholder="Duration Mode"
                type="select"
                options={durationMode}
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={subscriptionData?.durationMode}
                errortext="durationMode Is Required"
                errors={errors}
                name="durationMode"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Subscription Price"
                type="number"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={subscriptionData?.price}
                placeholder="699"
                errortext="price Is Required"
                errors={errors}
                name="price"
                register={register}
              />
              <InputField
                label="ReSubscription Price"
                type="number"
                isInvalid={isInvalid}
                isRequired={false}
                defaultValue={subscriptionData?.reSubscriptionPrice}
                placeholder="499"
                errortext="Subscription Price is Required"
                errors={errors}
                name="reSubscriptionPrice"
                register={register}
              />
            </div>

            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                isInvalid={isInvalid}
                placeholder="Status"
                isRequired={true}
                defaultValue={subscriptionData?.isLive}
                errortext="Status Is Required"
                errors={errors}
                name="isLive"
                register={register}
              />
              <InputField
                label="isTrial"
                type="select"
                options={[true, false]}
                isInvalid={isInvalid}
                placeholder="isTrial"
                isRequired={false}
                defaultValue={subscriptionData?.isTrial}
                errortext="isTrial Is Required"
                errors={errors}
                name="isTrial"
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

export default EditSubscription;
