# Parsing SQL Queries from Rails Server Log

## Motivation
While in Freshdesk, during feature development, I was expected to optimize each and every query that was fired as part of feature and many a times, to have better response times, the existing queries also need to be optimized. In local development, it was very tiresome to look through the rails server logs to find out the join queries, unexpected table's queries and unwanted load queries. In order to get a holistic and organised view of the queries from the rails server log, I wrote this tiny standlaone app using angular.

## Working

This App does not require a backend and can run in any browser. This app is used to categorise the queries by tables and by type from the Rails Server Log in the console.

All you have to do is <br/>
1. Download or clone this repo. <br/>
2. Open the "query_compare.html" file in any browser. <br/>
3. The first page will have a plain text box to input the log from the rails server. <br/>
<img src="https://raw.githubusercontent.com/ynos1234/rails-server-log-sql-query-categorising/master/Screenshots/input.png" />
4. Copy the server log and click on the submit. <br/>
5. Voila. Now you will be shown a page where you can select the table. <br/>
6. After selecting the table you can select the type of query related to that table. <br/>
<img src="https://raw.githubusercontent.com/ynos1234/rails-server-log-sql-query-categorising/master/Screenshots/table_select.png" />
7. Right after you select type, all the queries of that type ralted to that tbale you slected will be listed below. <br/>

## Special Mention

I have used a third party javascript library for parsing the SQL Queries. 
This libary is called <a href="https://github.com/dsferruzza/simpleSqlParser"> simpleSqlParser </a> and it's an awesome library, without which it would have been very difficult.
