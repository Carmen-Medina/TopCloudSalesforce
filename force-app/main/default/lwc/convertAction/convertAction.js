import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import STATUS_FIELD from '@salesforce/schema/Recruitment_Flow__c.Status__c';
import TRACK_OBJECT from '@salesforce/schema/Track__c';
import TAG_OBJECT from '@salesforce/schema/Tag__c';

export default class ConvertAction extends NavigationMixin(LightningElement) {
    @api recorId;
    @api objectApiName;
    @wire(getRecord,{recordId: 'a00Dn000006nLiUIAU',fields:[STATUS_FIELD]})
    recruitmentFlow;

    @api invoke(){
        this[NavigationMixin.Navigate](this.newNavMixForm);
    }

    get newNavMixForm(){
        return {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiNameMethod,
                actionName: 'new'
            }
        };
    }

    get status(){
        console.log(STATUS_FIELD.fieldApiName);
        console.log(this.recruitmentFlow.data);
        return getFieldValue(this.recruitmentFlow.data,STATUS_FIELD);
    }

    get objectApiNameMethod(){
        console.log(this.status);
        switch(true){
            case this.status.includes('Declined'):
                this.objectApiName = TRACK_OBJECT.objectApiName;
                break;
            case this.status.includes('Rejected'):
                this.objectApiName = TAG_OBJECT.objectApiName;
                break;
        }
        return this.objectApiName;
    }
}