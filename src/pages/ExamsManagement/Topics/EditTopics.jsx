import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { useQuery } from "../../../hooks/queryParam";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { topicsschema } from "../../../validations/topics";

const EditTopics = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  let query = useQuery();
  let id = Number(query.get("id"));
  let Topic = JSON.parse(query.get("object"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(topicsschema) },
    {
      defaultValues: {
        name: Topic?.name,
        examId: Number(Topic?.examId),
        isLive: Topic?.isLive,
        categoryId: Number(Topic?.categoryId),
      },
    }
  );

  const [allexams, setAllExams] = useState([]);

  const getExamData = async () => {
    try {
      const response = await API.getAllExams();
      setAllExams(response?.data?.data);
    } catch (error) {
      errorToast(error, "Cannot fetch exams");
    }
  };

  const [allcategory, setAllCategory] = useState([]);

  const getCategoryData = async () => {
    try {
      const response = await API.getAllCategories();
      setAllCategory(response?.data?.data);
    } catch (error) {
      errorToast(error, "Cannot fetch exams");
    }
  };

  useEffect(() => {
    getExamData();
    getCategoryData();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateTopics(id, {
        ...formData,
        examId: formData.examId ? formData?.examId : Topic?.examId,
        categoryId: formData.categoryId
          ? formData?.categoryId
          : Topic?.categoryId,
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

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Topics"}
        previous={"Dashboard"}
        currentpage={"Add Topic"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <InputField
            label="Category Name"
            type="text"
            isInvalid={isInvalid}
            isRequired={true}
            defaultValue={Topic?.name}
            placeholder="Category Name"
            errortext="Category Name Is Required"
            errors={errors}
            name="name"
            register={register}
          />
          <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
            <InputField
              label="Exam Name"
              type="select"
              options={allexams}
              isInvalid={isInvalid}
              isRequired={true}
              defaultValue={Topic?.examId}
              placeholder="Exam Name"
              errortext="Exam Name Is Required"
              errors={errors}
              name="examId"
              register={register}
            />
            <InputField
              label="category Name"
              type="select"
              options={allcategory}
              isInvalid={isInvalid}
              isRequired={true}
              defaultValue={Topic?.categoryId}
              placeholder="Category Name"
              errortext="Category Name Is Required"
              errors={errors}
              name="categoryId"
              register={register}
            />
            <InputField
              label="Status"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Status"
              isRequired={true}
              defaultValue={Topic?.isLive}
              errortext="Status Is Required"
              errors={errors}
              name="isLive"
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

export default EditTopics;
