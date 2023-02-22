public with sharing class getIdFromRecord {
    @AuraEnabled(cacheable=true)
    public static List<String> fetchRecordId(String contactId, String nameComponent){
        List<String> ids = new List<String> ();
        try
        {
            switch on nameComponent {
                when 'Ping' {
                    List<Ping__c> records = [SELECT ID FROM Ping__c where Contact__c = :contactId and Active__c = true];
                    ids.add(records[0].ID);
                }
                when 'Track' {
                    List<Track__c> records = [SELECT ID FROM Track__c where Candidate__c = :contactId and Active__c = true];
                    ids.add(records[0].ID);
                }
                when else {
                    List<Tag__c> records = [SELECT ID, Name FROM Tag__c where Candidate__c = :contactId and Active__c = true];
                    for (Tag__c tag : records) {
                        ids.add(tag.ID+' '+tag.Name);
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