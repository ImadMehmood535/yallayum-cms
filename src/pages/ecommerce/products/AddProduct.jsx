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
import Editor from "../../../components/general/Editor";
import { Button } from "@nextui-org/react";

const AddProduct = () => {
  const [variationId, setVariationId] = useState(0);
  const [variations, setVariations] = useState([
    {
      id: variationId,
      price: "",
      salePrice: "",
      weight: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
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

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAddVariation = () => {
    setVariationId(variationId + 1);
    setVariations((prevVariations) => [
      ...prevVariations,
      {
        id: variationId + 1,
        price: "",
        salePrice: "",
        weight: "",
      },
    ]);
  };

  const handleRemoveVariation = (id) => {
    const updatedVariations = variations.filter(
      (variation) => variation.id !== id
    );
    setVariations(updatedVariations);
  };

  const handleInputChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
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
            label="Title"
            type="text"
            placeholder="Product Title"
            errors={errors}
            name="name"
            register={register}
          />
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Slug"
              type="text"
              placeholder="slug of product"
              errors={errors}
              name="slug"
              register={register}
            />
            <InputField
              label="Short Description"
              type="text"
              placeholder="Enter short description of product"
              errors={errors}
              name="shortDescription"
              register={register}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Long Description"
              errors={errors}
              name="longDescription"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Ingredients"
              errors={errors}
              name="ingredients"
              register={register}
              setValue={setValue}
            />
          </div>

          {/* Variations */}
          {variations.map((variation, index) => (
            <div
              key={`variation-${variation.id}`}
              className="w-full mt-4 p-4 bg-black/20 flex flex-wrap flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <input
                  type="number"
                  placeholder="Enter sale price of your product"
                  value={variation.salePrice}
                  onChange={(e) =>
                    handleInputChange(index, "salePrice", e.target.value)
                  }
                  className="custom-input-design "
                />
                <input
                  type="number"
                  placeholder="Enter price of your product"
                  value={variation.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                  className="custom-input-design"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <input
                  type="number"
                  placeholder="Enter weight of your product"
                  value={variation.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                  className="custom-input-design"
                />
              </div>
              <Button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRemoveVariation(variation.id)}
              >
                Remove Variation
              </Button>
            </div>
          ))}

          <div className="grid grid-col-1 gap-4 mt-8 mb-4">
            <div className="flex justify-start items-center gap-4">
              <p>Add Variations</p>
              <div
                className="w-8 h-8 cursor-pointer hover:bg-themePrimary-0 transition-all rounded-full bg-themeBtn-0 flex justify-center items-center"
                onClick={handleAddVariation}
              >
                <p className="text-2xl mb-[4px] text-white">+</p>
              </div>
            </div>
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
                onClick={handleCancel}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
