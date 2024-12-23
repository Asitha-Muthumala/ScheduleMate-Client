export interface USER_MODEL {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    homeAddress: string;
    password: string;
    role: string;
}

export interface LOGIN_MODEL {
    email: string;
    password: string;
}