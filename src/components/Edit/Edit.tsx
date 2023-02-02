import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Space, Input, Button, Select } from "antd";
import { ResponseType } from "./types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorModal from "../ErrorModal/ErrorModal";

const Edit = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const routeParams = useParams();
  const navigate = useNavigate();

  const genderSelectVal = ["male", "female"];
  const statusSelectVal = ["active", "inactive"];

  const fetchUser = async () => {
    setLoading(true);
    const response = await axios.get<ResponseType>(
      `https://gorest.co.in/public/v1/users/${routeParams.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer 87c0a43356017ab9b97dd86ac407d87309b434519087d5871c511584060e147d",
        },
      }
    );

    setName(response.data.data.name);
    setEmail(response.data.data.email);
    setGender(response.data.data.gender);
    setStatus(response.data.data.status);
    setLoading(false);
  };

  const sendRequest = async () => {
    const response = await axios
      .patch(
        `https://gorest.co.in/public/v1/users/${routeParams.id}`,
        {
          name,
          email,
          gender,
          status,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer 87c0a43356017ab9b97dd86ac407d87309b434519087d5871c511584060e147d",
          },
        }
      )
      .catch((error: any) => {
        const errorMessage = error.response.data.data[0];
        toast.error(`${errorMessage.field} ${errorMessage.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });

    if (response?.status === 200) {
      toast.success("successfully changed the data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Space style={{ padding: "20px" }} direction="vertical">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              size="large"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              size="large"
            />
            <Select
              onChange={(value) => {
                setGender(value);
              }}
              style={{ width: "210px" }}
              size="large"
              value={gender}
            >
              {genderSelectVal.map((value, idx) => (
                <Select.Option key={idx} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
            <Select
              onChange={(value) => {
                setStatus(value);
              }}
              style={{ width: "210px" }}
              size="large"
              value={status}
            >
              {statusSelectVal.map((value, idx) => (
                <Select.Option key={idx} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
            <Button size="large" onClick={sendRequest} type="primary">
              Send
            </Button>
          </>
        )}
      </Space>
      <ErrorModal />
    </>
  );
};

export default Edit;
