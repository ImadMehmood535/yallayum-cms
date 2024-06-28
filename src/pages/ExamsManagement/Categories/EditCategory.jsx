import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExamCategory } from "../../../validations/categories";

const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  let query = useQuery();
  let id = Number(query.get("id"));
  let categoryData = JSON.parse(query.get("object"));
  const [allexams, setAllExams] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    { resolver: yupResolver(ExamCategory) },
    {
      defaultValues: {
        examId: Number(categoryData?.examId),
        name: categoryData?.name,
        isLive: categoryData?.isLive,
      },
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getAllExams();
        setAllExams(response?.data?.data || []);
      } catch (error) {
        errorToast(error, "Can not fetch exam data");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateCategory(id, {
        ...formData,
        examId: formData.examId ? formData?.examId : categoryData?.examId,
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
        pagetitle={"Edit"}
        previous={"Dashboard"}
        currentpage={"Edit Category"}
      />

      {categoryData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
              <InputField
                label="Category Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={categoryData?.name}
                placeholder="Category Name"
                errortext="Category Name Is Required"
                errors={errors}
                name="name"
                register={register}
              />
              <InputField
                label="Exam Name"
                type="select"
                options={allexams}
                isInvalid={isInvalid}
                isRequired={false}
                defaultValue={categoryData?.examId}
                placeholder="Exam Name"
                errortext="This Field is required"
                errors={errors}
                name="examId"
                register={register}
              />
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                isRequired={true}
                defaultValue={categoryData?.isLive}
                placeholder="Status"
                isInvalid={isInvalid}
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
      )}
    </div>
  );
};

export default EditCategory;
