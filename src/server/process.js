if (typeof __process_env__ !== "undefined") {
    Object.assign(global.process.env, __process_env__);
}
module.exports = global.process;
