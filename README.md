React web application for manual book translators using modern best practices. Focus on the following structured features in a logical progression from user onboarding to core translation workflow:

1. **Registration/Login Page**: Implement secure user authentication with login/password, including form validation, error handling, and JWT-based sessions. Redirect to the main profile page upon successful login.

2. **Profile - Main Page**: Display user details . Include options to view or create books, with role-based access.

3. **Book Page**: For each book, show metadata (title, author, description) and a feature to add/remove translators via a searchable user list. Only authorized translators (added to the book) gain access permissions.

4. **Chapter Page**: List chapters for a selected book in a paginated or accordion view, showing chapter titles, and links to the translation page.

5. **Translation Page**: Split the selected chapter into editable sections (e.g., paragraphs). Provide side-by-side original and translation text fields for manual input, with save functionality, version history, and collaborative notes.
