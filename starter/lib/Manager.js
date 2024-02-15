// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// Import the Employee class
const Employee = require('./Employee');

// Define the Manager class as a child of Employee
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // Call the constructor of the parent class (Employee) with super()
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // Add a method to get the manager's office number
    getOfficeNumber() {
        return this.officeNumber;
    }

    // Override the getRole() method to return 'Manager'
    getRole() {
        return 'Manager';
    }
}

// Export the Manager class
module.exports = Manager;