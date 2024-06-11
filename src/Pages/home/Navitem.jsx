import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { NavLink } from "react-router-dom";
const items = [
  {
    key: "1",

    label: "Turkish",
    children: [
      {
        key: "1-1",
        label: <NavLink to={"./kids/turkish/boys"}>Boys</NavLink>,
      },
      {
        key: "1-2",
        label: <NavLink to={"./kids/turkish/girls"}>Sets</NavLink>,
      },
      {
        key: "1-3",
        label: <NavLink to={"./kids/turkish/infant"}>Mala</NavLink>,
      },
    ],
  },
  {
    key: "2",
    label: "Traditional",
    children: [
      {
        key: "2-1",
        label: <NavLink to={"./kids/traditional/boys"}>boys</NavLink>,
      },
      {
        key: "2-2",
        label: <NavLink to={"./kids/traditional/girls"}>girls</NavLink>,
      },
      {
        key: "2-3",
        label: <NavLink to={"./kids/traditional/infant"}>infant</NavLink>,
      },
    ],
  },
];
const App = () => (
  <Dropdown
  className="lg:block flex justify-center"
  overlay={
    <div style={{ width:200 }}>
      <Menu items={items} />
    </div>
  }
>
    <a onClick={(e) => e.preventDefault()}>
      <Space
        className="uppercase lg:w-40 font-bold lg:text-2xl   cursor-pointer
        "
      >
        KIDS <DownOutlined className="sm:text-xsm" />
      </Space>
    </a>
  </Dropdown>
);
export default App;
