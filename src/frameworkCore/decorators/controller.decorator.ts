
function ControllerPrefix(apiPrefix: string = '') {
    return function (constructor: Function) {
        constructor.prototype.controllerApiPrefix = apiPrefix;
    }
}


export { ControllerPrefix }