import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp as fasArrowUp } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("");
      setMessage("🎉 Subscribed successfully!");
      setEmail("");
    }, 1500);
  };

  return (
    <footer className="pt-8 pb-2 dark:bg-gray-900 rounded-lg shadow-lg mt-8">
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-8 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-t-lg">
        {/* Top Section */}
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="self-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500 dark:from-yellow-400 dark:to-orange-500">
              RojgarSetu
            </span>
          </a>
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 space-x-6">
              <Link to="/"><li><a className="hover:text-orange-600 hover:underline transition-all duration-300">Home</a></li></Link>
              <Link to="/jobs"><li><a className="hover:text-orange-600 hover:underline transition-all duration-300">Jobs</a></li></Link>
              <Link to="/browsing"><li><a className="hover:text-orange-600 hover:underline transition-all duration-300">Browsing</a></li></Link>
            </ul>
          </nav>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-6" />

        {/* Social Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <motion.div whileHover={{ scale: 1.1 }} className="group flex justify-center items-center bg-white rounded-full shadow-md p-5 hover:bg-[#1877f2] transition-all duration-300">
            <a href="https://facebook.com" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="text-3xl text-white" />
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="group flex justify-center items-center bg-white rounded-full shadow-md p-5 hover:bg-gradient-to-r from-cyan-500 to-teal-600 transition-all duration-300">
            <a href="https://twitter.com" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="text-3xl text-white" />
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="group flex justify-center items-center bg-white rounded-full shadow-md p-5 hover:bg-[#0077b5] transition-all duration-300">
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="text-3xl text-white" />
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="group flex justify-center items-center bg-white rounded-full shadow-md p-5 hover:bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300">
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="text-3xl text-white" />
            </a>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-6 text-center">
          <motion.h3 whileHover={{ scale: 1.1 }} className="text-3xl font-bold text-orange-600 dark:text-orange-400 cursor-pointer transition-all duration-300">
            ✉️ Stay <span className="text-orange-500">Updated</span>
          </motion.h3>
          <p className="text-md text-gray-600 mt-2 mb-4">
            📬 Subscribe to our <span className="text-orange-600 font-medium">newsletter</span> for the latest job listings and updates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="📨 Your email address"
              className="px-6 py-3 text-base text-gray-700 bg-white/90 shadow-md border border-orange-300 focus:ring-2 focus:ring-orange-500 rounded-full sm:rounded-l-full sm:rounded-r-none w-full sm:w-72 transition duration-200"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-full sm:rounded-l-none sm:rounded-r-full hover:from-orange-600 hover:to-yellow-600 transition duration-300 shadow-md disabled:opacity-50"
            >
              🚀 {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </div>
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        {/* Contact Us & Helpful Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200">📞 Contact Us</h4>
            <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="mailto:support@rojgarsetu.com" className="hover:text-orange-600">support@rojgarsetu.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-orange-600">+(91)6388904102</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200">🔗 Helpful Links</h4>
            <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/terms" className="hover:text-orange-600">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-600">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-orange-600">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Back to Top */}
        <a href="#top" className="fixed bottom-4 right-4 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300" aria-label="Back to top">
          <FontAwesomeIcon icon={fasArrowUp} />
        </a>
      </div>

      {/* Footer Bottom (no background color) */}
      <div className="text-center mt-6">
        <span className="block text-sm text-gray-500 dark:text-gray-400">
          © 2025 <a href="#" className="hover:text-orange-600 hover:underline">_Shashank</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
