import {BackendModuleNameEnum} from "@/scripts/Core/Enum/Modules";

export default class UserModuleRights {
    public static readonly CAN_ACCESS_GOALS_MODULE: string = 'CAN_ACCESS_GOALS_MODULE';
    public static readonly CAN_ACCESS_TODO_MODULE: string = 'CAN_ACCESS_TODO_MODULE';
    public static readonly CAN_ACCESS_NOTES_MODULE: string = 'CAN_ACCESS_NOTES_MODULE';
    public static readonly CAN_ACCESS_CONTACTS_MODULE: string = 'CAN_ACCESS_CONTACTS_MODULE';
    public static readonly CAN_ACCESS_PASSWORDS_MODULE: string = 'CAN_ACCESS_PASSWORDS_MODULE';
    public static readonly CAN_ACCESS_ACHIEVEMENTS_MODULE: string = 'CAN_ACCESS_ACHIEVEMENTS_MODULE';
    public static readonly CAN_ACCESS_CALENDAR_MODULE: string = 'CAN_ACCESS_CALENDAR_MODULE';
    public static readonly CAN_ACCESS_ISSUES_MODULE: string = 'CAN_ACCESS_ISSUES_MODULE';
    public static readonly CAN_ACCESS_TRAVELS_MODULE: string = 'CAN_ACCESS_TRAVELS_MODULE';
    public static readonly CAN_ACCESS_PAYMENTS_MODULE: string = 'CAN_ACCESS_PAYMENTS_MODULE';
    public static readonly CAN_ACCESS_SHOPPING_MODULE: string = 'CAN_ACCESS_SHOPPING_MODULE';
    public static readonly CAN_ACCESS_JOB_MODULE: string = 'CAN_ACCESS_JOB_MODULE';
    public static readonly CAN_ACCESS_REPORTS_MODULE: string = 'CAN_ACCESS_REPORTS_MODULE';
    public static readonly CAN_ACCESS_FILES_MODULE: string = 'CAN_ACCESS_FILES_MODULE';
    public static readonly CAN_ACCESS_IMAGES_MODULE: string = 'CAN_ACCESS_IMAGES_MODULE';
    public static readonly CAN_ACCESS_VIDEOS_MODULE: string = 'CAN_ACCESS_VIDEOS_MODULE';
    public static readonly CAN_ACCESS_STORAGE_MODULE: string = 'CAN_ACCESS_STORAGE_MODULE';

    public static readonly MODULE_ACCESS_RIGHTS = {
        [BackendModuleNameEnum.goals]: UserModuleRights.CAN_ACCESS_GOALS_MODULE,
        [BackendModuleNameEnum.todo]: UserModuleRights.CAN_ACCESS_TODO_MODULE,
        [BackendModuleNameEnum.notes]: UserModuleRights.CAN_ACCESS_NOTES_MODULE,
        [BackendModuleNameEnum.contacts]: UserModuleRights.CAN_ACCESS_CONTACTS_MODULE,
        [BackendModuleNameEnum.passwords]: UserModuleRights.CAN_ACCESS_PASSWORDS_MODULE,
        [BackendModuleNameEnum.achievements]: UserModuleRights.CAN_ACCESS_ACHIEVEMENTS_MODULE,
        [BackendModuleNameEnum.calendar]: UserModuleRights.CAN_ACCESS_CALENDAR_MODULE,
        [BackendModuleNameEnum.issues]: UserModuleRights.CAN_ACCESS_ISSUES_MODULE,
        [BackendModuleNameEnum.travels]: UserModuleRights.CAN_ACCESS_TRAVELS_MODULE,
        [BackendModuleNameEnum.payments]: UserModuleRights.CAN_ACCESS_PAYMENTS_MODULE,
        [BackendModuleNameEnum.shopping]: UserModuleRights.CAN_ACCESS_SHOPPING_MODULE,
        [BackendModuleNameEnum.job]: UserModuleRights.CAN_ACCESS_JOB_MODULE,
        [BackendModuleNameEnum.reports]: UserModuleRights.CAN_ACCESS_REPORTS_MODULE,
        [BackendModuleNameEnum.files]: UserModuleRights.CAN_ACCESS_FILES_MODULE,
        [BackendModuleNameEnum.images]: UserModuleRights.CAN_ACCESS_IMAGES_MODULE,
        [BackendModuleNameEnum.videos]: UserModuleRights.CAN_ACCESS_VIDEOS_MODULE,
        [BackendModuleNameEnum.storage]: UserModuleRights.CAN_ACCESS_STORAGE_MODULE,
    };
}