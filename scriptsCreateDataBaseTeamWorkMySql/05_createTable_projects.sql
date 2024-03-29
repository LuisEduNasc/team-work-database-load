CREATE TABLE IF NOT EXISTS dbo.projects (
	projectsId														INT  NOT NULL AUTO_INCREMENT,
	archivedByUserId												VARCHAR(100)			NULL,
	archivedByUserName												VARCHAR(500)			NULL,
	createdOn														VARCHAR(40)				NULL,
	dateArchived													VARCHAR(40)				NULL,
	defaultPrivacy													VARCHAR(100)			NULL,
	description														VARCHAR(65535)			NULL,
	endDate															VARCHAR(40)				NULL,
	filesAutoNewVersion												BOOLEAN				NOT	NULL,
	harvestTimersEnabled											BOOLEAN				NOT	NULL,
	id																VARCHAR(100)			NULL,
	isOnBoardingProject												BOOLEAN				NOT NULL,
	isProjectAdmin													BOOLEAN				NOT NULL,
	isSampleProject													BOOLEAN				NOT NULL,
	lastChangedOn													VARCHAR(40)				NULL,
	logo															VARCHAR(2083)			NULL,
	logoFromCompany													BOOLEAN					NULL,
	name															VARCHAR(1000)			NULL,
	notifyeveryone													BOOLEAN				NOT NULL,
	overviewStartPage												VARCHAR(2000)			NULL,
	privacyEnabled													BOOLEAN				NOT NULL,
	replyByEmailEnabled												BOOLEAN				NOT NULL,
	showAnnouncement												BOOLEAN				NOT NULL,
	starred															BOOLEAN				NOT NULL,
	startDate														VARCHAR(40)				NULL,
	startPage														VARCHAR(2083)			NULL,
	status															VARCHAR(100)			NULL,
	subStatus														VARCHAR(100)			NULL,
	tasksStartPage													VARCHAR(2083)			NULL,
	ownerfullname													VARCHAR(200)			NULL,
	categoriesId													INT						NULL,
	companiesId														INT						NULL,
	ownerId															INT						NULL,
	CONSTRAINT PK_projects PRIMARY KEY (projectsId),
	CONSTRAINT FK_projects_categories FOREIGN KEY (categoriesId) REFERENCES dbo.categories(categoriesId),
	CONSTRAINT FK_projects_companies FOREIGN KEY (companiesId) REFERENCES dbo.companies(companiesId),
	CONSTRAINT FK_projects_peopleOwner FOREIGN KEY (ownerId) REFERENCES dbo.people(peopleId),
	CONSTRAINT UN_projectID UNIQUE(id)
);

CREATE INDEX idx_projects_categories ON dbo.projects(categoriesId);
CREATE INDEX idx_projects_companies ON dbo.projects(companiesId);
CREATE INDEX idx_projects_name ON dbo.projects (name);
CREATE INDEX idx_projects_peopleOwner ON dbo.projects (ownerId);
