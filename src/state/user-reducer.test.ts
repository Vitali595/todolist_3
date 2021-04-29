import {changeNameAC, incrementAgeAC, incrementChildrenCountAC, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const action = incrementAgeAC()

    const endState = userReducer(startState, action)

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const action = incrementChildrenCountAC()

    const endState = userReducer(startState, action)

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
});

test('user reducer should change name of user', () => {
    const startState = { name: 'Dimych', age: 20, childrenCount: 2 };
    const newName = 'Viktor';
    const action = changeNameAC(newName)
    const endState = userReducer(startState, action)

    expect(endState.name).toBe(newName);
});
