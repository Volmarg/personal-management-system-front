type SingleTodo  = {
    id: number,
    name: string,
    description: string,
    showOnDashboard: boolean,
    elements: Array<SingleElement>
}

type SingleElement = {
    id: number,
    name: string,
    isDone: boolean
}

export {SingleTodo, SingleElement}