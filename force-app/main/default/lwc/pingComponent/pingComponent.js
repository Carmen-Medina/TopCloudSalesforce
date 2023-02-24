import fetchRecordId from '@salesforce/apex/getIdFromRecord.fetchRecordId';
import { LightningElement, api } from 'lwc';

export default class PingComponent extends LightningElement {
    @api recordId;
    @api experience = false;
    @api nameComponent = " ";
    objectID;
    records = [];
    days;

    saveMultipleRecords(records) {
        const temp = [];
        for(let i = 0; i < records.length; i++){
            const id = records[i].Id;
            const name = records[i].Name;
            temp.push({ label: name, value: id });
        };
        this.records = temp;
    }

    get isTag() {
        return this.nameComponent === 'Tag';
    }

    get isTrack() {
        return this.nameComponent === 'Track';
    }

    get isPing() {
        return this.nameComponent === 'Ping';
    }

    get pastDueMessage() {
        return this.nameComponent + ' Past Due. Please Close or Convert this '+this.nameComponent+' on priority';
    }

    numberOfDays(date) {
        let fecha1 = new Date(date);
        let fecha2 = new Date();
        let resta = fecha2.getTime() - fecha1.getTime();
        this.days = Math.floor(resta/(1000*60*60*24));
    }

    get isPastDueMessageVisible() {
        if(this.isPing) {
            return this.days >= 2;
        }
        return this.days >= 14;
    }

    get buttonIsVisible(){
        return this.isTag || !this.objectID;
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
                    if(this.isPing){
                        this.numberOfDays(response[0].Ping_Reminder_Date__c);
                    }
                    if(this.isTrack){
                        this.numberOfDays(response[0].Track_Reminder_Date__c);
                    }
                    this.objectID = response[0].Id;
                };
            })
            .catch((error) => {
                this.error = error;
            });
    }
}