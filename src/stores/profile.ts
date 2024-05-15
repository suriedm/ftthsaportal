import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';
import { Profile } from '../../app/profile/page';
import { persist, createJSONStorage } from 'zustand/middleware'
type AuthStore = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    userId: number | null;
    profile: Profile | null;
    setUserId: (id: number | null) => void;
    setProfile: (value: Profile | null) => void;


}

export const authStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            accessToken: undefined,
            refreshToken: undefined,
            userId: null,
            profile: null,
            setUserId: (id: number | null) => set(state => ({ ...state, userId: id })),
            setProfile: (value: Profile | null) => set(state => ({ ...state, profile: value }))
        }),
        {
            name: 'profile', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }));


