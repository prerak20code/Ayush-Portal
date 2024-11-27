import { Statistics } from '..';
import HOMEBG from '../../assets/images/HomeBG.png';
import { motion } from 'framer-motion';

export default function FirstHalf() {
    // variants
    const riseVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };
    
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
                <div className="h-[calc(100vh-210px)] ">// CONTENT</div>
                <motion.div
                    variants={riseVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Statistics />
                </motion.div>
            </div>
        </div>
    );
}
