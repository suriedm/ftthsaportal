import { createStore } from 'zustand/vanilla';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Profile } from '@/pages/profile';
import { persist, createJSONStorage } from 'zustand/middleware'
export interface SubscriptionsResponse {
  success: boolean
  message: string
  data: Subscription[]
}

export interface Subscription {
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
  portal_product: PortalProduct
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
  subscriptionId:null,
  deviceReference: string | null;
  setDeviceReference: (Id: string) => void;
  subscriptions: Subscription[];
  setSubscription: (value: Subscription[]) => void;


}

export const subscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      deviceReference: null,
      subscriptionId:null,
      setId: (Id: string) => set(state => ({ ...state, subscriptionsid: Id })),
      setDeviceReference: (Id: string) => set(state => ({ ...state, deviceReference: Id })),
      setSubscription: (value) => set(state => ({ ...state, subscriptions: value })),
    }), {
    name: 'subscription',
    storage: createJSONStorage(() => localStorage),
  }
  ));