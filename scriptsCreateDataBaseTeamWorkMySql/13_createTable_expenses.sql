CREATE TABLE IF NOT EXISTS dbo.expenses (
	expensesId														INT NOT NULL AUTO_INCREMENT,
	name															VARCHAR(500)			NULL,
	description														VARCHAR(65500)			NULL,
	createdByUserFirstName											VARCHAR(100)			NULL,
	updatedDate														VARCHAR(40)				NULL,
	projectName														VARCHAR(500)			NULL,
	createdByUserLastName											VARCHAR(100)			NULL,
	id																VARCHAR(100)			NULL,
	date															VARCHAR(40)				NULL,
	companyName														VARCHAR(500)			NULL,
	cost															VARCHAR(100)			NULL,
	projectsId														INT						NULL,
	companiesId														INT						NULL,
	createdByUserId													INT						NULL,					
	CONSTRAINT PK_expenses PRIMARY KEY (expensesId),
	CONSTRAINT FK_expenses_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_expenses_companies FOREIGN KEY (companiesId) REFERENCES dbo.companies(companiesId),
	CONSTRAINT FK_expenses_people FOREIGN KEY (createdByUserId) REFERENCES dbo.people(peopleId),
	CONSTRAINT UN_expensesID UNIQUE(id)
);

CREATE INDEX idx_expenses_projects ON dbo.expenses(projectsId);
CREATE INDEX idx_expenses_companies ON dbo.expenses(companiesId);
CREATE INDEX idx_expenses_people ON dbo.expenses(createdByUserId);

