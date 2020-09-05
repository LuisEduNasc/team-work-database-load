CREATE TABLE IF NOT EXISTS dbo.projectsPeople (
	projectsPeopleId		INT NOT NULL AUTO_INCREMENT,
	projectsId				INT					NOT NULL,
	peopleId				INT					NOT NULL,
	fromDate				TIMESTAMP			NOT NULL,
	toDate					TIMESTAMP			NOT NULL,
	CONSTRAINT PK_projectsPeople PRIMARY KEY (projectsPeopleId),
	CONSTRAINT FK_projectsPeople_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_projectsPeople_people FOREIGN KEY (peopleId) REFERENCES dbo.people(peopleId)
);

CREATE INDEX idx_projectsPeople_projects ON dbo.projectsPeople (projectsId);
CREATE INDEX idx_projectsPeople_people ON dbo.projectsPeople (peopleId);