const sendFieldError = (fieldName, res) => {
  res.status(400).json(
    {
      status: 400,
      message: `Field ${fieldName} cannot be empty! and All fields should use Encoded-form`
    }
  );
}

export { sendFieldError };
