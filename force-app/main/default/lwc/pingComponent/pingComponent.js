import fetchRecordId from '@salesforce/apex/getIdFromRecord.fetchRecordId';
import { LightningElement, api } from 'lwc';

export default class PingComponent extends LightningElement {
    @api recordId;
    @api experience = false;
    @api nameComponent = " ";
    objectID;

    get objectName() {
        return `${this.nameComponent}__c`;
    }

    connectedCallback() {
        fetchRecordId({ contactId: this.recordId, nameComponent: this.nameComponent })
            .then((response) => {
                this.objectID = response
            })
            .catch((error) => {
                this.error = error;
            });
    }
}