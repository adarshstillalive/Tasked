const userSockets: { [email: string]: string } = {};

export const addUserSocket = (email: string, socketId: string) => {
  userSockets[email] = socketId;
};

export const removeUserSocket = (socketId: string) => {
  const user = Object.keys(userSockets).find(
    (key) => userSockets[key] === socketId
  );
  if (user) {
    delete userSockets[user];
  }
};

export const getUserSocket = (email: string): string | undefined =>
  userSockets[email];
