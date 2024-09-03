import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const server = import.meta.env.VITE_SERVER;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
  tagTypes: ["Profile", "Courses", "Lectures", "Users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    logout: builder.query({
      query: () => ({
        url: "/logout",
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: "/me",
        credentials: "include",
      }),
      providesTags: ["Profile"],
    }),

    register: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        credentials: "include",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/updateprofile",
        method: "PUT",
        credentials: "include",
        body: {
          name: data.name,
          email: data.email,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/updateprofilepicture",
        method: "PUT",
        credentials: "include",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/changepassword",
        method: "PUT",
        credentials: "include",
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgetpassword",
        credentials: "include",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetpassword/${data.params.token}`,
        credentials: "include",
        method: "PUT",
        body: {
          password: data.password,
        },
      }),
    }),

    getAllCourses: builder.query({
      query: ({ category, keyword }) => ({
        url: `/courses?keyword=${keyword}&category=${category}`,
      }),
      providesTags: ["Courses"],
    }),

    addToPlaylist: builder.mutation({
      query: (id) => ({
        url: `/addtoplaylist`,
        method: "POST",
        credentials: "include",
        params: { id },
      }),
      invalidatesTags: ["Profile"],
    }),

    removeFromPlaylist: builder.mutation({
      query: (id) => ({
        url: `/removefromplaylist`,
        method: "DELETE",
        credentials: "include",
        params: { id },
      }),
      invalidatesTags: ["Profile"],
    }),

    buySubscription: builder.query({
      query: () => ({
        url: `/subscribe`,
        credentials: "include",
      }),
    }),

    getRazorpayKey: builder.query({
      query: () => ({
        url: `/razorpaykey`,
        credentials: "include",
      }),
    }),

    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/subscribe/cancel",
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),

    getCourseLectures: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        credentials: "include",
      }),
      providesTags: ["Lectures"],
    }),

    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/createcourse",
        credentials: "include",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    addLecture: builder.mutation({
      query: (data) => ({
        url: `/course/${data.courseId}`,
        credentials: "include",
        method: "Post",
        body: data.myForm,
      }),
      invalidatesTags: ["Lectures"],
    }),

    deleteLecture: builder.mutation({
      query: (data) => ({
        url: `/lecture?courseId=${data.courseId}&lectureId=${data.lectureId}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Lectures"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),

    updateUserRole: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/${userId}`,
        credentials: "include",
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUsers: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/${userId}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    getDashboardStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        credentials: "include",
      }),
    }),

    contact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    courseRequest: builder.mutation({
      query: (data) => ({
        url: "/courserequest",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default api;

export const {
  useLoginMutation,
  useGetMyProfileQuery,
  useLazyLogoutQuery,
  useRegisterMutation,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllCoursesQuery,
  useAddToPlaylistMutation,
  useRemoveFromPlaylistMutation,
  useLazyBuySubscriptionQuery,
  useGetRazorpayKeyQuery,
  useCancelSubscriptionMutation,
  useGetCourseLecturesQuery,
  useLazyGetCourseLecturesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useAddLectureMutation,
  useDeleteLectureMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUsersMutation,
  useGetDashboardStatsQuery,
  useContactMutation,
  useCourseRequestMutation,
} = api;
