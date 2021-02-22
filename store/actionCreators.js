
export const ADD_USER = (val) => {
  return {
    type:"ADD_TOKEN",
    id: val.id,
    token: val.token,
  };
};
