export const dailogAnimation = {
    hidden: {
        opacity: 0, 
        // y : '-100vh'
    },
    visible: {
        opacity: 1,
        // y: '0',
        transition: { delay: 0.1, duration: 0.3 }
    },
    exit: {
        // y : '100vh', 
        opacity : 0 ,
        transition: { delay: 0.1, duration: 0.3 }
    }
};