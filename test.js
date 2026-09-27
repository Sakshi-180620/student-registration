
// Student Registration Form - Comprehensive Test Suite with Password Validation

console.log('\n╔═══════════════════════════════════════════════════╗');
console.log('║   Student Registration Form - Test Suite       ║');
console.log('║   Testing: Files, Email, Phone, Password       ║');
console.log('╚═══════════════════════════════════════════════════╝\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName, message) {
    if (condition) {
        console.log(`✓ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`✗ FAIL: ${testName} - ${message}`);
        testsFailed++;
        return false;
    }
}

// ==========================================
// TEST 1: index.html File Validation
// ==========================================
function test1_IndexHtmlValidation() {
    console.log('\n[TEST 1] index.html File Validation');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    try {
        const content = fs.readFileSync('index.html', 'utf8');
        
        assert(content.length > 0, 'File Exists', 'index.html should have content');
        assert(content.includes('<!DOCTYPE html>'), 'HTML Structure', 'Should have DOCTYPE');
        assert(content.includes('<form'), 'Form Element', 'Should have form element');
        assert(content.includes('id="registrationForm"'), 'Form ID', 'Should have registrationForm ID');
        assert(content.includes('id="name"'), 'Name Field', 'Should have name input field');
        assert(content.includes('id="email"'), 'Email Field', 'Should have email input field');
        assert(content.includes('id="phone"'), 'Phone Field', 'Should have phone input field');
        assert(content.includes('id="course"'), 'Course Field', 'Should have course select field');
        assert(content.includes('type="submit"'), 'Submit Button', 'Should have submit button');
        assert(content.includes('student.js'), 'JavaScript Link', 'Should link to student.js');
        
    } catch(error) {
        assert(false, 'index.html Read', `Error: ${error.message}`);
    }
}

// ==========================================
// TEST 2: style.css File Validation
// ==========================================
function test2_StyleCssValidation() {
    console.log('\n[TEST 2] style.css File Validation');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    try {
        const content = fs.readFileSync('style.css', 'utf8');
        
        assert(content.length > 0, 'File Exists', 'style.css should have content');
        assert(content.includes('body'), 'Body Styling', 'Should have body CSS');
        assert(content.includes('.container'), 'Container Class', 'Should have container class');
        assert(content.includes('form'), 'Form Styling', 'Should have form styling');
        assert(content.includes('input'), 'Input Styling', 'Should have input styling');
        assert(content.includes('button'), 'Button Styling', 'Should have button styling');
        assert(content.includes('label'), 'Label Styling', 'Should have label styling');
        assert(content.includes('select'), 'Select Styling', 'Should have select styling');
        assert(content.includes('background'), 'Background Property', 'Should have background styling');
        
    } catch(error) {
        assert(false, 'style.css Read', `Error: ${error.message}`);
    }
}

// ==========================================
// TEST 3: student.json Data Validation
// ==========================================
function test3_StudentJsonValidation() {
    console.log('\n[TEST 3] student.json Data Validation');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    try {
        const data = JSON.parse(fs.readFileSync('student.json', 'utf8'));
        
        assert(data !== null, 'JSON Parse', 'JSON should be valid');
        assert(data.students !== undefined, 'Students Array', 'Should have students array');
        assert(Array.isArray(data.students), 'Array Type', 'students should be an array');
        assert(data.students.length >= 3, 'Student Count', 'Should have at least 3 students');
        
        if (data.students.length > 0) {
            const student = data.students[0];
            assert(student.id !== undefined, 'Student ID', 'Should have id field');
            assert(student.name !== undefined, 'Student Name', 'Should have name field');
            assert(student.email !== undefined, 'Student Email', 'Should have email field');
            assert(student.phone !== undefined, 'Student Phone', 'Should have phone field');
            assert(student.course !== undefined, 'Student Course', 'Should have course field');
            assert(student.registeredAt !== undefined, 'Registration Time', 'Should have registeredAt field');
        }
        
    } catch(error) {
        assert(false, 'student.json Read', `Error: ${error.message}`);
    }
}

// ==========================================
// TEST 4: Email Validation Function
// ==========================================
function test4_EmailValidation() {
    console.log('\n[TEST 4] Email Validation Logic');
    console.log('─'.repeat(50));
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const validEmails = [
        'student@gmail.com',
        'raj.kumar@college.edu',
        'priya123@test.co.in',
        'amit_patel@company.org',
        'contact@university.ac.uk'
    ];
    
    validEmails.forEach(email => {
        const isValid = emailRegex.test(email);
        assert(isValid === true, `Valid: ${email}`, 'Should validate correctly');
    });
    
    const invalidEmails = [
        'student@',
        '@gmail.com',
        'studentgmail.com',
        'student @domain.com',
        'student@@gmail.com'
    ];
    
    invalidEmails.forEach(email => {
        const isValid = emailRegex.test(email);
        assert(isValid === false, `Invalid: ${email}`, 'Should reject invalid email');
    });
}

// ==========================================
// TEST 5: Phone Validation Function
// ==========================================
function test5_PhoneValidation() {
    console.log('\n[TEST 5] Phone Validation Logic');
    console.log('─'.repeat(50));
    
    const phoneRegex = /^[0-9]{10}$/;
    
    const validPhones = [
        '9876543210',
        '8765432109',
        '7654321098',
        '9123456789',
        '8999999999'
    ];
    
    validPhones.forEach(phone => {
        const isValid = phoneRegex.test(phone);
        assert(isValid === true, `Valid: ${phone}`, 'Should validate 10-digit number');
    });
    
    const invalidPhones = [
        '123',
        '12345678901',
        'abcd123456',
        '987-654-3210',
        '+919876543210',
        '98765 43210'
    ];
    
    invalidPhones.forEach(phone => {
        const isValid = phoneRegex.test(phone);
        assert(isValid === false, `Invalid: ${phone}`, 'Should reject invalid phone');
    });
}

// ==========================================
// TEST 6: Password Validation Function 🔐
// ==========================================
function test6_PasswordValidation() {
    console.log('\n[TEST 6] Password Validation Logic 🔐');
    console.log('─'.repeat(50));
    
    // Password validation function
    const isValidPassword = (password) => {
        // Password must be at least 8 characters
        if (password.length < 8) {
            return false;
        }
        
        // Must have at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        
        // Must have at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return false;
        }
        
        // Must have at least one number
        if (!/[0-9]/.test(password)) {
            return false;
        }
        
        // Must have at least one special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
        }
        
        return true;
    };
    
    // Valid strong passwords
    const validPasswords = [
        'MyPass123!',
        'Secure@Password1',
        'Strong#Pass123',
        'Admin@2024',
        'Password$123'
    ];
    
    validPasswords.forEach(password => {
        const isValid = isValidPassword(password);
        assert(isValid === true, `Strong: ${password}`, 'Should validate strong password');
    });
    
    // Invalid weak passwords
    const invalidPasswords = [
        'pass',                    // Too short
        'password123',             // No uppercase, no special char
        'PASSWORD123',             // No lowercase, no special char
        'Password',                // No number, no special char
        'pass123!',                // No uppercase
        'PASS123!',                // No lowercase
        'PassWord!',               // No number
        'Password123',             // No special character
        '        ',                // Only spaces
        ''                         // Empty password
    ];
    
    invalidPasswords.forEach(password => {
        const isValid = isValidPassword(password);
        assert(isValid === false, `Weak: "${password}"`, 'Should reject weak password');
    });
}

// ==========================================
// TEST 7: JavaScript File Validation
// ==========================================
function test7_StudentJsValidation() {
    console.log('\n[TEST 7] student.js File Validation');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    try {
        const content = fs.readFileSync('student.js', 'utf8');
        
        assert(content.length > 0, 'File Exists', 'student.js should have content');
        assert(content.includes('isValidEmail'), 'Email Validator', 'Should have email validation function');
        assert(content.includes('isValidPhone'), 'Phone Validator', 'Should have phone validation function');
        assert(content.includes('registrationForm'), 'Form Reference', 'Should reference form element');
        assert(content.includes('addEventListener'), 'Event Listener', 'Should have event listener');
        assert(content.includes('preventDefault'), 'Form Prevention', 'Should prevent default form submission');
        assert(content.includes('showMessage'), 'Message Function', 'Should have message display function');
        
    } catch(error) {
        assert(false, 'student.js Read', `Error: ${error.message}`);
    }
}

// ==========================================
// TEST 8: Student Data Validation
// ==========================================
function test8_StudentDataValidation() {
    console.log('\n[TEST 8] Student Data in JSON');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    try {
        const data = JSON.parse(fs.readFileSync('student.json', 'utf8'));
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const validCourses = ['BCA', 'B.Tech', 'MBA'];
        
        data.students.forEach((student, index) => {
            const nameValid = student.name && student.name.length > 0;
            assert(nameValid, `Student ${index + 1}: Name`, `Name should not be empty`);
            
            const emailValid = emailRegex.test(student.email);
            assert(emailValid, `Student ${index + 1}: Email`, `${student.email} should be valid`);
            
            const phoneValid = phoneRegex.test(student.phone);
            assert(phoneValid, `Student ${index + 1}: Phone`, `${student.phone} should be valid 10-digit`);
            
            const courseValid = validCourses.includes(student.course);
            assert(courseValid, `Student ${index + 1}: Course`, `${student.course} should be valid course`);
        });
        
    } catch(error) {
        assert(false, 'Student Data Validation', `Error: ${error.message}`);
    }
}

// ==========================================
// TEST 9: Form Field Validation Logic
// ==========================================
function test9_FormFieldValidation() {
    console.log('\n[TEST 9] Form Field Validation');
    console.log('─'.repeat(50));
    
    const testCases = [
        { name: 'Raj Kumar', email: 'raj@gmail.com', phone: '9876543210', course: 'BCA', valid: true },
        { name: 'Priya Singh', email: 'priya@college.edu', phone: '8765432109', course: 'B.Tech', valid: true },
        { name: '', email: 'test@gmail.com', phone: '9876543210', course: 'BCA', valid: false },
        { name: 'Amit', email: 'invalid-email', phone: '9876543210', course: 'BCA', valid: false },
        { name: 'Test', email: 'test@gmail.com', phone: '123', course: 'BCA', valid: false },
        { name: 'Test', email: 'test@gmail.com', phone: '9876543210', course: 'Invalid', valid: false }
    ];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const validCourses = ['BCA', 'B.Tech', 'MBA'];
    
    testCases.forEach((test, index) => {
        const nameValid = test.name.length > 0;
        const emailValid = emailRegex.test(test.email);
        const phoneValid = phoneRegex.test(test.phone);
        const courseValid = validCourses.includes(test.course);
        
        const allValid = nameValid && emailValid && phoneValid && courseValid;
        
        assert(allValid === test.valid, `Form Case ${index + 1}`, `Validation result should match expected`);
    });
}

// ==========================================
// TEST 10: Project File Structure
// ==========================================
function test10_ProjectStructure() {
    console.log('\n[TEST 10] Project File Structure');
    console.log('─'.repeat(50));
    
    const fs = require('fs');
    
    const requiredFiles = [
        'index.html',
        'style.css',
        'student.js',
        'student.json',
        'test.js',
        'build.sh',
        'package.json'
    ];
    
    requiredFiles.forEach(file => {
        const exists = fs.existsSync(file);
        assert(exists, `File: ${file}`, `${file} should exist in project`);
    });
}

// ==========================================
// TEST 11: Combined Validation (All Fields)
// ==========================================
function test11_CombinedValidation() {
    console.log('\n[TEST 11] Combined Field Validation');
    console.log('─'.repeat(50));
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };
    
    const isValidPassword = (password) => {
        if (password.length < 8) return false;
        if (!/[A-Z]/.test(password)) return false;
        if (!/[a-z]/.test(password)) return false;
        if (!/[0-9]/.test(password)) return false;
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
        return true;
    };
    
    const isEmpty = (value) => value === '' || value === null || value === undefined;
    
    // Valid complete form
    assert(!isEmpty('Raj Kumar'), 'Name Not Empty', 'Name should not be empty');
    assert(isValidEmail('raj@gmail.com'), 'Valid Email', 'Email should be valid');
    assert(isValidPhone('9876543210'), 'Valid Phone', 'Phone should be valid');
    assert(isValidPassword('MyPass123!'), 'Valid Password', 'Password should be strong');
    
    // Invalid cases
    assert(isEmpty(''), 'Empty Field Check', 'Empty field should be detected');
    assert(!isValidEmail('invalid.email'), 'Invalid Email', 'Should reject invalid email');
    assert(!isValidPhone('12345'), 'Invalid Phone', 'Should reject invalid phone');
    assert(!isValidPassword('weak'), 'Invalid Password', 'Should reject weak password');
}

// ==========================================
// RUN ALL TESTS
// ==========================================
function runAllTests() {
    test1_IndexHtmlValidation();
    test2_StyleCssValidation();
    test3_StudentJsonValidation();
    test4_EmailValidation();
    test5_PhoneValidation();
    test6_PasswordValidation();
    test7_StudentJsValidation();
    test8_StudentDataValidation();
    test9_FormFieldValidation();
    test10_ProjectStructure();
    test11_CombinedValidation();
    
    // Summary
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║           TEST SUMMARY REPORT                    ║');
    console.log('╠═══════════════════════════════════════════════════╣');
    console.log(`║ Total Tests Passed: ${testsPassed}                               ║`.substring(0, 50) + '║');
    console.log(`║ Total Tests Failed: ${testsFailed}                               ║`.substring(0, 50) + '║');
    console.log('╠═══════════════════════════════════════════════════╣');
    
    if (testsFailed === 0) {
        console.log('║ ✓ ALL TESTS PASSED!                               ║');
        console.log('╚═══════════════════════════════════════════════════╝\n');
        process.exit(0);
    } else {
        console.log(`║ ✗ ${testsFailed} TEST(S) FAILED!                            ║`);
        console.log('╚═══════════════════════════════════════════════════╝\n');
        process.exit(1);
    }
}

// Run tests
runAllTests();

module.exports = { runAllTests };
