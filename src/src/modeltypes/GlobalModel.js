import {localStorageType } from './TokenModel';

class GlobalVariable {
    constructor() {
      this.tokenStoargeType = localStorageType;
    }
  }
  
export default (new GlobalVariable);