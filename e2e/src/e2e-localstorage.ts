import { browser } from 'protractor';

const LocalStorage = function () {
  this.getItem = (key) => browser.executeScript('return window.localStorage.getItem(\'' + key + '\');');
  this.get = () => browser.executeScript('return window.localStorage;');
  this.clear = () => browser.executeScript('return window.localStorage.clear();');
};

module.exports = { localStore: new LocalStorage() };
