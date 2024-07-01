import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { API } from "../../api";
import { errorToast, successToast } from "../../hooks/useToast";
import InputField from "./InputField";
import { useForm } from "react-hook-form";

const EditSizeModal = ({ btntitle, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allSize, setAllSize] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, errors } = useForm();

  const getData = async () => {
    try {
      const response = await API.getAllSize();
      setAllSize(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (formData) => {
    console.log(formData);
    setLoading(true);
    try {
        const response = await API.updateSize(formData.id, { packet: parseInt(formData.packet, 10) });
      successToast(response?.data?.message);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update size data");
    }
  };

  return (
    <div className="EditSizeModal">
      <Tooltip
        showArrow={true}
        color="success"
        placement="left-start"
        content="Click to preview"
        className="text-white"
      >
        <Button
          onPress={onOpen}
          color="none"
          size="xs"
          className="bg-themeBtn-0 py-4 px-2 rounded-lg min-w-[170px] flex items-center justify-center text-center text-white font-medium capitalize gap-1"
        >
          {btntitle}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            {allSize.map((item) => (
              <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id: item.id }))} key={item.id}>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-2">
                    <InputField
                      label="Packet Size"
                      type="number"
                      isRequired={true}
                      defaultValue={item.packet}
                      placeholder="Packet Size"
                      errortext="Packet Size Is Required"
                      errors={errors}
                      name="packet"
                      register={register}
                    />
                    
                  </div>
                  <Button
                    type="submit"
                    className="bg-themePrimary-0 text-white shadow-lg shadow-indigo-500/20"
                  >
                    Update
                  </Button>
                </div>
              </form>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditSizeModal;
