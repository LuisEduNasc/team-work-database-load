CREATE TABLE IF NOT EXISTS dbo.invoices (
	invoicesId														INT NOT NULL AUTO_INCREMENT,
	exportedByUserId												VARCHAR(100)			NULL,
	timeCost														VARCHAR(100)			NULL,
	createdByUserFirstName											VARCHAR(100)			NULL,
	fixedCost														VARCHAR(100)			NULL,
	status															VARCHAR(100)			NULL,
	dateCreated														VARCHAR(40)				NULL,
	exportedByUserLastName											VARCHAR(100)			NULL,
	number															VARCHAR(100)			NULL,
	poNumber														VARCHAR(100)			NULL,
	exportedByUserFirstName											VARCHAR(100)			NULL,
	id																VARCHAR(100)			NULL,
	companyName														VARCHAR(100)			NULL,
	editedByUserFirstName											VARCHAR(100)			NULL,
	totalTimeDecimal												VARCHAR(100)			NULL,
	totalCost														VARCHAR(100)			NULL,
	description														VARCHAR(65500)			NULL,
	expensesCost													VARCHAR(100)			NULL,
	totalTime														VARCHAR(100)			NULL,
	exportedDate													VARCHAR(40)				NULL,
	displayDate														VARCHAR(40)				NULL,
	projectName														VARCHAR(100)			NULL,
	createdByUserLastName											VARCHAR(100)			NULL,
	dateUpdated														VARCHAR(40)				NULL,
	editedByUserLastName											VARCHAR(100)			NULL,
	currencyCode													VARCHAR(10)				NULL,
	projectsId														INT						NULL,
	updateByUserId													INT						NULL,
	createdByUserId													INT						NULL,
	companiesId														INT						NULL,
	CONSTRAINT PK_invoices PRIMARY KEY (invoicesId),
	CONSTRAINT FK_invoices_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_invoices_peopleUpdate FOREIGN KEY (updateByUserId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_invoices_peopleCreate FOREIGN KEY (createdByUserId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_invoices_companies FOREIGN KEY (companiesId) REFERENCES dbo.companies(companiesId),
	CONSTRAINT UN_invoicesID UNIQUE(id)
);

CREATE INDEX idx_invoices_projects ON dbo.invoices(projectsId);
CREATE INDEX idx_invoices_peopleUpdate ON dbo.invoices (updateByUserId);
CREATE INDEX idx_invoices_peopleCreate ON dbo.invoices (createdByUserId);
CREATE INDEX idx_invoices_companies ON dbo.invoices (companiesId);