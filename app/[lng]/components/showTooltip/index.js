import { useState, useRef, useEffect } from 'react';

export default function ShowTooltip({ desc = '-', children, className }) {
    const [visible, setVisible] = useState(false);
    const [display, setDisplay] = useState('none');
    const timerRef = useRef(null);

    const delayTwoFrames = (callback) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(callback);
        });
    };

    const handleMouseEnter = () => {
        clearTimeout(timerRef.current);
        setDisplay('block');
        delayTwoFrames(() => {
            setVisible(true);
        });
    };

    const handleMouseLeave = () => {
        setVisible(false);
        timerRef.current = setTimeout(() => {
            setDisplay('none');
        }, 200);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div
                className={`absolute -top-[60%] left-1/2 -translate-x-1/2 
                   flex items-center justify-center bg-[#505050] rounded-[4px] 
                   py-1 px-[10px]--- text-[14px] text-white whitespace-nowrap
                   transition-all duration-200 ease-out min-w-[52px] text-center ${className}
                   ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}

                style={{ display }}
            >
                {desc}
            </div>
        </div>
    );
}