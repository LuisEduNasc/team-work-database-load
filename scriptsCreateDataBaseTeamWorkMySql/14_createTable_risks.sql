CREATE TABLE IF NOT EXISTS dbo.risks (
	risksId														INT NOT NULL AUTO_INCREMENT,
	lastChangedOn												VARCHAR(40)				NULL,
	impact														VARCHAR(100)			NULL,
	impactSchedule												VARCHAR(40)				NULL,
	impactValue													VARCHAR(40)				NULL,
	status														VARCHAR(100)			NULL,
	probabilityValue											VARCHAR(40)				NULL,
	source														VARCHAR(1000)			NULL,
	canEdit														BOOLEAN				NOT NULL,
	result														VARCHAR(40)				NULL,
	createdOn													VARCHAR(40)				NULL,
	id															VARCHAR(100)		NOT NULL,
	deleted														BOOLEAN				NOT NULL,
	createdByUserLastName										VARCHAR(100)			NULL,
	companyName													VARCHAR(500)			NULL,
	createdByUserFirstName										VARCHAR(100)			NULL,
	lastChangedByUserFirstName									VARCHAR(100)			NULL,
	projectName													VARCHAR(500)			NULL,
	projectIsActive												BOOLEAN				NOT NULL,
	impactPerformance											VARCHAR(10)				NULL,
	mitigationPlan												VARCHAR(65500)			NULL,
	probability													VARCHAR(100)			NULL,
	lastChangedByUserLastName									VARCHAR(100)			NULL,
	impactCost													VARCHAR(100)			NULL,
	createdByUserId												INT						NULL,
	projectsId													INT						NULL,
	lastChangedByUserId											INT						NULL,
	companiesId													INT						NULL,
	CONSTRAINT PK_risks PRIMARY KEY (risksId),
	CONSTRAINT FK_risks_peopleCreate FOREIGN KEY (createdByUserId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_risks_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_risks_peopleChange FOREIGN KEY (lastChangedByUserId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_risks_companies FOREIGN KEY (companiesId) REFERENCES dbo.companies(companiesId),
	CONSTRAINT UN_risksID UNIQUE(id)
);

CREATE INDEX idx_risks_peopleCreate ON dbo.risks(createdByUserId);
CREATE INDEX idx_risks_projects ON dbo.risks(projectsId);
CREATE INDEX idx_risks_peopleChange ON dbo.risks(lastChangedByUserId);
CREATE INDEX idx_risks_companies ON dbo.risks(companiesId);
