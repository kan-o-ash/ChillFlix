
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '889420544483140',
    secret: 'a02489a62cf5c98b08e3292d5bef8692'
});


//Uncomment the below code to access API key for localhost testing

/*
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '646889445451102',
    secret: 'd0b9569bb2bb555a80b5516121e71440'
});
*/

