export function getLoginCookie() {
  const cookies = document.cookie.split('; ');
  const cookieObj = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObj[name] = value;
  });

  return cookieObj['token'];
}

