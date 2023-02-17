import { LightningElement, api } from 'lwc';

export default class PingComponent extends LightningElement {
    @api experience = false;
    @api nameComponent = " ";

    get objectName() {
        return `${this.nameComponent}__c`;
    }

    get objectID() {
        return `a02Dn000003Lp0KIAS`;
    }
}