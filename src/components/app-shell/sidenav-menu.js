


export const menuItems = [
    ['dashboard', 'Students', '/students', 'all'],
    ['person_add', 'Add Student', '/students/add-student', 'all'],
    ['dashboard', 'Users', '/users', 'admin'],
    ['group_add', 'Add User', '/users/add-user', 'admin'],
    ['assignment', 'Create Circular', '/add-circular', 'all'],
    ['bug_report', 'Create Report', '/create-report', 'all'],
    ['phonelink_lock', 'Update Password', '/update-password', 'all'],
    ['account_box', 'Profile', '/profile', 'all'],
].map(([icon, text, path, acl]) => ({ icon, text, path, acl }));
