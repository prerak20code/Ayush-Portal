import { Header, Footer } from '..';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Layout() {
    const location = useLocation();

    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    return (
        <div className="h-full w-full">
            <div className="fixed top-0 z-10 w-full">
                <Header />
            </div>

            <div className="mt-[110px] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="min-h-[calc(100vh-110px)]"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                <Footer />
            </div>
        </div>
    );
}
