'use strict';

const api = require('server/classes/api');

module.exports.getAllRoutes = function(mountPath, routes) {
  
  let allRoutes = [];

  Object.keys(routes).forEach(function(el, key) {
    
    let route = routes[key];

    console.log("route", route);
    
    if(route.route !== undefined) {
      allRoutes.push(new api(mountPath, route.route));
    }
  });

  //sort api routes by url
  allRoutes.sort(function(a,b){
    let x = a.url;
    let y = b.url;

    if(x < y) return -1;
    else if(x > y) return 1;
    else return 0;
  });
  
  //return all sorted routes
  return allRoutes;
};