export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const UPDATE_GROUP_FROM = "UPDATE_GROUP_FROM"; 
export const UPDATE_GROUP_TO = "UPDATE_GROUP_TO";

export const addGroup = () => {
  return {
    type: ADD_GROUP,
  };
};

export const removeGroup = (index) => {
  return {
    type: DELETE_GROUP,
    payload: index,
  };
};

export const updateGroupFrom = (index, from) => {
  return {
    type: UPDATE_GROUP_FROM,
    payload: { index, from },
  };
};

export const updateGroupTo = (index, to) => {
  return {
    type: UPDATE_GROUP_TO,
    payload: { index, to },
  };
};
