import { Card } from '..';
import CARDICON1 from '../../assets/images/card-1.png';
import CARDICON2 from '../../assets/images/card-2.png';
import CARDICON3 from '../../assets/images/card-3.png';
import { motion } from 'framer-motion';

export default function ThirdHalf({ variants }) {
    // variants
    const { iconVariants, textVariants } = variants;

    // cards
    const cards = [
        {
            icon: CARDICON1,
            heading: 'Funding & Support',
            description:
                'Unlock a range of funding and investment options, to fuel the development and scaling of your AYUSH innovations.',
            className: 'bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]',
        },
        {
            icon: CARDICON2,
            heading: 'Supportive Network',
            description:
                'join a thriving community of entrepreneurs, fostering valuable partnerships to accelerate your startup’s success.',
            className: 'bg-gradient-to-r from-[#ffa8a8] to-[#a1a9f3]',
        },
        {
            icon: CARDICON3,
            heading: 'Incubation Centers',
            description:
                'Access expert guidance and resources to nurture your AYUSH startup at every stage.',
            className: 'bg-gradient-to-r from-[#fff8b7] to-[#ffa25e]',
        },
    ];
    const cardElements = cards.map((card, index) => (
        <motion.div key={index} custom={index} variants={iconVariants}>
            <Card card={card} />
        </motion.div>
    ));

    // HTML
    return (
        <div className="px-12 md:px-24">
            {/* text section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariants}
            >
                <h2 className="text-center text-3xl font-bold mb-5">
                    Our Key Features and Highlights
                </h2>

                <p className="px-12 text-lg leading-8 text-center mb-14">
                    Explore the unique features and resources designed to
                    support, fund, and grow your AYUSH startup, empowering you
                    to transform innovative ideas into impactful solutions.
                </p>
            </motion.div>

            {/* cards */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="px-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-6"
            >
                {cardElements}
            </motion.div>
        </div>
    );
}
