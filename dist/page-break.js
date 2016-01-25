"use strict";function setDefaults(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.page,t=void 0===r?1:r,o=e.per,l=void 0===o?10:o,n=e.order,i=void 0===n?"asc":n,a=e.by,g=void 0===a?"":a,u=e.filter,c=void 0===u?"":u,f=e.filterProp,s=void 0===f?"":f;pageNum=t,perPage=l,sortOrder=i,sortByProp=g,filterVal=c,filterByProp=s}function filteredCollection(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],r=arguments[1],t=arguments[2];return r?e.filter(function(e){return e[t]&&"string"==typeof e[t]&&e[t].indexOf(r)>0}):e}function sortedCollection(e,r,t){return e.sort(function(e,o){var l=e,n=o;return r&&(l=e[r],n=o[r]),l>n?"asc"===t?1:-1:n>l?"asc"===t?-1:1:0})}function slicedCollection(e,r,t){var o=r+t>e.length,l=0===t,n=o||l?e.length:r+t;return n===e.length?e.slice(r):e.slice(r,n)}function paginate(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=r.page,o=void 0===t?1:t,l=r.per,n=void 0===l?10:l,i=r.order,a=void 0===i?"asc":i,g=r.by,u=void 0===g?"":g,c=r.filter,f=void 0===c?"":c;r.fitlerProp;pageNum=o,perPage=n,sortOrder=a,sortByProp=u,filterVal=f,filterByProp=filterProp,fullCollection=e,collection=filteredCollection(fullCollection,filterVal,filterByProp)}function getPage(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.page,t=void 0===r?1:r,o=e.per,l=void 0===o?10:o,n=e.order,i=void 0===n?"asc":n,a=e.by,g=void 0===a?"":a,u=e.filter,c=void 0===u?"":u,f=e.filterProp,s=void 0===f?"":f,p=t*l;return collection=filteredCollection(fullCollection,c,s),collection=sortedCollection(collection,g,i),slicedCollection(collection,p,l)}function getCurrentPage(){return getPage({page:pageNum,per:perPage,order:sortOrder,by:sortByProp,filter:filterVal,filterProp:filterByProp})}function getPageNum(){return pageNum}function getPerPage(){return perPage}function getSortOrder(){return sortOrder}function getSortBy(){return sortByProp}function getPageTotal(){return Math.ceil(collection.length/perPage)}function filterBy(e){return filterByProp=e}function applyFilter(e,r){return filterVal=e,filterByProp=r,pageNum=1,collection=filteredCollection(fullCollection,filterVal,filterByProp)}function removeFilter(){return filterVal="",collection=fullCollection}function sortBy(e){return sortByProp=e}function reverseOrder(){return sortOrder="asc"===sortOrder?"desc":"asc"}function gotoPage(e){return pageNum=e*perPage<collection.length?e*perPage:getPageTotal()}function gotoNextPage(){return pageNum<getPageTotal()&&(pageNum+=1),pageNum}function gotoPrevPage(){return pageNum>0&&(pageNum-=1),pageNum}var _extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};Object.defineProperty(exports,"__esModule",{value:!0});var fullCollection=[],collection=[],filteredCollection=[],pageNum=1,perPage=10,sortOrder="asc",sortByProp="",filterVal="",filterByProp="";exports["default"]=Object.freeze(_extends({},{setDefaults:setDefaults,paginate:paginate,getPage:getPage,getCurrentPage:getCurrentPage,getPageNum:getPageNum,getPerPage:getPerPage,getSortOrder:getSortOrder,getSortBy:getSortBy,getPageTotal:getPageTotal,reverseOrder:reverseOrder,sortBy:sortBy,gotoPage:gotoPage,gotoNextPage:gotoNextPage,gotoPrevPage:gotoPrevPage,applyFilter:applyFilter,removeFilter:removeFilter}));