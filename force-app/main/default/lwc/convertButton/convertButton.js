import { api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import TRACK_OBJECT from '@salesforce/schema/Track__c';
import TAG_OBJECT from '@salesforce/schema/Tag__c';
import PING_OBJECT from '@salesforce/schema/Ping__c';
import RECRUITMENT_FLOW_OBJECT from '@salesforce/schema/Recruitment_Flow__c';

export default class ConvertButton extends NavigationMixin(LightningElement) {
    @api convertButtonName = '';
    @api objectApiName;
    @api apiName;
    @api labelBtn;

    convertButton(){
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

    get labelCreateButtonMethod(){
        switch(true){
            case this.apiName.includes(TAG_OBJECT.objectApiName):
                this.labelBtn = 'Convert Recruitment Flow';
                break;
            case this.apiName.includes(TRACK_OBJECT.objectApiName):
                this.labelBtn = 'Convert Recruitment Flow';
                break;
            case this.apiName.includes(PING_OBJECT.objectApiName):
                this.labelBtn = 'Create Ping';
                break;
        }
        return this.labelBtn;
    }

    get objectApiNameMethod(){
        
        if(this.labelBtn.toLowerCase().includes('recruitment flow')){
            this.objectApiName = RECRUITMENT_FLOW_OBJECT.objectApiName
        }
        return this.objectApiName;
    }
}