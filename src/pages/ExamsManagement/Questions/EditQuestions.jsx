import React, { useEffect, useState } from "react";
import { examQuestions, questionsschema } from "../../../validations/questions";
import { useForm } from "react-hook-form";
import { API } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import { errorToast, successToast } from "../../../hooks/useToast";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import Editor from "../../../components/general/Editor";
import ButtonComponent from "../../../components/general/ButtonComponent";
import EditRadioOptions from "../../../components/general/EditRadioOptions";
import EditCheckboxOptions from "../../../components/general/EditCheckboxOptions";
import Loader from "../../../components/general/Loader";
import { yupResolver } from "@hookform/resolvers/yup";

const EditQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  let query = useQuery();
  let id = Number(query.get("id"));

  const difficultyMode = [
    {
      id: "easy",
      key: "easy",
      name: "easy",
    },
    {
      id: "moderate",
      key: "moderate",
      name: "moderate",
    },
    {
      id: "difficult",
      key: "difficult",
      name: "difficult",
    },
  ];
  const anstype = [
    {
      id: "one",
      key: "one",
      name: "one",
    },
    {
      id: "multiple",
      key: "multiple",
      name: "multiple",
    },
  ];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(examQuestions) });

  const [allexams, setAllExams] = useState([]);
  const [options, setOptions] = useState([]);

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

  const [alltopic, setAllTopic] = useState([]);

  const getTopicData = async () => {
    try {
      const response = await API.getAllTopics();
      setAllTopic(response?.data?.data);
    } catch (error) {
      errorToast(error, "Cannot fetch Topics");
    }
  };

  useEffect(() => {
    getExamData();
    getCategoryData();
    getTopicData();
  }, []);

  //get single start
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getSingleQuestion(id);
      setData(response?.data?.data);
      setOptions(response?.data?.data?.answer?.option);
      setValue("name" , response?.data?.data?.name)
      setValue("answerDetails" , response?.data?.data?.answer?.answerDetails)
      setValue("referenceDetails" , response?.data?.data?.answer?.referenceDetails)
      setPageData(true);
    } catch (error) {
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  //get single end

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        isTrial: Boolean(formData.isTrial),
        isLive: Boolean(formData.isLive),
        difficultyMode: formData.difficultyMode,
        examId: Number(formData.examId) || Number(data?.examId),
        categoryId: Number(formData.categoryId) || Number(data?.categoryId),
        topicId: Number(formData.topicId) || Number(data?.topicId),
        answers: {
          type: formData.type,
          answerDetails: formData.answerDetails,
          referenceDetails: formData.referenceDetails,
          options: options
            ? options.map((option) => ({
                name: option.name,
                isCorrect: option.isCorrect,
              }))
            : data?.answer?.option?.map((item) => ({
                name: item?.name,
                isCorrect: item?.isCorrect,
              })),
        },
      };

      const response = await API.updateQuestion(id, payload);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot update questions");
    }
  };

  const handleCancle = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Questions"}
        previous={"Dashboard"}
        currentpage={"Edit Questions"}
      />
      {data ? (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
              <InputField
                label="Exam Name"
                type="select"
                options={allexams}
                defaultValue={data?.examId}
                placeholder="Exam Name"
                errors={errors}
                name="examId"
                register={register}
              />
              <InputField
                label="Category Name"
                type="select"
                options={allcategory}
                defaultValue={data?.categoryId}
                placeholder="Category Name"
                errors={errors}
                name="categoryId"
                register={register}
              />
              <InputField
                label="Topic Name"
                type="select"
                options={alltopic}
                defaultValue={data?.topicId}
                placeholder="Category Name"
                errors={errors}
                name="topicId"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4 mt-4">
              <InputField
                label="Difficulty Level"
                placeholder="Difficulty Level"
                type="select"
                options={difficultyMode}
                defaultValue={data?.difficultyMode}
                errors={errors}
                name="difficultyMode"
                register={register}
              />
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                placeholder="Status"
                defaultValue={data?.isLive}
                errors={errors}
                name="isLive"
                register={register}
              />
              <InputField
                label="isTrial"
                type="select"
                options={[true, false]}
                placeholder="isTrial"
                defaultValue={data?.isTrial}
                errors={errors}
                name="isTrial"
                register={register}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-4">
              <Editor
                label="Statement"
                errors={errors}
                name="name"
                defaultValue={data?.name}
                register={register}
                setValue={setValue}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-1 gap-4 mt-4">
              <InputField
                label="Answer Type:"
                placeholder="Answer Type:"
                type="select"
                options={anstype}
                defaultValue={data?.answer.type}
                errors={errors}
                name="type"
                register={register}
              />
              {watch("type") === "one" && (
                <>
                  {options && (
                    <EditRadioOptions
                      isRequired={false}
                      errors={errors}
                      name="options"
                      register={register}
                      control={control}
                      setOptions={setOptions}
                      options={options}
                    />
                  )}
                </>
              )}

              {watch("type") === "multiple" && (
                <EditCheckboxOptions
                  isRequired={false}
                  defaultValue={data?.answer?.type}
                  errors={errors}
                  name="options"
                  register={register}
                  control={control}
                  setOptions={setOptions}
                  options={options}
                />
              )}
            </div>
            <div className="grid grid-col-1  gap-4  mt-4">
              <Editor
                label="Answer Details:"
                errors={errors}
                name="answerDetails"
                defaultValue={data?.answer?.answerDetails}
                register={register}
                setValue={setValue}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-4">
              <Editor
                label="Reference Details:"
                errors={errors}
                name="referenceDetails"
                defaultValue={data?.answer?.referenceDetails}
                register={register}
                setValue={setValue}
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditQuestions;
