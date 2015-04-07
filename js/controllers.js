var queryAnalysisApp = angular.module('queryAnalysisApp', []);

//Controller : LogInput
queryAnalysisApp.controller('LogInput', [function () {
	var self = this;
	self.getLog = function () {

		//getting log
		queryAnalysisApp.log = self.railsLog;

		//splitting log by lines
		queryAnalysisApp.log_lines = self.railsLog.split("\n");

		var tableNames = [];
		var tableQueryTypes = {};
		var statementsTypesForTable = ["FROM", "UPDATE", "DELETE FROM", "INSERT INTO"];

		//getting all the queries in the log
		queryAnalysisApp.queries = queryAnalysisApp.log_lines.filter(function(line){

			//parsing each line of log for checking sql query	
			sqlObj = simpleSqlParser.sql2ast(line);
			//get the table names also
			if(Object.getOwnPropertyNames(sqlObj).length != 0) {
				for ( var i in statementsTypesForTable) {

					if (sqlObj[statementsTypesForTable[i]]) {
						var tempTable = "";	
						if (statementsTypesForTable[i] === "INSERT INTO") {
							tempTable = sqlObj[statementsTypesForTable[i]].table;
						} else {
							tempTable = sqlObj[statementsTypesForTable[i]][0].table;
						}
						//getting refined table name
						tempTable = tempTable.replace(/\`/g, "");

						//getting the type of queries related to each table
						if (tableQueryTypes[tempTable]) {
							tableQueryTypes[tempTable] = tableQueryTypes[tempTable].concat(Object.keys(sqlObj));
						} else {
							tableQueryTypes[tempTable] = Object.keys(sqlObj);
						}
						tableNames.push(tempTable);
						break;
					}

				}
			}
			// return line.match(/\S+\s+\S+\s+\(\S+s\)/i);
			return Object.getOwnPropertyNames(sqlObj).length != 0;
		});

		queryAnalysisApp.tableNames = tableNames.filter(function(item, pos) {
			return tablesAll.indexOf(item) == pos;
		});

		//
		// a.FROM[0].table
		// statements = ["FROM", "UPDATE", "DELETE FROM"]
		// ["INSERT INTO"].table
		//b["DELETE FROM"][0].table

		//getting all the mysql table names
		// var tablesAll = [];
		// for (var i in queryAnalysisApp.queries) {

		// 	var table_name = queryAnalysisApp.queries[i].match(/\S+\s+/i)[0];
		// 	tablesAll.push(table_name.replace(" ", ""));
		// }
		// queryAnalysisApp.tables = tablesAll.filter(function(item, pos) {
		// 	return tablesAll.indexOf(item) == pos;
		// });

		//hiding the input class
		self.hide = true;
		queryAnalysisApp.inputHide = true;
		
	};
}]);



//Controller : LogAnalysis
queryAnalysisApp.controller('LogAnalysis', ['sharedProps', function (sharedProps) {
	var self = this;
	self.tables = function () {
		return sharedProps.getObject('tables');
	};

	self.selectTable = function () {
		console.log(self.mysqlTable);
		self.tableQueryType = null;
		//find out all query types regarding that table
		var tableSpecificQueries = []; 
		var tableSpecificQueryTypes = [];
		var type = null;
		for (var i in queryAnalysisApp.queries) {
			var tsq = queryAnalysisApp.queries[i].match(new RegExp('\\s+' + self.mysqlTable + '\\s+', 'i') );
			if (tsq) {
				tableSpecificQueries.push(queryAnalysisApp.queries[i]);
				type = queryAnalysisApp.queries[i].match(/\)\s+\S+\s+`/i)[0].replace(")", "").replace("`", "");
				type = type.replace(/\s+/g, "");
				tableSpecificQueryTypes.push(type);
			}
		}
		queryAnalysisApp.tableSpecificQueries = tableSpecificQueries;
		queryAnalysisApp.tableSpecificQueryTypes = tableSpecificQueryTypes.filter(function(item, pos) {
			return tableSpecificQueryTypes.indexOf(item) == pos;
		});
	};

	self.queryTypes = function () {
		return sharedProps.getObject('tableSpecificQueryTypes');
	};

	self.selectQueryType = function () {
		console.log(self.tableQueryType);
		queryAnalysisApp.tableSpecificTypeSpecificQ = [];
		for ( var i in queryAnalysisApp.tableSpecificQueries) {
			var tstsq = queryAnalysisApp.tableSpecificQueries[i].match(new RegExp('\\s+' + self.tableQueryType + '\\s+', 'i') );
			if (tstsq) {
				queryAnalysisApp.tableSpecificTypeSpecificQ.push(queryAnalysisApp.tableSpecificQueries[i]);
			}
		}
	};

	self.listQ = function () {
		return sharedProps.getObject('tableSpecificTypeSpecificQ');
	}

}]);


//Service for shared properties
queryAnalysisApp.factory('sharedProps', [function() { 
  return { 
    getObject: function(value) {
      return eval("queryAnalysisApp." + value);
    }
  }
}]);