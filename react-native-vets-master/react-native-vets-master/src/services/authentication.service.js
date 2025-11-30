// Simulación de una base de datos en memoria
const usersDB = {};

export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usersDB[email] && usersDB[email].password === password) {
        resolve({
          uid: usersDB[email].uid,
          email: email,
        });
      } else {
        reject("Wrong email and/or password");
      }
    }, 1000);
  });
};

export const createUserRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usersDB[email]) {
        reject("Email already registered");
      } else {
        const newUser = {
          uid: Object.keys(usersDB).length + 1,
          email: email,
          password: password, // ⚠️ No recomendado en producción (usar hash)
        };
        usersDB[email] = newUser;
        resolve(newUser);
      }
    }, 1000);
  });
};
