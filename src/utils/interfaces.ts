export interface IFibrePlan {
    productId: number;
    size: string;
    amount: string;
    activation: activationFee;
    link: string;
    list: string[];
}

export interface IRowItem {
    link: string
    image: string
    title: string
}
export interface PostObject {
    confirmPassword: string;
    message: string;
    role: string;
    first_name: string;
    last_name: string;
    identification_reference: string;
    identification_type: string;
    passportNumber: string;
    complex_building: string;
    unit_number: string;
    street_address: string;
    province: string;
    postal_code: string;
    postal_address: string;
    email: string;
    landLine: string;
    mobile_number: string;
    alternate_contact_number: string;
    password: string;
    city: string;
    application_type: string;
    preferred_payment_method: string;
    // ricaOne: File | null;
    //  ricaTwo: File | null;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    data: Data;
}

export interface Data {
    id: number;
}
export interface RegistrationErrorResponse {
    detail: string;
}

export type plans = "10" | "20" | "30" | "50" | "100";
export type activationFee = "999" | "399";
export type authorizationType = "bearer";

export interface Authorization {
    access_token : string,
    portal_end_customer_id : number
    success : boolean,
    token_type :authorizationType
}