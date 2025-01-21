import { TAcademicSemester } from "../../../types/academicSemesterManagement.type";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import baseApi from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response?.data,
                    meta: response.meta,
                };
            },
        }),
        addAcademicSemesters: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data,
            }),
        }),
        getAcademicDepartments: builder.query({
            query: () => {
                return {
                    url: '/academic-department',
                    method: 'GET'
                };
            },
            transformResponse: (response) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-department/create-academic-department',
                method: 'POST',
                body: data,
            }),
        }),

    }),
})

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemestersMutation,
    useAddAcademicDepartmentMutation,
    useGetAcademicDepartmentsQuery } = academicManagementApi;