import {AxiosPostDataBag} from "@/scripts/Core/Types/Request/AxiosTypes";

enum HealthFileStateEnum {
    "unconfirmed" = "unconfirmed",
    "confirmed" = "confirmed"
}

type AppointmentFilesSaveData = AxiosPostDataBag & [{
    storageFileIds: Array<number>,
    appointmentId: number
}]

type FileListElementType = Array<{
    isValid: boolean,
    appointmentId: number
    fileId: number
}>

export {HealthFileStateEnum, AppointmentFilesSaveData, FileListElementType}