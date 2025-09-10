import React, { useState, useRef, useEffect } from 'react';

interface AnimateProps {
    children: React.ReactNode;
    animation: string;
    duration?: string; // e.g., '1s', '800ms'
    delay?: string;    // e.g., '0.5s', '1s'
    iteration?: string; // e.g., '1', 'infinite'
}

const Animate: React.FC<AnimateProps> = ({ children, animation, duration, delay, iteration }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect after the animation is triggered once
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const style: React.CSSProperties = {
        animationDuration: duration,
        animationDelay: delay,
        animationIterationCount: iteration,
        // Set visibility to hidden until it should animate, prevents flash of unstyled content
        visibility: isVisible ? 'visible' : 'hidden',
    };

    const classes = isVisible
        ? `animate__animated animate__${animation}`
        : '';

    return (
        <div ref={ref} className={classes} style={style}>
            {children}
        </div>
    );
};

export default Animate;