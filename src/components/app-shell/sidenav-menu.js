export const menuItems = [
    ['dashboard', 'Students', '/students'],
    ['person_add', 'Add Student', '/students/add-student'],
    ['dashboard', 'Users', '/users'],
    ['group_add', 'Add User', '/users/add-user'],
].map(([icon, text, path]) => ({ icon, text, path }));
