export const isEmailValid = (email) =>
  /\S+@\S+\.\S+/.test(email);

export const isCPFValid = (cpf) =>
  cpf.replace(/\D/g, "").length === 11;
