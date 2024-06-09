import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';
import { Profile } from '../../app/profile/page';
import { persist, createJSONStorage } from 'zustand/middleware'
type AuthStore = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    userId: number | null;
    wifi_ssid: number | null;
    profile: Profile | null;
    setUserId: (id: number | null) => void;
    setwifi_ssid:(id:number | null ) => void;
    setProfile: (value: Profile | null) => void;


}

export const authStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            accessToken: undefined,
            refreshToken: undefined,
            userId: null,
            profile: null,
            wifi_ssid:null,
            setwifi_ssid: (id: number | null) => set(state => ({ ...state, wifi_ssid: id })),
            setUserId: (id: number | null) => set(state => ({ ...state, userId: id })),
            setProfile: (value: Profile | null) => set(state => ({ ...state, profile: value }))
        }),
        {
            name: 'profile', 
            storage: createJSONStorage(() => localStorage), 
        }));


