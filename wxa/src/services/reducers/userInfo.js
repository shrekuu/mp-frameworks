export default function(state={
    name: 'Genuifx',
    email: 'genuifx@gmail.com',
}, action) {
    switch (action.type) {
        case 'userInfo_update': {
            state = {
                ...state,
                ...action.payload,
            };
            return state;
        }
        default: {
            return state;
        }
    }
}
