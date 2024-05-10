export class Message {
    constructor(message) {
        // Encode what a valid message is
        const validMessageOrNot = this.isValidMessage(message);

        // if it's invalid, we'll enforce it and store the updated message
        if (validMessageOrNot) {
            // do something 
            this.message = message;
        }
        else {
            // do something
            // (accept/reject), we'd send back an error to the caller
            
            throw new Error('Message should only have alphabets, numbers, spaces, and common emojis.');
        }
    }

    isValidMessage(message) {
        const messagePattern = /^([\w\s]|(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]))+$/;
        return messagePattern.test(message);
    }
}