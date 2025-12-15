import React from "react";
import UserInfo from "../components/UserInfo";
import UserOrders from "../components/UserOrders";

const Profile = () => {
  return (
    <div className="d-flex flex-wrap mx-auto">
      <UserInfo />
      <UserOrders />
    </div>
  )
}

export default Profile