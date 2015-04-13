# Parsing SQL Queries from Rails Server Log

This is a very small app developed using angular.js library only with the intention to study angular.js.
Since this is my first angular project and I'm not much of a front-end guy, the code will look really ugly to the real angular developers[not only angular developers, developers in general].

Now about the app. This does not have a backend and can run in any browser. 
This app is used to categorise the queries by tables and by type from the Rails Server Log in the console.
All you have to do is
1. Download or clone this repo.
2. Open the "query_compare.html" file in any browser.
3. The first page will have a plain text box to input the log from the rails server.
4. Copy the server log and click on the submit.
5. Voila. Now you will be shown a page where you can select the table.
6. After selecting the table you can select the type of query related to that table.
7. Right after you select type, all the queries of that type ralted to that tbale you slected will be listed below.


I have used a third party javascript library for parsing the SQL Queries. 
This libary is called <a href="https://github.com/dsferruzza/simpleSqlParser"> simpleSqlParser </a> and it's an awsome library, without which it woould have been very difficult.