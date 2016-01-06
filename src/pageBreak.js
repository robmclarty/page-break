'use strict';

let collection = []; // The array to be paginated.
let pageNum = 1;
let perPage = 10;
let sortOrder = 'asc';
let sortByProp = '';

function setDefaults({
    page = 1,
    per = 10,
    order = 'asc',
    by = '' } = {}) {
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
}

// Initialize the module by giving it an array to work with, and some optional
// default values. If managing an array of objects, the `prop` value is the
// name of the object attribute to sort by.
function paginate(arr = [], {
    page = 1,
    per = 10,
    order = 'asc',
    by = '' } = {}) {
  collection = arr;
  pageNum = page;
  perPage = per;
  sortOrder = order;
  sortByProp = by;
}

// Return `locationsToSort`, sorted by `prop` in `order`.
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

// Return a subset of the total locations, sorted and ordered. This might be
// the entire array (if offset and start = 0).
// This method should be used for more granular control. If you just need the
// the array in its current state, use getCurrentLocations() instead.
function getPage({
    page = 1,
    per = 10,
    order = 'asc',
    by = '' } = {}) {
  const start = page * per;
  collection = sortedCollection(collection, by, order);

  return slicedCollection(collection, start, per);
}

// Return locations sorted by the current state.
function getCurrentPage() {
  return getPage({
    page: pageNum,
    per: perPage,
    order: sortOrder,
    by: sortByProp
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
  gotoPrevPage
}));
