import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from "../../../redux/features/admin/courseManagement";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateRegisterSemester] = useUpdateRegisterSemesterMutation();

  const { data: RegisteredSemesters, isFetching } =
    useGetAllRegisterSemesterQuery(undefined);

  const tableData: TSemester[] =
    RegisteredSemesters?.data?.map(
      ({ _id, academicSemester, status, startDate, endDate }: TSemester) => ({
        key: _id,
        name: `${academicSemester?.name}-${academicSemester?.year}`,
        status,
        startDate: moment(new Date(startDate)).format("MMMM"),
        endDate: moment(new Date(endDate)).format("MMMM"),
      })
    ) ?? [];

  const handleStatusUpdate = (data: any) => {
    console.log("semester", semesterId);
    console.log("new status", data.key);

    const updateData = {
      id: semesterId,
      data: { status: data.key },
    };
    updateRegisterSemester(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TSemester> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps}>
            <Button onClick={() => setSemesterId(item?.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default RegisteredSemesters;
