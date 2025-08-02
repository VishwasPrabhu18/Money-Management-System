export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

export const validateRegistration = ({ formData, setError }) => {
  if (!formData.fullName.trim()) {
    return setError("Please enter your full name.");
  } else if (!formData.email.trim()) {
    return setError("Please enter your email.");
  } else if (!formData.password.trim()) {
    return setError("Please enter your password.");
  } else if (!validateEmail(formData.email)) {
    return setError("Please enter a valid email address.");
  } else if (!validatePassword(formData.password)) {
    return setError("Password must be at least 8 characters long and include uppercase, lowercase letters, and numbers.");
  }

  setError(null);
  return true;
}

export const validateLogin = ({ formData, setError }) => {
  if (!formData.email.trim()) {
    return setError("Please enter your email.");
  } else if (!formData.password.trim()) {
    return setError("Please enter your password.");
  } else if (!validateEmail(formData.email)) {
    return setError("Please enter a valid email address.");
  }

  setError(null);
  return true;
}