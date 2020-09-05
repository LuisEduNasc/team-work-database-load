CREATE TABLE IF NOT EXISTS dbo.projectgolive (
	projectgoliveId						INT NOT NULL AUTO_INCREMENT,
	createdon							VARCHAR(40)		NULL,
	projectid							INT		NOT 	NULL,
	golivedate							VARCHAR(40)		NULL,
	projectmanagercomments				VARCHAR(65500)	NULL,
	projectevaluationbypm				INT				NULL,
	countrygolive						VARCHAR(65500)	NULL,
	accountplataform					VARCHAR(65500)	NULL,
	ownertestimonial					VARCHAR(65500)	NULL,
	projectsid							INT			NOT NULL,
	CONSTRAINT PK_projectgolive PRIMARY KEY (projectgoliveId),
	CONSTRAINT FK_projectgolive_projects FOREIGN KEY (projectsid) REFERENCES dbo.projects(projectsid)
);

CREATE INDEX idx_projectgolive_projects ON dbo.projectgolive(projectsid);
