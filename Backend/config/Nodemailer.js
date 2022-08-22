
 
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'israiely.affan98@gmail.com',
        pass: 'zqtnyxuenhfdbonx'
    }
});
 
let mailDetails = {
    from: 'israiely.affan98@gmail.com',
    to: 'affan.israiely@mail.vinove.com',
    subject: 'Test mail',
    text: 'Node.js testing mail '
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});