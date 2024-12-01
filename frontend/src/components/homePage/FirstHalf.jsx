import { Statistics } from '..';
import { HOMEBG } from '../../assets/images';
import { useVariantContext } from '../../contexts';
import { motion } from 'framer-motion';

export default function FirstHalf() {
    // variants
    const { textVariants } = useVariantContext();

    // HTML
    return (
        <div className="h-[calc(100vh-110px)] w-full relative">
            {/* Background Image */}
            <div
                className="h-[calc(100vh-110px)] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${HOMEBG})`,
                    opacity: 0.84,
                }}
            />

            {/* Overlay Content */}
            <div className="h-full w-full absolute z-1 top-0">
                <div className="h-[calc(100vh-190px)] md:h-[calc(100vh-210px)] ">
                    // CONTENT
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
