const global_Object = {
    screenHeight: window.innerHeight - window.innerHeight * 0.1,
    screenWidth: window.innerWidth,
};

const global_States = {
    score: 0,
    highScore: 0,
};

export default global_Object;

export { global_States, global_Object };
