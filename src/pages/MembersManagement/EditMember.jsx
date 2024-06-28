import React, { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Editmember } from "../../validations/addmember";
import { API } from "../../api";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../../hooks/useToast";
import { useQuery } from "../../hooks/queryParam";
import Loader from "../../components/general/Loader";

const EditMember = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(true);
  const navigate = useNavigate();
  let query = useQuery();
  let id = Number(query.get("id"));

  const allcountry = [
    {
      id: "Unitesd States",
      key: "Unitesd States",
      name: "Unitesd States",
    },
    {
      id: "UAE",
      key: "UAE",
      name: "UAE",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Editmember) });

  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getSingleUsers(id);
      setData(response?.data?.data);
      setPageData(false);
    } catch (error) {
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await API.updateUser({
        ...formData,
        id: id,
        isBlocked: formData?.isBlocked ? false : true,
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
        pagetitle={"Members"}
        previous={"Dashboard"}
        currentpage={"Edit Members"}
      />
      {data ? (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="First Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={false}
                defaultValue={data?.firstName}
                placeholder="First Name"
                errortext="First Is Required"
                errors={errors}
                name="firstName"
                register={register}
              />
              <InputField
                label="Last Name"
                type="text"
                isInvalid={isInvalid}
                isRequired={false}
                defaultValue={data?.lastName}
                placeholder="Last Name"
                errortext="Last Is Required"
                errors={errors}
                name="lastName"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="Email"
                type="email"
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={data?.email}
                placeholder="Email Address"
                errors={errors}
                errortext="Email Is Required"
                name="email"
                register={register}
              />
              <InputField
                label="password"
                type="text"
                isInvalid={isInvalid}
                isRequired={true}
                placeholder="password"
                defaultValue={data?.password}
                errortext="password Is Required"
                errors={errors}
                name="password"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-3 gap-4  ">
              <InputField
                label="Hear From"
                type="text"
                isInvalid={isInvalid}
                isRequired={false}
                defaultValue={data?.hearFrom}
                placeholder="Hear From"
                errortext="hearFrom Is Required"
                errors={errors}
                name="hearFrom"
                register={register}
              />
              <InputField
                label="country Name"
                type="select"
                options={allcountry}
                isInvalid={isInvalid}
                isRequired={true}
                defaultValue={data?.country}
                placeholder="country Name"
                errortext="country Name Is Required"
                errors={errors}
                name="country"
                register={register}
              />
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                isInvalid={isInvalid}
                placeholder="Status"
                isRequired={true}
                defaultValue={data?.isBlocked ? false : true}
                errortext="Status Is Required"
                errors={errors}
                name="isBlocked"
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
      ) : (<Loader/>)}
    </div>
  );
};

export default EditMember;
