import { wire, api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import { getRecord } from 'lightning/uiRecordApi';
import TRACK_OBJECT from '@salesforce/schema/Track__c';
import TAG_OBJECT from '@salesforce/schema/Tag__c';
import PING_OBJECT from '@salesforce/schema/Ping__c';
import TASK_OBJECT from '@salesforce/schema/Task';
import RECRUITMENT_FLOW_OBJECT from '@salesforce/schema/Recruitment_Flow__c';

import CANDIDATE_COMPANY from '@salesforce/schema/Contact.AccountId';
import CANDIDATE_OWNER from '@salesforce/schema/Contact.OwnerId';

export default class ConvertNewButton extends NavigationMixin(LightningElement) {
    //inherited attribute
    @api recordId;
    @api apiName;
    @api pingChannel;

    objectApiName;
    labelBtn;

    @wire(getRecord,{recordId: '$recordId', fields: [CANDIDATE_COMPANY, CANDIDATE_OWNER]})
    contact;

    get companyId(){
        return this.contact.data.fields.AccountId.value;
    }
    get ownerId(){
        return this.contact.data.fields.OwnerId.value;
    }

    // Navigate to Convert New Recruitment Flow or New Task
    convertButton(){
        console.log('convert button');
        console.log(this.labelConvertButtonMethod);
        console.log(this.objectApiNameMethod);
        console.log(this.pingChannel);
        this[NavigationMixin.Navigate](this.newNavMixForm);
    }

    get newNavMixForm(){
        return {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiNameMethod,
                actionName: 'new'
            },
            state: {
                defaultFieldValues: this.switchDefaultValues,
                nooverride: '1'
            }
        };
    }

    //Depending on what it receives from apiName changes the label
    get labelConvertButtonMethod(){
        if(this.apiName === TAG_OBJECT.objectApiName){
            this.labelBtn = 'Convert Tag';
        }else if(this.apiName === TRACK_OBJECT.objectApiName){
            this.labelBtn = 'Convert Track';
        }else if(this.apiName === PING_OBJECT.objectApiName){
            this.labelBtn = 'Create Task';
        }
        return this.labelBtn;
    }

    //Depending on what does the label has change objectApiName
    get objectApiNameMethod(){
        if(this.labelConvertButtonMethod.toLowerCase().includes('task')){
            this.objectApiName = TASK_OBJECT.objectApiName;
        }else{
            this.objectApiName = RECRUITMENT_FLOW_OBJECT.objectApiName;
        }
        return this.objectApiName;
    }

    //Switch default field values
    get switchDefaultValues(){
        const defaultValuesForTask = encodeDefaultFieldValues({
            WhoId: this.recordId,
            OwnerId: this.ownerId,
            CallType: this.pingChannel
        });

        const defaultValuesForRecruitmentFlow = encodeDefaultFieldValues({
            Candidate__c: this.recordId,
            Company__c: this.companyId
        });

        let defaultValues = (this.objectApiNameMethod === TASK_OBJECT.objectApiName)?
            defaultValuesForTask:
            defaultValuesForRecruitmentFlow;

        return defaultValues;
    }
}