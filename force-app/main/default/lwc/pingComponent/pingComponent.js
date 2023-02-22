import fetchRecordId from '@salesforce/apex/getIdFromRecord.fetchRecordId';
import { LightningElement, api } from 'lwc';

export default class PingComponent extends LightningElement {
    @api recordId;
    @api experience = false;
    @api nameComponent = " ";
    objectID;
    records = [];

    saveMultipleRecords(records) {
        const temp = [];
        for(let i = 0; i < records.length; i++){
            console.log('is running');
            const id = records[i].substring(0, 18);
            const name = records[i].substring(18);
            temp.push({ label: name, value: id });
        };
        this.records = temp;
    }

    get isTag() {
        return this.nameComponent === 'Tag';
    }

    handleChange(event){
        this.objectID = event.detail.value;
    }

    get objectName() {
        return `${this.nameComponent}__c`;
    }

    connectedCallback() {
        fetchRecordId({ contactId: this.recordId, nameComponent: this.nameComponent })
            .then((response) => {
                if(this.isTag){
                    this.saveMultipleRecords(response);
                } else {
                    this.objectID = response[0];
                };
            })
            .catch((error) => {
                this.error = error;
            });
    }
}