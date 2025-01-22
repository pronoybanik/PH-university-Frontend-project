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
        addRegisterSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            })
        }),
        getAllRegisterSemester: builder.query({
            query: () => ({
                url: "/semester-registrations",
                method: "GET"
            })
        }),
    })
});

export const { useAddRegisterSemesterMutation, useGetAllRegisterSemesterQuery } = courseManagementApi;
