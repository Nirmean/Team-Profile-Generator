// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// Import the Employee class
import { Employee } from './Employee.js';

// Define the Engineer class as a child of Employee
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Call the constructor of the parent class (Employee) with super()
        super(name, id, email);
        this.github = github;
    }

    // Add a method to get the engineer's GitHub username
    getGithub() {
        return this.github;
    }

    // Override the getRole() method to return 'Engineer'
    getRole() {
        return 'Engineer';
    }
}

// Export the Engineer class
export { Engineer };
