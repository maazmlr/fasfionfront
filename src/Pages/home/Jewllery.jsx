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
        label: <NavLink to={"./jewellery/turkish/rings"}>Rings</NavLink>,
      },
      {
        key: "1-2",
        label: <NavLink to={'./jewellery/turkish/sets'}>Sets</NavLink>,
      },
      {
        key: "1-3",
        label: <NavLink to={"./jewellery/turkish/mala"}>Mala</NavLink>,
      },
      {
        key: "1-4",
        label: <NavLink to={"./jewellery/turkish/bracelet"}>Bracelet</NavLink>,
      },
    ],
  },
  {
    key: "2",
    label: "Traditional",
    children: [
      {
        key: "2-1",
        label: <NavLink to={"./jewellery/traditional/rings"}>Rings</NavLink>,
      },
      {
        key: "2-2",
        label: <NavLink to={'./jewellery/traditional/sets'}>Sets</NavLink>,
      },
      {
        key: "2-3",
        label: <NavLink to={"./jewellery/traditional/mala"}>Mala</NavLink>,
      },
      {
        key: "2-4",
        label: <NavLink to={"./jewellery/traditional/bracelet"}>Bracelet</NavLink>,
      },
    ],
  },
];
const App = () => (
  <Dropdown
  className="w-screen lg:w-20  flex justify-center"
  overlay={
    <div style={{ width: 200 }}>
      <Menu items={items} />
    </div>
  }
>
    <a onClick={(e) => e.preventDefault()}>
      <Space className=" text-black font-bold lg:text-2xl my-2 mr-8 ">
        JEWELERRY <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default App;
