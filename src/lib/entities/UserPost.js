import { Address } from "./Address";
import { Message } from "./Message";
import { Name } from "./Name";

export class UserPost {
    constructor(name, city, state, message, display) {
        this.name = new Name(name);
        this.message = new Message(message);
        this.address = new Address(city, state);
        this.display = display;
    }

    getName() {
        return this.name.name;
    }

    getMessage() {
        return this.message.message;
    }

    getAddress() {
        return this.address.address;
    }

    getDisplay() {
        return this.display;
    }
}