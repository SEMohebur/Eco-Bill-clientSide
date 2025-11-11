import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About | Eco Bill";
  }, []);

  return <div>About</div>;
};

export default About;
