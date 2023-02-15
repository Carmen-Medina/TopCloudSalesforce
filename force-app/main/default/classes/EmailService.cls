public with sharing class EmailService {

    
	private static final String NOREPLY = 'no_reply@deloitte.com';
	private static final String TRACKTEMPLATE = 'Track';
    private static final String TAGTEMPLATE = 'Tag';
    private static final String PINGTEMPLATE = 'Ping';

    public static void getEmailNotification(Id contactId,Id userInfoR, String typeTTP )
    {
        List<String> emailContactList = new List<String>();
        List<Contact> emailContact= [SELECT Id, Name FROM Contact ];

        emailContactList.add(emailContact[0].Name); 

        String str = String.join(emailContactList, ',');
        string [] ccaddress; 

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setTargetObjectId(contactId);
        mail.setReplyTo(NOREPLY);

        if(typeTTP == TRACKTEMPLATE ){

        }

        List<EmailTemplate> SEEmailTemplate= [SELECT Id, Name, DeveloperName 
                                            FROM EmailTemplate 
                                            WHERE DeveloperName = ''];

        mail.setTemplateId(SEEmailTemplate[0].Id);
        mail.setWhatId(contactId);

        if(str != null && str.trim() != ''){
        ccaddress = str.split(',',0);
        mail.setCcAddresses(ccaddress);
        }
        //mail.setToAddresses(emails);
        mail.setSaveAsActivity(false);

        Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {mail};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

        if (results[0].success)
        {
        System.debug('The email was sent successfully.');
        }
        else
        {
        System.debug('The email failed to send: ' + results[0].errors[0].message);
        }
    }
}