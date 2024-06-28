import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../hooks/useToast";
import Editor from "../../../components/general/Editor";
import RadioOptions from "../../../components/general/RadioOptions";
import CheckboxOptions from "../../../components/general/CheckboxOptions";
import { Divider } from "@nextui-org/react";
import { examQuestions } from "../../../validations/questions";

const AddQuestions = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  // } = useForm({ resolver: yupResolver(questionsschema) });

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

  const onSubmit = async (formdata) => {
    const payload = {
      name: formdata?.name,
      isTrial: Boolean(formdata?.isTrial),
      isLive: Boolean(formdata?.isLive),
      difficultyMode: formdata?.difficultyMode,
      examId: Number(formdata?.examId),
      categoryId: Number(formdata?.categoryId),
      topicId: Number(formdata?.topicId),
      answers: {
        type: formdata?.type,
        answerDetails: formdata?.answerDetails,
        referenceDetails: formdata?.referenceDetails,
        options: options,
      },
    };

    setLoading(true);
    try {
      const response = await API.addQuestion(payload);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add Topic");
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
        currentpage={"Add Questions"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
            <InputField
              label="Exam Name"
              type="select"
              options={allexams}
              placeholder="Exam Name"
              errors={errors}
              name="examId"
              register={register}
            />
            <InputField
              label="Category Name"
              type="select"
              options={allcategory}
              placeholder="Category Name"
              errors={errors}
              name="categoryId"
              register={register}
            />
            <InputField
              label="Topic Name"
              type="select"
              options={alltopic}
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
              errors={errors}
              name="difficultyMode"
              register={register}
            />
            <InputField
              label="Status"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Status"
              isRequired={true}
              errors={errors}
              name="isLive"
              defaultValue={false}
              register={register}
            />
            <InputField
              label="isTrial"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="isTrial"
              isRequired={false}
              errors={errors}
              name="isTrial"
              defaultValue={false}
              register={register}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Statement"
              errors={errors}
              name="name"
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
              errors={errors}
              name="type"
              register={register}
            />
            {watch("type") === "one" && (
              <RadioOptions
                defaultValue={"add options"}
                errors={errors}
                name="options"
                register={register}
                control={control}
                setOptions={setOptions}
                options={options}
              />
            )}
            {watch("type") === "multiple" && (
              <CheckboxOptions
                defaultValue={"add options"}
                errors={errors}
                name="options"
                register={register}
                control={control}
                setOptions={setOptions}
                options={options}
              />
            )}
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Answer Details:"
              errors={errors}
              name="answerDetails"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Reference Details::"
              errors={errors}
              name="referenceDetails"
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
    </div>
  );
};

export default AddQuestions;
