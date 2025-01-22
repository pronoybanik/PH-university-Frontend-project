import { Button, Table, TableColumnsType } from "antd";
import { useGetAllRegisterSemesterQuery } from "../../../redux/features/admin/courseManagement";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";

const RegisteredSemesters = () => {
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
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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
