export const initialState = {
  name: "",
  surname: "",
  birthdate: "",
  phone: "",
  website: "",
  about: "",
  techStack: "",
  lastProject: "",
};

export function maskPhone(phoneRef) {
  const cardValue = phoneRef.current.value
    .replace(/\D/g, "")
    .match(/(\d{0,1})(\d{0,4})(\d{0,2})(\d{0,2})/);
  phoneRef.current.value = !cardValue[2]
    ? cardValue[1]
    : `${cardValue[1]}-${cardValue[2]}${`${
        cardValue[3] ? `-${cardValue[3]}` : ""
      }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
  return phoneRef.current.value;
}

export function checkUserName(value, field) {
  const { errors } = this.state;
  if (!/^\p{Lu}/u.test(value) || value == "") {
    errors[field] = `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } must start with capital letter`;
  } else {
    errors[field] = "";
  }
  this.setState({ errors });
}

export function checkBirthdate(value, field) {
  const MIN_LENGTH = 10;
  const { errors } = this.state;
  if (value.length >= MIN_LENGTH) {
    errors[field] = "";
  } else if (value.length < MIN_LENGTH) {
    errors[field] = "Provide full birth date";
  }
  this.setState({ errors });
}

export function checkPhone(value, field) {
  const { errors } = this.state;
  const LENGTH = 12;

  if ((value.length != LENGTH && value.length != 0) || value.length == 0) {
    errors[field] = "Phone number must contain 9 digits";
  } else if (value.length == LENGTH) {
    errors[field] = "";
  }

  this.setState({ errors });
}

export function checkWebsite(value, field) {
  const { errors } = this.state;

  if (!value.startsWith("https://")) {
    errors[field] = "Website address must start with https://";
  } else if (
    // eslint-disable-next-line no-useless-escape
    !/^(https:\/\/www\.||https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?$/g.test(
      value
    )
  ) {
    errors[field] = "Please enter your website address";
  } else {
    errors[field] = "";
  }
  this.setState({ errors });
}

export function checkTextarea(value, field) {
  const LENGTH = 600;
  const { errors } = this.state;
  if (value.length > LENGTH) {
    errors[field] = "Limit exceeded";
    document
      .querySelector(`.counter_${field}`)
      .setAttribute("style", "color: red");
  } else {
    errors[field] = "";
    document
      .querySelector(`.counter_${field}`)
      .removeAttribute("style", "color: red");
  }
  this.setState({ errors });
}
