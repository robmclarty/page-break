'use strict';

let fullCollection = []; // Storage of all data, regardless of filter.
let collection = []; // The array to be paginated.
let filteredCollection = [];
let pageNum = 1;
let perPage = 10;
let sortOrder = 'asc';
let sortByProp = '';
let filterVal = '';
let filterByProp = '';

function setDefaults({
    page = 1,
    per = 10,
    order = 'asc',
    by = '',
    filter = '',
    filterProp = '' } = {}) {
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
  filterVal = filter;
  filterByProp = filterProp;
}

// If el has a property called named the value stored in filterByProp,
// and the type of that property is a string,
// and the value of that property contains the value of filterBy.
// NOTE: This function only works with string properties.
function filteredCollection(arr = [], filter, filterProp) {
  if (filter) {
    return arr.filter((el) => {
      return el[filterProp] &&
          typeof el[filterProp] === 'string' &&
          el[filterProp].indexOf(filter) > 0;
    });
  }

  return arr;
}

// Return `arr`, sorted by `prop` in `order`.
// `order` should be either "asc" or "desc".
function sortedCollection(arr, prop, order) {
  return arr.sort((compA, compB) => {
    let a = compA;
    let b = compB;

    // If a prop is provided to sort by, assume each element is an object with
    // a property called `prop`.
    if (prop) {
      a = compA[prop];
      b = compB[prop];
    }

    if (a > b) {
      return order === 'asc' ? 1 : -1;
    }

    if (a < b) {
      return order === 'asc' ? -1 : 1;
    }

    return 0;
  });
}

// Return a slice of all `arr` starting at `start` up to `offset`
// (or the length of locations; whichever comes first).
function slicedCollection(arr, start, per) {
  const perIsTooBig = start + per > arr.length;
  const noPer = per === 0;
  const end = perIsTooBig || noPer ?
    arr.length :
    start + per;

  return end === arr.length ?
    arr.slice(start) :
    arr.slice(start, end);
}

// Initialize the module by giving it an array to work with, and some optional
// default values. If managing an array of objects, the `by` value is the
// name of the object attribute to sort by.
function paginate(arr = [], {
    page = 1,
    per = 10,
    order = 'asc',
    by = '',
    filter = '',
    fitlerProp = '' } = {}) {
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
  filterVal = filter;
  filterByProp = filterProp;
  fullCollection = arr;
  collection = filteredCollection(fullCollection, filterVal, filterByProp);
}

// Return a subset of the total locations, sorted and ordered. This might be
// the entire array (if offset and start = 0).
// This method should be used for more granular control. If you just need the
// the array in its current state, use getCurrentLocations() instead.
function getPage({
    page = 1,
    per = 10,
    order = 'asc',
    by = '',
    filter = '',
    filterProp = '' } = {}) {
  const start = page * per;

  collection = filteredCollection(fullCollection, filter, filterProp);
  collection = sortedCollection(collection, by, order);

  return slicedCollection(collection, start, per);
}

// Return locations sorted by the current state.
function getCurrentPage() {
  return getPage({
    page: pageNum,
    per: perPage,
    order: sortOrder,
    by: sortByProp,
    filter: filterVal,
    filterProp: filterByProp
  });
}

function getPageNum() {
  return pageNum;
}

function getPerPage() {
  return perPage;
}

function getSortOrder() {
  return sortOrder;
}

function getSortBy() {
  return sortByProp;
}

function getPageTotal() {
  return Math.ceil(collection.length / perPage);
}

function filterBy(prop) {
  filterByProp = prop;

  return filterByProp;
}

// Reset pageNum to 1 when a new filter is applied, as any existing pageNum
// will no longer be relevant.
function applyFilter(filter, prop) {
  filterVal = filter;
  filterByProp = prop;
  pageNum = 1;
  collection = filteredCollection(fullCollection, filterVal, filterByProp);

  return collection;
}

// Reset pageNum to 1 when filter is removed, as any existing pageNum
// will no longer be relevant.
function removeFilter() {
  filterVal = '';
  collection = fullCollection;

  return collection;
}

function sortBy(prop) {
  sortByProp = prop;

  return sortByProp;
}

function reverseOrder() {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

  return sortOrder;
}

function gotoPage(page) {
  pageNum = page * perPage < collection.length ?
    page * perPage :
    getPageTotal();

  return pageNum;
}

function gotoNextPage() {
  if (pageNum < getPageTotal()) {
    pageNum += 1;
  }

  return pageNum;
}

function gotoPrevPage() {
  if (pageNum > 0) {
    pageNum -= 1;
  }

  return pageNum;
}

export default Object.freeze(Object.assign({}, {
  setDefaults,
  paginate,
  getPage,
  getCurrentPage,
  getPageNum,
  getPerPage,
  getSortOrder,
  getSortBy,
  getPageTotal,
  reverseOrder,
  sortBy,
  gotoPage,
  gotoNextPage,
  gotoPrevPage,
  applyFilter,
  removeFilter
}));
