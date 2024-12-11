import { Statistics } from '..';
import { useVariantContext } from '../../contexts';
import { motion } from 'framer-motion';
import { landingPageGif } from '../../assets/images';

export default function FirstHalf() {
    const { textVariants } = useVariantContext();

    return (
        <div className="h-[calc(100vh-110px)] w-full relative">
            {/* Background Image */}
            <div
                className="h-[calc(100vh-110px)] bg-cover bg-center bg-no-repeat"
                style={{
                    // backgroundImage: `url(${RajBhavan})`,
                    opacity: 0.84,
                }}
            />

            {/* Overlay Content */}
            <div className="h-full w-full absolute z-1 top-0">
                <div className="h-[calc(100vh-190px)] md:h-[calc(100vh-210px)] flex flex-col md:flex-row justify-between items-center pl-5 md:pl-10 space-y-10 md:space-y-0">
                    {/* Heading Section */}
                    <div className="flex flex-col justify-center items-start md:w-1/2 w-full md:mb-0 mb-10">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text bg-gradient-to-r text-orange-400 typing-effect text-center md:text-left md:-mt-">
                            <span className="block typing-line">
                                AYUSH STARTUP
                            </span>
                            <span className="block typing-line delay-4s">
                                REGISTRATION PORTAL
                            </span>
                        </h1>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <img
                            className="w-full max-w-screen-lg h-auto object-contain"
                            src={landingPageGif}
                            alt="Example GIF"
                        />
                    </div>
                </div>

                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Statistics />
                </motion.div>
            </div>
        </div>
    );
}
