import AYUSHIMAGE1 from '../../assets/images/ayush/ayush-1.png';
import AYUSHIMAGE2 from '../../assets/images/ayush/ayush-2.png';
import AYUSHIMAGE3 from '../../assets/images/ayush/ayush-3.png';
import AYUSHIMAGE4 from '../../assets/images/ayush/ayush-4.png';
import AYUSHIMAGE5 from '../../assets/images/ayush/ayush-5.png';
import { motion } from 'framer-motion';

export default function FourthHalf({ variants }) {
    // variants
    const { iconVariants, textVariants } = variants;

    // logos array
    const logos = [
        AYUSHIMAGE1,
        AYUSHIMAGE2,
        AYUSHIMAGE3,
        AYUSHIMAGE4,
        AYUSHIMAGE5,
    ];

    const logoElements = logos.map((logo, index) => (
        <motion.div
            key={index}
            className="rounded-full overflow-hidden drop-shadow-md p-2 size-[150px]"
            custom={index}
            variants={iconVariants}
        >
            <img
                src={logo}
                alt="ayush and india logos"
                className="object-contain size-full"
            />
        </motion.div>
    ));

    // HTML
    return (
        <div className="px-12 md:px-36 text-justify">
            {/* logo section */}
            <motion.div
                className="flex items-center justify-evenly mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {logoElements}
            </motion.div>

            {/* text section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariants}
            >
                <h2 className="text-3xl font-bold mb-4">
                    The Core Principles of AYUSH: Foundations of Holistic
                    Wellness
                </h2>
                <p className="text-lg leading-8">
                    The AYUSH system, encompassing Ayurveda, Yoga, Naturopathy,
                    Unani, Siddha, and Homeopathy, is built on timeless
                    principles that promote balance, health, and harmony in
                    mind, body, and spirit. Each discipline offers unique
                    perspectives and practices, rooted in ancient wisdom, to
                    address modern health challenges naturally and effectively.
                    Together, these principles form the cornerstone of a
                    holistic approach to wellness, emphasizing prevention,
                    personalized care, and sustainable living.Discover the five
                    foundational principles that guide the AYUSH philosophy and
                    unlock the potential for transformative well-being.
                </p>
            </motion.div>
        </div>
    );
}
