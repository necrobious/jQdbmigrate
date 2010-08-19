/**
 * based around ideas found in: http://blog.maxaller.name/2010/03/html5-web-sql-database-intro-to-versioning-and-migrations/
 */
(function($){
	$.dbmigrate = function (db, migrations, error) {
		// our recursive function to synchronously migrate the database to the latest version
		var m = function (i){       
			if (migrations[i]){       // i > migrations.length is undefined, our basecase
				db.changeVersion(
					db.version,           // current version
					String(i),            // new fersion
					migrations[i],        // migrate-to-new-version function
					error,                // error-while-migrating function
					function () {m(i+1);} // when-migration-is-finished, we recurse.
				);
				if (console.info) {
					console.info("[HTML5:Web-SQL-DB] Database migrated to version %d", i);
				}
			}
		};
		
		// kickoff the migration, starting with the current version of the db
		try {m((parseInt(db.version) || -1) + 1);} 
		catch (e) {error(e);}
	};
})(jQuery);