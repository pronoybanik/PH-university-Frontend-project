import { TQueryParam, TResponseRedux } from "../../../types/global";
import baseApi from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllStudents: builder.query({
        //     query: (args) => {
        //         console.log(args);
        //         const params = new URLSearchParams();

        //         if (args) {
        //             args.forEach((item: TQueryParam) => {
        //                 params.append(item.name, item.value as string);
        //             });
        //         }

        //         return {
        //             url: '/students',
        //             method: 'GET',
        //             params: params,
        //         };
        //     },
        //     transformResponse: (response: TResponseRedux<TStudent[]>) => {
        //         return {
        //             data: response?.data,
        //             meta: response.meta,
        //         };
        //     },
        // }),

        getAllRegisterSemester: builder.query({
            query: () => ({
                url: "/semester-registrations",
                method: "GET"
            }),
            providesTags: ["semester"]
        }),
        addRegisterSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["semester"]
        }),
        updateRegisterSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data
            }),
            invalidatesTags: ["semester"]
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/course',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: `/course/create-course`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses'],
        }),
    })
});

export const {
    useAddRegisterSemesterMutation,
    useGetAllRegisterSemesterQuery,
    useUpdateRegisterSemesterMutation,
    useGetAllCoursesQuery,
    useAddCourseMutation,
} = courseManagementApi;
