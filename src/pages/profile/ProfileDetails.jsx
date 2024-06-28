import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/dashboard/Header";
import { Input } from "@nextui-org/react";

const ProfileDetails = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="page-area mt-10 h-full">
      <Header pagetitle={"My Details"} previous={"profile"} />

      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Profile Details</h5>
            <div className="flex flex-col gap-5  ">
              <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
                <Input
                  isReadOnly
                  type="text"
                  label="First Name"
                  defaultValue={user?.firstName}
                />
                <Input
                  isReadOnly
                  type="text"
                  label="Last Name"
                  defaultValue={user?.lastName}
                />
              </div>
              <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
                
                <Input
                  isReadOnly
                  type="email"
                  label="Email"
                  defaultValue={user?.email}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
