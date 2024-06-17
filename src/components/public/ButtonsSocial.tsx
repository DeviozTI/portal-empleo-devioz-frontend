import { FaFacebook, FaLinkedin,  FaYoutube } from "react-icons/fa";

const ButtonSocials = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/DeviozTI", icon: FaFacebook, color: "#1877F2" },
    { href: "https://www.linkedin.com/company/devioz-ti/mycompany/", icon: FaLinkedin, color: "#0077B5" },
    { href: "https://www.youtube.com/@DeviozTI", icon: FaYoutube, color: "#FF0000" },
  ];

  return (
    <div className="fixed left-0 z-50 flex flex-col gap-3 p-3 transform -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110"
          style={{ color: social.color }}
        >
          <social.icon className="text-3xl" />
        </a>
      ))}
    </div>
  );
};

export default ButtonSocials;
