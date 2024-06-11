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
        label: <NavLink to={"./women/turkish/eastern"}>Eastren</NavLink>,
      },
      {
        key: "1-2",
        label: <NavLink to={"./women/turkish/western"}>Westren</NavLink>,
      },
    ],
  },
  {
    key: "2",
    label: "Traditional",
    children: [
      {
        key: "2-1",
        label: <NavLink to={"./women/traditional/eastern"}>Eastren</NavLink>,
      },
      {
        key: "2-2",
        label: <NavLink to={"./women/traditional/western"}>Westren</NavLink>,
      },
    ],
  },
];
const Women = () => (
  <Dropdown
    className="w-screen lg:w-40 lg:ml-10 lg:block flex justify-center"
    overlay={
      <div style={{ width: 200 }}>
        <Menu items={items} />
      </div>
    }
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space className=" lg:text-2xl font-bold">
        WOMEN <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default Women;
