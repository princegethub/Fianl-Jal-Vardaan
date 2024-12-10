import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addGp, updateGp } from "../phedSlice";

const PHED_API = import.meta.env.VITE_PHED_API;

export const phedApi = createApi({
  reducerPath: "phedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PHED_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["GpList", "FundRequests", "Alerts"], // Define tags for cache management
  endpoints: (builder) => ({
    // Add GP Mutation
    gpAdd: builder.mutation({
      query: (inputData) => ({
        url: "/gp-add",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["GpList"], // Invalidate GP list cache
    }),

    // Update GP Mutation
    gpUpdate: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/gp-update/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["GpList"], // Refresh GP list after update
    }),

    // Fetch GP List Query
    gpListFetch: builder.query({
      query: () => ({
        url: "/gplist",
        method: "GET",
      }),
      providesTags: ["GpList"],
    }),

    // Delete GP Mutation
    gpDelete: builder.mutation({
      query: (id) => ({
        url: `gp-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GpList"], // Refresh GP list after delete
    }),

    // View Single GP Details Query
    viewSingleGpDetails: builder.query({
      query: (id) => ({
        url: `gp-details/${id}`,
        method: "GET",
      }),
    }),

    // View Announcement List Query
    viewAnnouncementList: builder.query({
      query: () => ({
        url: "/announcement",
        method: "GET",
      }),
    }),

    // Create PHED Announcement Mutation
    createPhedAnnouncement: builder.mutation({
      query: (announcementData) => ({
        url: "/announcement-create",
        method: "POST",
        body: announcementData,
      }),
    }),

    // Create Asset Mutation
    createAsset: builder.mutation({
      query: (inputData) => ({
        url: "/asset",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["GpList"], // Invalidate cache if asset is related to GP
    }),

    // Create Inventory Mutation
    createInventory: builder.mutation({
      query: (inputData) => ({
        url: "/inventory",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["GpList"],
    }),

    // View Single GP Asset Query
    viewSingleGpAsset: builder.query({
      query: (id) => ({
        url: `/asset/${id}`,
        method: "GET",
      }),
    }),

    // View Single GP Inventory Query
    viewSingleGpInventory: builder.query({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
    }),

    // View Single GP Inventory Query
    financeOverView: builder.query({
      query: (id) => ({
        url: `/finance-overview/${id}`,
        method: "GET",
      }),
    }),

    // Fetch Alerts Query
    alreatPhed: builder.query({
      query: () => ({
        url: `/alerts`,
        method: "GET",
      }),
      providesTags: ["Alerts"],
    }),

    // Update Alert Status Mutation
    StatusCompletealreatPhed: builder.mutation({
      query: (id) => ({
        url: `/alert/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Alerts"],
    }),

    // Fetch Fund Requests Query
    fundRequestedPhed: builder.query({
      query: () => ({
        url: `/fund/requests`,
        method: "GET",
      }),
      providesTags: ["FundRequests"],
    }),

    // Update Fund Request Status Mutation
    StatusCompleteFundRqstPhed: builder.mutation({
      query: (id) => ({
        url: `/fund/requests/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FundRequests"],
    }),

    // Asset Overview Query
    assestOverviewPHeD: builder.query({
      query: () => ({
        url: `/assets/overview`,
        method: "GET",
      }),
    }),

    // Inventory Overview Query
    invenotoryOverviewPHeD: builder.query({
      query: () => ({
        url: `/inventory-overview`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useGpAddMutation,
  useGpUpdateMutation,
  useGpListFetchQuery,
  useViewSingleGpDetailsQuery,
  useGpDeleteMutation,
  useCreatePhedAnnouncementMutation,
  useViewAnnouncementListQuery,
  useCreateAssetMutation,
  useCreateInventoryMutation,
  useViewSingleGpAssetQuery,
  useViewSingleGpInventoryQuery,
  useAlreatPhedQuery,
  useStatusCompletealreatPhedMutation,
  useFundRequestedPhedQuery,
  useStatusCompleteFundRqstPhedMutation,
  useAssestOverviewPHeDQuery,
  useInvenotoryOverviewPHeDQuery,
  useFinanceOverViewQuery,
} = phedApi;
