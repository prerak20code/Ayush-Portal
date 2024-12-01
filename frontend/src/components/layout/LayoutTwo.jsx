import { Header, SmallFooter } from '..';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useVariantContext } from '../../contexts';
import { useEffect } from 'react';

export default function LayoutTwo() {
    const location = useLocation();
    const { pageVariants } = useVariantContext();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

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

                <SmallFooter />
            </div>
        </div>
    );
}
