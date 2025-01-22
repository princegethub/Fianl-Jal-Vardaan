import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { useDispatch } from "react-redux";

const AUTH_API = import.meta.env.VITE_AUTH_API;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(userLoggedIn({ user: data.user, token: data.token }));
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
    }),

    fogetPassword: builder.mutation({
      query: (inputData) => ({
        url: "/forgat-paasword",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(userLoggedIn({ user: data.user, token: data.token }));
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
    }),

    resetPassword: builder.mutation({
      query: (inputData) => ({
        url: "/reset-paasword",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(userLoggedIn({ user: data.user, token: data.token }));
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
    }),

    profileUpdate: builder.mutation({
      query: (formData) => ({
        url: '/edit-profile',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [],
    }),

    // New endpoint for creating an order (payment creation)
    createPayment: builder.mutation({
      query: (orderData) => ({
        url: "/create-order",  // Order creation route
        method: "POST",
        body: orderData,  // Order data to be sent in the request
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // Handle order creation success, e.g., store order details or show success message
          console.log("Order created successfully:", data);
        } catch (error) {
          console.error("Order creation error:", error);
          throw error;
        }
      },
    }),

    // New endpoint for handling payment callback after payment
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment-callback",  // Payment callback route
        method: "POST",
        body: paymentData,  // Payment callback data to be sent in the request
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // Handle payment callback success, e.g., update payment status or show success message
          console.log("Payment callback successful:", data);
        } catch (error) {
          console.error("Payment callback error:", error);
          throw error;
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(userLoggedOut());
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation,
  useFogetPasswordMutation, 
  useResetPasswordMutation, 
  useProfileUpdateMutation, 
  useCreatePaymentMutation,
  useVerifyPaymentMutation 
} = authApi;
