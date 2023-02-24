public with sharing class getIdFromRecord {
    @AuraEnabled(cacheable=false)
    public static List<sObject> fetchRecordId(String contactId, String nameComponent){
        List<sObject> ids = new List<sObject> ();
        try
        {
            switch on nameComponent {
                when 'Ping' {
                    List<sObject> records = [SELECT ID, Ping_Reminder_Date__c FROM Ping__c where Contact__c = :contactId and Active__c = true];
                    ids.add(records[0]);
                }
                when 'Track' {
                    List<sObject> records = [SELECT ID, Track_Reminder_Date__c FROM Track__c where Candidate__c = :contactId and Active__c = true];
                    ids.add(records[0]);
                }
                when else {
                    List<Tag__c> records = [SELECT ID, Name FROM Tag__c where Candidate__c = :contactId and Active__c = true];
                    for (Tag__c tag : records) {
                        ids.add(tag);
                    }
                }
            }
            return ids;
        }
        catch(Exception ex)
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}