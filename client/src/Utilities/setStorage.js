import { getUserid } from './ApiServices';

// this function stores the credentials of the user in sessionStorage

async function setStorage(cred) {
  const token = cred.token;
  cred.userid = await getUserid(token);
  sessionStorage.setItem('cred', JSON.stringify(cred));
};

export { setStorage };
