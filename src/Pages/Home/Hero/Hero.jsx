import "./Hero.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen md:min-h-[650px] shbg">
        <div className="hero-content text-center bg-[#009e7e] dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 h-[100%] w-[100%]">
          <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ delay: 1, duration: 1 }}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 120,
            }}
            className="max-w-lg pt-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Our only priority is to keep you healthy.
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            </p>
            <motion.button
              whileHover={{
                scale: 1.2,
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              className="btn bg-black bg-opacity-100 hover:bg-sh duration-700 text-white rounded-3xl border-none"
            >
              Discover More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
