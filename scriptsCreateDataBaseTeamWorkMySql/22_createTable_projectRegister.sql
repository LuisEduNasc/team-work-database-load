CREATE TABLE IF NOT EXISTS dbo.projectregister (
	projectregisterid					INT NOT NULL AUTO_INCREMENT,
	createdon							VARCHAR(40)			NULL,
	projectid							INT				NOT NULL,
	clientsegment						VARCHAR(500)		NULL,
	projectcategory						VARCHAR(500)		NULL,
	startdate							VARCHAR(40)			NULL,
	expectedgolive						VARCHAR(40)			NULL,
	technologymigration					VARCHAR(500)		NULL,
	technologyused						VARCHAR(500)		NULL,
	projectname							VARCHAR(500)		NULL,
	countryproject						VARCHAR(500)		NULL,
	projectsubcategory					VARCHAR(500)		NULL,
	vtexbackground						VARCHAR(65500)		NULL,
	accountplataform					VARCHAR(65500)		NULL,
    vtexprofessionalservices			VARCHAR(100)		NULL,
	projectsid							INT				NOT NULL,
	CONSTRAINT PK_projectregister PRIMARY KEY (projectregisterid),
	CONSTRAINT FK_projectregister_projects FOREIGN KEY (projectsid) REFERENCES dbo.projects(projectsid)
);

CREATE INDEX idx_projectregister_projects ON dbo.projectregister(projectsid);
