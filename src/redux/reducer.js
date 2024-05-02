import { ADD_GROUP, DELETE_GROUP, UPDATE_GROUP_FROM, UPDATE_GROUP_TO } from "./action";

const initialState = {
  groups: [{ id: 1, from: 1, to: 10 }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            id: state.groups.length + 1,
            from: 0,
            to: 0,
          },
        ],
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group, index) => index !== action.payload),
      };
    case UPDATE_GROUP_FROM:
      return {
        ...state,
        groups: state.groups.map((group, index) => {
          if (index === action.payload.index) {
            return {
              ...group,
              from: action.payload.from,
            };
          }
          return group;
        }),
      };
    case UPDATE_GROUP_TO:
      return {
        ...state,
        groups: state.groups.map((group, index) => {
          if (index === action.payload.index) {
            return {
              ...group,
              to: action.payload.to,
            };
          }
          return group;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
