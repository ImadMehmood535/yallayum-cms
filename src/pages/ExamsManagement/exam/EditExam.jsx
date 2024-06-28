import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { ExamSchema } from "../../../validations/exam";
import { yupResolver } from "@hookform/resolvers/yup";

const EditExam = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let query = useQuery();
  let id = parseInt(query.get("id"));

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getSingleExam(id);
      setData(response?.data?.data);
    } catch (error) {
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ExamSchema) });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.updateExam(id, data);
      successToast(response?.data?.message);
      setData(response?.data?.data);
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

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Edit"}
        previous={"Dashboard"}
        currentpage={"Edit Exam"}
      />

      {data && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <InputField
              label="Exam Name"
              type="text"
              isInvalid={isInvalid}
              isRequired={true}
              defaultValue={data?.name}
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
                defaultValue={data?.noOfQuestions}
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
                defaultValue={data?.totalTime}
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
                isRequired={true}
                defaultValue={data?.isLive}
                placeholder="Status"
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
                isRequired={true}
                defaultValue={data?.isFeatured}
                placeholder="Status"
                errortext="Status Is Required"
                errors={errors}
                name="isFeatured"
                register={register}
              />
            </div>

            <div className="w-full md:w-1/4 mt-4">
              <div className="flex gap-3">
                <ButtonComponent
                  text="Save"
                  type={"submit"}
                  loading={loading}
                  isActive={true}
                />
                <ButtonComponent
                  text="Cancle"
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

export default EditExam;
