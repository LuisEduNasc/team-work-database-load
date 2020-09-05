CREATE TABLE IF NOT EXISTS dbo.updates (
	updatesId							INT NOT NULL AUTO_INCREMENT,
	deleteDate							VARCHAR(40)				NULL,
	text								VARCHAR(65500)			NULL,
	health								VARCHAR(100)			NULL,
	id									VARCHAR(100)			NULL,
	projectName							VARCHAR(500)			NULL,
	dateCreated							VARCHAR(40)				NULL,
	color								VARCHAR(10)				NULL,
	deleted								BOOLEAN				NOT NULL,
	userAvatarUrl						VARCHAR(2083)			NULL,
	userFirstName						VARCHAR(100)			NULL,
	userFullName						VARCHAR(200)			NULL,
	userLastName						VARCHAR(100)			NULL,
	projectStatus						VARCHAR(100)			NULL,
	projectsId							INT						NULL,
	peopleId							INT						NULL,
	CONSTRAINT PK_updates PRIMARY KEY (updatesId),
	CONSTRAINT FK_updates_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_updates_people FOREIGN KEY (peopleId) REFERENCES dbo.people(peopleId),
	CONSTRAINT UN_updatesID UNIQUE(id)
);

CREATE INDEX idx_updates_projects ON dbo.updates(projectsId);
CREATE INDEX idx_updates_people ON dbo.updates(peopleId);
