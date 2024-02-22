// TODO: Write code to define and export the Employee class
module.exports = class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }

    getName = () => this.name
    getId = () => this.id
    getEmail = () => this.email
    getRole = () => "Employee"
}