export interface BOOKING_MODEL {
    clientNote: string;
    businessNote: string;
    isPaid: boolean | null;
    startingTime: string;
    bookingDate: string;
    clientId: number | null;
    serviceId: number | null;
    packageId: number | null;
}