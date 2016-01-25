'use strict';

let fullCollection = []; // Storage of all data, regardless of filter.
let collection = []; // The array to be paginated.
let pageNum = 1;
let perPage = 10;
let sortOrder = 'asc';
let sortByProp = '';
let filterBy = '';

function setDefaults({
    page = 1,
    per = 10,
    order = 'asc',
    by = '',
    filter = '' } = {}) {
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
  filterBy = filter;
}

// If el has a property called named the value stored in filterByProp,
// and the type of that property is a string,
// and the value of that property contains the value of filterBy.
// NOTE: This function only works with string properties.
function filteredCollection(arr = [], filter = '') {
  if (filter) {
    return arr.filter((el) => {
      return Object.keys(el).some((prop) => {
        return el[prop] &&
          typeof el[prop] === 'string' &&
          el[prop].toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
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
    filter = '' } = {}) {
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
  filterBy = filter;
  fullCollection = arr;
  collection = filteredCollection(arr, filter);
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
    filter = '' } = {}) {
  // Subtract 1 from the page number to get the starting array index (which
  // start from 0).
  const startIndex = (page - 1) * per;

  collection = filteredCollection(fullCollection, filter);
  collection = sortedCollection(collection, by, order);

  return  slicedCollection(collection, startIndex, per);
}

// Return locations sorted by the current state.
function getCurrentPage() {
  return getPage({
    page: pageNum,
    per: perPage,
    order: sortOrder,
    by: sortByProp,
    filter: filterBy
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

// Reset pageNum to 1 when a new filter is applied, as any existing pageNum
// will no longer be relevant.
function applyFilter(filter) {
  filterBy = filter;
  pageNum = 1;
  collection = filteredCollection(fullCollection, filterVal);

  return collection;
}

// Reset pageNum to 1 when filter is removed, as any existing pageNum
// will no longer be relevant.
function removeFilter() {
  filterBy = '';
  collection = fullCollection;

  return collection;
}

function getFilter() {
  return filterBy;
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
  removeFilter,
  getFilter
}));
