import { Image } from "@nextui-org/react";
import React from "react";
import { allusericon, revenueicon } from "../../assets";
import { LiaIdCard } from "react-icons/lia";
import { PiUsers } from "react-icons/pi";

const Overview = ({ dashboardData }) => {
  return (
    <div className="Overview mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <div className="broder rounded-lg border group  border-[#F5F5F5] hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Orders
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.totalUsers}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <Image
              src={allusericon}
              alt={allusericon}
              width={38}
              height={38}
              className="rounded-none float-right"
            />
          </div>
        </div>
        <div className="broder rounded-lg border group  border-[#F5F5F5] hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Make Your Mix
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.subscribed}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <LiaIdCard className="text-5xl text-[#8F8F8F]" />
          </div>
        </div>
        <div className="broder rounded-lg border group  border-[#F5F5F5] hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
             Members
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              {dashboardData?.unSubscribed}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <PiUsers className="text-5xl text-[#8F8F8F]" />
          </div>
        </div>
        <div className="broder rounded-lg border group  border-[#F5F5F5] hover:bg-themeBtn-0 hover:border-themeBtn-0 duration-100  flex justify-between pt-4 pb-10 px-5">
          <div className="w-3/4">
            <p className="capitalize group-hover:text-white text-[#8F8F8F] text-sm mb-4">
              Revenue
            </p>
            <p className=" text-black group-hover:text-white text-lg font-bold">
              ${" "}
              {dashboardData?.revenue?._sum?.totalPrice
                ? parseInt(dashboardData?.revenue?._sum?.totalPrice)
                : 0}
            </p>
          </div>
          <div className="w-3/12 flex justify-end">
            <Image
              src={revenueicon}
              alt={revenueicon}
              width={38}
              height={38}
              className="rounded-none float-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
