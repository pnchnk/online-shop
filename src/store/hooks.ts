import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useAuth() {
    const {email, token, id} = useAppSelector(state => state.user);

    return {
        isAuth : !!email,
        email,
        token,
        id,
    };
};
