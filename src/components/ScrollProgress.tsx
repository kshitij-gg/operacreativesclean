import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    // Hooks into the global window scroll progress
    const { scrollYProgress } = useScroll();
    
    // Applies heavy physics damping so the bar doesn't instantly jump, but moves fluidly like liquid
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 right-0 w-[1px] h-full z-[1000] pointer-events-none bg-white/10">
            <motion.div
                className="w-full bg-accent origin-top shadow-[0_0_10px_#eb5a31,0_0_20px_#eb5a31]"
                style={{ scaleY, height: '100%' }}
            />
        </div>
    );
};

export default ScrollProgress;
