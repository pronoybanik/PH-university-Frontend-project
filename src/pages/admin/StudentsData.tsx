import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../redux/features/admin/userManagementApi";
import { TStudent } from "../../types/userManagement.types";
import { TQueryParam } from "../../types/global";

export type TTableData = Pick<TStudent, "id" | "name">;

const StudentsData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: semesterData,
    // isLoading,
    isFetching,
  } = useGetAllStudentsQuery(params);

  console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      contactNo,
      email,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default StudentsData;
