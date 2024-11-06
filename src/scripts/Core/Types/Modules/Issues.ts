import {SingleTodo} from "@/scripts/Core/Types/Modules/Todo";

type SingleIssue = {
    id: number,
    name: string,
    information: string,
    hasRelatedTodo: boolean,
    isForDashboard: boolean,
    todo: SingleTodo,
    contacts: Array<SingleContact>
    progress: Array<SingleProgress>
}

type SingleContact = {
    id: number,
    description: string,
    date: string,
}

type SingleProgress = {
    id: number,
    description: string,
    date: string,
}

export {SingleIssue, SingleContact, SingleProgress}