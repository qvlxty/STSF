import { IRoute, HttpMethod } from "frameworkCore/base.controller";

function ControllerApiPrefix(apiPrefix: string = '') {
    return function (constructor: Function) {
        constructor.prototype.controllerApiPrefix = apiPrefix;
        if (!constructor.prototype.routes) {
            constructor.prototype.routes = [];
        }
    }
}

function ApiMethod(
    method: HttpMethod,
    path: string,
    description: string = '',
    inData: Object = {},
    outData: Object = {},
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: method,
            methodName: propertyKey,
            description,
            inData: JSON.stringify(inData),
            outData: JSON.stringify(outData)
        }
        target.routes[propertyKey] = newRoute;
    }
}



export { ControllerApiPrefix, ApiMethod }