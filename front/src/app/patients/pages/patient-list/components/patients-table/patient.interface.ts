

export interface IPatient {
    id: string,
    fullName: string,
    address: string,
    contact: string,
    emergencyContact: string | null,
    dob: string,
    gender: string,
    diagnostic: string,
    checkInDate: string,
    checkOutDate: string
}


