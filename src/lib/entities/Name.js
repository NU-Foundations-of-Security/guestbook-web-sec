export class Name {
    constructor(name) {
        // Encode what a valid name is
        const validNameOrNot = this.isValidName(name);

        if (validNameOrNot) {
            // do something 
            this.name = name;
        }
        else {
            // do something
            // if it's invalid, we'll enforce it and store the updated name

            this.name = this.enforce(name);

            // (accept/reject), we'd send back an error to the caller

        }
    }

    isValidName(name) { // returns true/false
        const namePattern = /^[A-Za-z-.\s]+$/;
        return namePattern.test(name);
    }

    enforce(name) {
        // Change name to only have these valid characters
        const enforcePattern = /[^A-Za-z-.\s]/g;
        return name.replace(enforcePattern, '');
    }
}