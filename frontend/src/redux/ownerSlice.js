import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        myShopData: null,
    },
    reducers: {
        setMyShopData: (state, action) => {
            state.myShopData = action.payload;
        },  
    }
});

export const { setMyShopData } = userSlice.actions;
export default userSlice.reducer;