import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../api";
import Header from "../../components/dashboard/Header";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../hooks/useToast";
import { Addmember } from "../../validations/addmember";

const AddMember = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const allcountry = [
    {
      id: "pakistan",
      key: "pakistan",
      name: "pakistan",
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
  } = useForm({ resolver: yupResolver(Addmember) });

  // const [allcountry, setAllCountry] = useState([]);

  // const getData = async () => {
  //   try {
  //     const response = await API.getAllCountry();
  //     setAllCountry(response?.data?.data);
  //   } catch (error) {
  //     errorToast(error, "Cannot fetch Country");
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.createuser(data);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add user");
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
        currentpage={"Add Members"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="First Name"
              type="text"
              isInvalid={isInvalid}
              isRequired={false}
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
              errortext="password Is Required"
              errors={errors}
              name="password"
              register={register}
            />
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="Hear From"
              type="text"
              isInvalid={isInvalid}
              isRequired={false}
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
              placeholder="country Name"
              errortext="country Name Is Required"
              errors={errors}
              name="country"
              register={register}
            />
            {/* <InputField
              label="Status"
              type="select"
              options={[true, false]}
              isInvalid={isInvalid}
              placeholder="Status"
              isRequired={true}
              errortext="Status Is Required"
              errors={errors}
              name="isBlock"
              register={register}
            /> */}
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

export default AddMember;
