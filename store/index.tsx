import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import modalSlice from './slice/modalSlice'

export const store = configureStore({
    reducer: {
        user: authSlice,
        modal: modalSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch