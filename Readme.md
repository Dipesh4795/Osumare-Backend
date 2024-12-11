Details of Backend Project:-

1. Port number:- 8000
2. Database:- localMemory
3. Command to start server:- npm run dev
4. Apis:- Restful Api
   task Modal:-(name,description,priority)
   (a) for getall task:- "http://localhost:8000/api/v1/tasks/(GET)
   implement the pagination so that at max 10 tasks per page.
   we get the task in sorted manner of their priority(High,Low,Moderate).
   we can also filter the tasks by their priority.
   (b) for get task by id:- "http://localhost:8000/api/v1/tasks/:id(GET)
   (c)for create task:- "http://localhost:8000/api/v1/tasks/(POST)
   (d) for update a task by id:-"http://localhost:8000/api/v1/tasks/:id (PUT)
   (e)for delete task by id:- "http://localhost:8000/api/v1/tasks/:id (delete)
   we can signup and login as Teacher and Student for providing Authentication and Autheroziation services.
   for signup:"http://localhost:8000/api/v1/auth/signup(POST)
   {
   email,password,confirmpassword,accounttype
   }
   for login:"http://localhost:8000/api/v1/auth/login(POST)
   {
   email,password
   }

5. we provide Authentication and Autheroziation to the tasks Api for provide more security.
   1.everyone has access of getalltask Api
   2.only Authenticatied has access of gettask by id;
   3.only Teacher has access to create a task and delete a task
   4.only student has access to update a task

6. Use Postman for API testing
