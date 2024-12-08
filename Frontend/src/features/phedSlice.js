import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  gplist: [],
  activeGp: [],
  inactive: [],
};

export const phedSlice = createSlice({
  name: "phed",
  initialState,
  reducers: {
    addGp(state, action) {
      // Add GP to gplist and activeGp
      state.gplist.push(action.payload);
      state.activeGp.push(action.payload);
    },
    removeGp(state, action) {
      const { id } = action.payload;

      // Remove GP from gplist
      state.gplist = state.gplist.filter((item) => item.id !== id);

      // Remove GP from activeGp and push to inactive list
      const removedGp = state.activeGp.find((item) => item.id === id);
      if (removedGp) {
        state.activeGp = state.activeGp.filter((item) => item.id !== id);
        state.inactive.push(removedGp);
      }
    },
    setGpList(state, action) {
      state.gplist = action.payload;

      // Update activeGp based on new gplist
      state.activeGp = action.payload.filter((gp) => 
        !state.inactive.some((inactiveGp) => inactiveGp.id === gp.id)
      );
    },
    updateGp(state, action) {
      const { id, updates } = action.payload;

      // Find and update the GP in gplist
      const gpIndex = state.gplist.findIndex((gp) => gp.id === id);
      if (gpIndex !== -1) {
        state.gplist[gpIndex] = { ...state.gplist[gpIndex], ...updates };
      }

      // Update in activeGp if it exists
      const activeGpIndex = state.activeGp.findIndex((gp) => gp.id === id);
      if (activeGpIndex !== -1) {
        state.activeGp[activeGpIndex] = { ...state.activeGp[activeGpIndex], ...updates };
      }

      // Note: Do not update the inactive list, as inactive GPs are not actively managed.
    },
  },
});

// Exporting actions and reducer
export const { addGp, removeGp, setGpList, updateGp } = phedSlice.actions;
export default phedSlice.reducer;
