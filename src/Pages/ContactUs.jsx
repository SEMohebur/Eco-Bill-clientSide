import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact | Eco Bill";
  }, []);
  return <div>contact us</div>;
};

export default ContactUs;
