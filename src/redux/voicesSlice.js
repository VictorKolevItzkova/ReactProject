import { createSlice } from '@reduxjs/toolkit';

const voicesSlice = createSlice({
  name: 'voices',
  /*Default voice Roger*/
  initialState: {
    selectedVoice: {
      "voice_id": "CwhRBWXzGAHq8TQ4Fs17",
      "name": "Roger"
    },
    audios: [],
  },
  reducers: {
    setSelectedVoice: (state, action) => {
      state.selectedVoice = action.payload;
    },
    addAudio: (state, action) => {
      state.audios.push(action.payload);
    },
  },
});

export const { setSelectedVoice, addAudio } = voicesSlice.actions;

export default voicesSlice.reducer;
