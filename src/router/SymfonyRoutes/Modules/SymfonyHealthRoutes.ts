import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the health module
 */
export default class SymfonyHealthRoutes extends SymfonyRoutes
{
    public static readonly HEALTH_DOCTOR_BASE_URL = "/module/health/doctor";
    public static readonly HEALTH_DOCTOR_APPOINTMENT_BASE_URL = "/module/health/doctor-appointment";
    public static readonly HEALTH_ILLNESS_BASE_URL = "/module/health/illness";

    /**
     * @description Special route for saving files for appointment
     */
    public static readonly HEALTH_DOCTOR_APPOINTMENT_SAVE_FILES_URL = "/module/health/doctor-appointment/save-files";
}