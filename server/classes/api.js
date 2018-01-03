'use strict';

class API {
    
    constructor(mountPath, route) {
        
        this.url = route.path;
        this.methods = this.getRouteMethods(route.stack);
        
        
    }

    getRouteMethods(stack) {
        let methods = [];
        
        Object.keys(stack).forEach(function(el, key) {
            if(stack[key].method !== undefined) {
                methods.push(stack[key].method);
            }
        });
        
        return methods;
    }
}

module.exports = API;