import * as Actions from "../actions";
import _ from "lodash";
import store from "app/store";

const userReducer = function (state = null, action) {
    switch (action.type) {
        case Actions.GET_USER_DATA: {
            return { ...action.payload };
        }
        case Actions.UPDATE_USER_DATA: {
            return { ...action.payload };
        }
        case Actions.GET_CHAT: {
            return getUpdatedUser(state, action);
        }
        case Actions.SEND_MESSAGE: {
            console.log(state, "state", action, "action");

            return getUpdatedUser(state, action);
        }
        default:
            return state;
    }
};

function getUpdatedUser(state, action) {
    let newUserData = _.merge({}, state);

    let userChatData = newUserData.chatList.find((_chat) => {
        return _chat.contactId === action.userChatData.contactId;
    });
    if (userChatData) {
        newUserData.chatList = newUserData.chatList.map((_chat) =>
            _chat.contactId === action.userChatData.contactId
                ? action.userChatData
                : _chat
        );
    } else {
        newUserData.chatList = [action.userChatData, ...newUserData.chatList];
    }
    return newUserData;
}

export default userReducer;
