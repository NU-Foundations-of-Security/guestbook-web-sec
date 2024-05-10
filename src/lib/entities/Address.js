export class Address {
    constructor(city, state) {
        // Encode what a valid name is
        const validCityOrNot = this.isValidCity(city);
        const validStateOrNot = this.isValidState(state);

        if (validCityOrNot) {
            // do something 
            this.city = city;
        }
        else {
            // do something
            // if it's invalid, we'll enforce it and store the updated name

            this.city = this.enforce(city);
        }

        if (validStateOrNot) {
            this.state = state;
        } else {
            // (accept/reject), we'd send back an error to the caller
            throw new Error("State code must be one of the 50 allowed states.");
        }

        this.address = `${this.city}, ${this.state}`;
    }

    isValidCity(city) { // returns true/false
        const cityPattern = /^[A-Za-z-.\s]+$/;
        return cityPattern.test(city);
    }

    enforce(city) {
        // Change name to only have these valid characters
        const enforcePattern = /[^A-Za-z-.\s]/g;
        return city.replace(enforcePattern, '');
    }

    isValidState(state) {
       const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
       return states.includes(state); 
    }
}