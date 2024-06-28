import React, { useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExamSchema } from "../../../validations/exam";

const AddExam = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ExamSchema) });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.addExam(data);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add exam");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Exams"}
        previous={"Dashboard"}
        currentpage={"Add Exams"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <InputField
            label="Exam Name"
            type="text"
            isInvalid={isInvalid}
            isRequired={true}
            placeholder="Exam Name"
            errortext="Exam Name Is Required"
            errors={errors}
            name="name"
            register={register}
          />
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Number of Questions"
              type="number"
              isInvalid={isInvalid}
              isRequired={true}
              placeholder="Number of Questions"
              errortext="Number Of Querstions in Required"
              errors={errors}
              name="noOfQuestions"
              register={register}
            />
            <InputField
              label="Total Time in Minutes"
              type="number"
              isInvalid={isInvalid}
              isRequired={true}
              placeholder="Total Time in Minutes"
              errortext="Time Is Required"
              errors={errors}
              name="totalTime"
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
              errortext="Status Is Required"
              errors={errors}
              name="isLive"
              register={register}
            />
            <InputField
              label="Featured"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Featured"
              isRequired={false}
              errortext="Featured Is Required"
              errors={errors}
              name="isFeatured"
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

export default AddExam;
