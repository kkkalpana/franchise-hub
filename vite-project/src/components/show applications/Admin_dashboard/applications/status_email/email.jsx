import emailjs from "@emailjs/browser";

const sendCustomEmail = (details) => {
  emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
  emailjs
    .send(import.meta.env.VITE_EMAIL_SERVICE_ID, template_id, {
      to_email: details.to_email,
      to_name: details.to_name,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export { sendCustomEmail };
