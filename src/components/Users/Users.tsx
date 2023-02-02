import { useEffect, useState } from "react";
import axios from "axios";
import { UserType, ResponseType } from "./types";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState<UserType[] | undefined>();
  const [totalPages, setTotalPages] = useState<number>();
  const [loading, setLoading] = useState<boolean>();
  const [gender, setGender] = useState<"male" | "female" | undefined>();
  const navigate = useNavigate();

  const selectVal = ["male", "female"];

  const getUsers = async (page: number) => {
    setLoading(true);
    const response = await axios.get<ResponseType>(
      `https://gorest.co.in/public/v1/users?page=${page}&per_page=10${
        gender && `&gender=${gender}`
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer 87c0a43356017ab9b97dd86ac407d87309b434519087d5871c511584060e147d",
        },
      }
    );
    setTotalPages(response.data.meta.pagination.total);
    setUsers(response.data.data);
    setLoading(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
    getUsers(1);
  }, [gender]);

  return (
    <div className="users">
      <Select
        onChange={(value) => {
          setGender(value);
        }}
        style={{ width: "150px", marginBottom: "20px" }}
      >
        {selectVal.map((value, idx) => (
          <Select.Option key={idx} value={value}>
            {value}
          </Select.Option>
        ))}
      </Select>
      <Table
        rowClassName="user-row"
        rowKey={(r) => r.id}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/users/edit/${record.id}`);
            },
          };
        }}
        columns={columns}
        dataSource={users}
        loading={loading}
        bordered
        pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            getUsers(page);
          },
        }}
      />
    </div>
  );
};

export default Users;
