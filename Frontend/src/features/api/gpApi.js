import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addGp } from "../phedSlice";

// Define your API endpoint

const GP_API = import.meta.env.VITE_GP_API;

export const gpApi = createApi({
  reducerPath: "gpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GP_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("Token is missing. Authentication may fail.");
      }
      return headers;
    },
  }),
  tagTypes: [
    "Consumer",
    "Complaint",
    "Announcement",
    "FundRequest",
    "Notification",
    "Asset",
    "Inventory",
  ],
  endpoints: (builder) => ({
    // Add Consumer Mutation
    addConsumer: builder.mutation({
      query: (consumerData) => ({
        url: "/user/add",
        method: "POST",
        body: consumerData,
      }),
      invalidatesTags: ["Consumer"], // Invalidates the cache for consumer-related data
    }),
    deleteConsumer: builder.mutation({
      query: ({ userId }) => ({
        url: `/user/delete/${userId}`, // URL with the userId in the URL path
        method: "DELETE", // Use DELETE method for deletion
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Consumer", id: userId },
        "Consumer", // Invalidate the entire 'Consumer' tag to refresh all related data
      ],
      async onQueryStarted({ userId }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled; // Wait for the query to succeed
          console.log("Consumer deleted successfully:", data);
          // Optionally dispatch an action to update the local state if necessary
        } catch (error) {
          console.error("Error deleting consumer:", error);
        }
      },
    }),

    updateConsumer: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        url: `/user/edit/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Consumer", id: userId },
      ],
    }),

    getActiveConsumer: builder.query({
      query: () => ({
        url: "/users/active",
        method: "GET",
      }),
      providesTags: ["Consumer"], // Provides data tags for cache invalidation
    }),

    getInActiveConsumer: builder.query({
      query: () => ({
        url: "/users/inactive",
        method: "GET",
      }),
      providesTags: ["Consumer"],
    }),

    getGpComplaintList: builder.query({
      query: () => ({
        url: "/gp-complaint",
        method: "GET",
      }),
      providesTags: ["Complaint"],
    }),

    addGpComplaint: builder.mutation({
      query: (inputData) => ({
        url: "/gp-complaint",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Complaint"], // Refreshes data after a new complaint is added
    }),

    getGpAnnouncmentList: builder.query({
      query: () => ({
        url: "/announcements",
        method: "GET",
      }),
      providesTags: ["Announcement"],
    }),

    addGpAnnoucement: builder.mutation({
      query: (inputData) => ({
        url: "/announcement",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Announcement"], // Refreshes data after a new announcement
    }),

    gpFundRequest: builder.query({
      query: () => ({
        url: "/fund/requests",
        method: "GET",
      }),
      providesTags: ["FundRequest"],
    }),

    createGpFundRequest: builder.mutation({
      query: (inputData) => ({
        url: "/fund/request",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["FundRequest"], // Refresh fund request data after creation
    }),

    getGpAssets: builder.query({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
      providesTags: ["Asset"],
    }),

    getGpInventory: builder.query({
      query: () => ({
        url: "/inventory",
        method: "GET",
      }),
      providesTags: ["Inventory"],
    }),

    getIncomeExpend: builder.query({
      query: () => ({
        url: "/income-expenditure",
        method: "GET",
      }),
      providesTags: ["Inventory"],
    }),

// In your API service file (e.g., gpApi.js)
submitIncome: builder.mutation({
  query: ({ category, amount, description, document }) => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("description", description);
    if (document) {
      formData.append("document", document);
    }

    return {
      url: `/income`,
      method: "POST",
      body: formData, // Use FormData directly
    };
  },
  invalidatesTags: ["Asset", "Inventory"],
}),

submitExpenditure: builder.mutation({
  query: ({ category, amount, description, document }) => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("description", description);
    if (document) {
      formData.append("document", document);
    }

    return {
      url: `/expenditure`,
      method: "POST",
      body: formData, // Use FormData directly
    };

  },
  invalidatesTags: ["Asset", "Inventory"],
}),

    

    getNotificationPhed: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useAddConsumerMutation,
  useGetActiveConsumerQuery,
  useGetInActiveConsumerQuery,
  useAddGpComplaintMutation,
  useGetGpComplaintListQuery,
  useGetGpAnnouncmentListQuery,
  useAddGpAnnoucementMutation,
  useGpFundRequestQuery,
  useCreateGpFundRequestMutation,
  useGetNotificationPhedQuery,
  useUpdateConsumerMutation,
  useDeleteConsumerMutation,
  useGetGpAssetsQuery,
  useGetGpInventoryQuery,
  useSubmitIncomeMutation,
  useSubmitExpenditureMutation,
  useGetIncomeExpendQuery
} = gpApi;
