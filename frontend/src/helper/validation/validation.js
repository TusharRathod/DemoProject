export const validateEmail = email => {
  var pattern = new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return pattern.test(String(email).toLowerCase());
};

export const validatePass = pass => {
  var pattern = new RegExp(/^[a-zA-Z0-9]{6,16}$/);
  return pattern.test(String(pass).toLowerCase());
};
