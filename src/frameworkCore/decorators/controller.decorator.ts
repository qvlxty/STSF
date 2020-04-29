import { IRoute, HttpMethod } from "frameworkCore/base.controller";

function ControllerApiPrefix(apiPrefix: string = '') {
    return function (constructor: Function) {
        constructor.prototype.controllerApiPrefix = apiPrefix;
        if (!constructor.prototype.routes) {
            constructor.prototype.routes = [];
        }
    }
}

function ApiMethodDescription({
    description = '',
    inData = {},
    outData = {}
}: {
    description?: string,
    inData?: Object,
    outData?: Object,
}) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        target.routes[propertyKey] = {
            ...target.routes[propertyKey],
            description,
            inData: JSON.stringify(inData),
            outData: JSON.stringify(outData)
        }
    };
}

function GET(
    path: string,
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: HttpMethod.GET,
            methodName: propertyKey,
        }
        target.routes[propertyKey] = {
            ...target.routes[propertyKey],...newRoute
        };
    }
}

function POST(
    path: string,
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: HttpMethod.POST,
            methodName: propertyKey,
        }
        target.routes[propertyKey] = newRoute;
    }
}

function PATCH(
    path: string,
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: HttpMethod.PATCH,
            methodName: propertyKey,
        }
        target.routes[propertyKey] = newRoute;
    }
}

function DELETE(
    path: string,
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: HttpMethod.DELETE,
            methodName: propertyKey,
        }
        target.routes[propertyKey] = newRoute;
    }
}

function UPDATE(
    path: string,
) {
    return (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
        if (!target.routes) {
            target.routes = [];
        }
        const newRoute: IRoute = {
            path,
            method: HttpMethod.DELETE,
            methodName: propertyKey,
        }
        target.routes[propertyKey] = newRoute;
    }
}



export { ControllerApiPrefix, ApiMethodDescription, GET, POST, PATCH, DELETE, UPDATE }