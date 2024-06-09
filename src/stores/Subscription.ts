import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Profile, WifiData } from '../../app/profile/page';
import { persist, createJSONStorage } from 'zustand/middleware'
import { plans } from '../utils/interfaces';
export interface Root {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  wifi_ssid: string
  wifi_password: string
}
export interface SubscriptionsResponse {
  success: boolean
  message: string
  data: Subscription[]
}

export interface Subscription {
  subscriptionId: any;
  subscription_initialisation_type: string
  preferred_payment_method: string
  billing_auto_renew: boolean
  application_type: string
  device_reference: string
  portal_product_id: number
  portal_end_customer_id: number
  id: number
  date_billing_next: string
  subscription_reference: string
  account_status: string
  subscription_status: string
  date_created: string
  date_updated: string
subscription_account_reference:string
wifi_password:string
wifi_ssid:string

}

export interface PortalProduct {
  product_type: string
  name: string
  description: string
  recurring_price_excl: number
  recurring_price_incl: number
  recurring_description: string
  speed_down_mbps: number
  speed_up_mbps: number
  currency: string
  onceoff_price_excl: number
  onceoff_price_incl: number
  onceoff_description: string
  renewal_type: string
  duration_days: number
  id: number
  available: boolean
}


type SubscriptionStore = {
  productId:number|null,
  plan:plans|null,
  wifi_ssid:string|null,
  wifi_password:string|null,
  subscriptionId:null,
  deviceReference: string | null;
  setPlan: (id: plans|null) => void;
  setProductId: (id: number|null) => void;
  setDeviceReference: (Id: string) => void;
  subscriptions: Subscription[];
  setWifiDetails: (value: WifiData) => void;
  setSubscription: (value: Subscription[]) => void;


}

export const subscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      plan: null,
      productId: null,
      deviceReference: null,
      wifi_ssid:null,
      wifi_password:null,
      subscriptionId:null,
      setId: (Id: string) => set(state => ({ ...state, subscriptionsid: Id })),
      setPlan: (id: plans|null) => set(state => ({ ...state, plan: id })),
      setProductId: (id: number|null) => set(state => ({ ...state, productId: id })),
      setDeviceReference: (Id: string) => set(state => ({ ...state, deviceReference: Id })),
      setSubscription: (value) => set(state => ({ ...state, subscriptions: value })),
      setWifiDetails: (value) => set(state => ({ ...state, wifi_ssid: value.wifi_ssid??null, wifi_password: value.wifi_password??null})),
    }), {
    name: 'subscription',
    storage: createJSONStorage(() => localStorage),
  }
  ));