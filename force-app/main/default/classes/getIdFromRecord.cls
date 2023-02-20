public with sharing class getIdFromRecord {
    @AuraEnabled(cacheable=true)
    public static String fetchRecordId(String contactId, String nameComponent){
        try
        {
            switch on nameComponent {
                when 'Ping' {
                    List<Ping__c> records = [SELECT ID FROM Ping__c where Contact__c = :contactId and Active__c = true];
                    return records[0].ID;
                }
                when 'Track' {
                    List<Track__c> records = [SELECT ID FROM Track__c where Candidate__c = :contactId and Active__c = true];
                    return records[0].ID;
                }
                when else {
                    return '';
                }
            }
        }
        catch(Exception ex)
        {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
}