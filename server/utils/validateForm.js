const validateForm = (formData) => {
  let message = "";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const { firstName, lastName, email, phone, password } = formData;
  if (!firstName?.trim() || !lastName?.trim())
    message = "Must have first name and last name";
  else if (!emailRegex.test(email)) message = "Invalid email";
  else if (!phoneRegex.test(phone))
    message = "Phone number must be of 10 digits";
  else if (password?.length < 8)
    message = "Password must be at least 8 characters long";
  if (message === "") {
    return { status: "success" };
  } else {
    return { status: "error", message };
  }
};
export default validateForm;