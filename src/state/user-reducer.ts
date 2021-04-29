type StateType = {
    age: number
    childrenCount: number
    name: string
}

type incrementAgeAT = {
    type: "INCREMENT-AGE"
}

type incrementChildrenCountAT = {
    type: "INCREMENT-CHILDREN-COUNT"
}

type changeNameAT = {
    type: "CHANGE-NAME"
    newName: string
}

type ActionType = incrementAgeAT | incrementChildrenCountAT | changeNameAT

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case "CHANGE-NAME":
            return {...state, name: action.newName}
        default:
            throw new Error("I don't understand this type")
    }
}

export const incrementAgeAC = (): incrementAgeAT => {
    return {type: "INCREMENT-AGE" as const}
}
export const incrementChildrenCountAC = (): incrementChildrenCountAT => {
    return {type: "INCREMENT-CHILDREN-COUNT" as const}
}
export const changeNameAC = (newName: string): changeNameAT => {
    return {type: "CHANGE-NAME" as const, newName: newName}
}