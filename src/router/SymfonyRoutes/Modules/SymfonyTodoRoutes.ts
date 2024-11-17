import SymfonyRoutes from "@/router/SymfonyRoutes";

/**
 * @description Contains routes related to the todo module
 */
export default class SymfonyTodoRoutes extends SymfonyRoutes
{
    public static readonly TODO_BASE_URL = "/module/my-todo";
    public static readonly TODO_ELEMENT_BASE_URL = "/module/my-todo-element";

    /** @description returns array of modules with relatable entries */
    public static readonly GET_RELATION_ENTRIES = SymfonyTodoRoutes.TODO_BASE_URL + "/relation-entries"
}