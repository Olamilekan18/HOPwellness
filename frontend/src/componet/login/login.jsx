import { motion } from "framer-motion";
import PropTypes from "prop-types";

const image =
  "https://www.bartonassociates.com/wp-content/uploads/2021/04/Blog-Twitter-Facebook-1080x1080-44.jpg";
export default function LoginForm({ children }) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 flex justify-center flex-1">
        <motion.div
          className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>

        <div className="flex-1 text-center hidden lg:flex">
          <motion.div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  children: PropTypes.node.isRequired,
};
