CREATE TABLE IF NOT EXISTS dbo.milestones (
	milestonesId												INT  NOT NULL AUTO_INCREMENT,
	canComplete													BOOLEAN				NOT NULL,
	responsiblePartyId											VARCHAR(500)			NULL,
	responsiblePartyFullNames									VARCHAR(500)			NULL,
	responsiblePartyNames										VARCHAR(500)			NULL,
	private														BOOLEAN				NOT NULL,
	userFollowingComments										BOOLEAN				NOT NULL,
	commentsCount												INT						NULL,
	completedOn													VARCHAR(40)				NULL,
	status														VARCHAR(100)			NULL,
	changeFollowersIds											VARCHAR(500)			NULL,
	createdOn													VARCHAR(40)				NULL,
	canEdit														BOOLEAN				NOT NULL,
	responsiblePartyType										VARCHAR(100)			NULL,
	isPrivate													BOOLEAN				NOT NULL,
	companyName													VARCHAR(500)			NULL,
	id															VARCHAR(100)			NULL,
	lastChangeOn												VARCHAR(40)				NULL,
	commentFollowerIds											VARCHAR(500)			NULL,
	completed													BOOLEAN				NOT NULL,
	responsiblePartyIds											VARCHAR(100)			NULL,
	reminder													VARCHAR(100)			NULL,
	userFollowingChanges										BOOLEAN				NOT NULL,
	description													VARCHAR(65535)			NULL,
	responsiblePartyFirstName									VARCHAR(100)			NULL,
	completerFirstName											VARCHAR(100)			NULL,
	responsiblePartyLastName									VARCHAR(100)			NULL,
	dueDateOffset												VARCHAR(100)			NULL,
	completerLastName											VARCHAR(100)			NULL,
	deadLine													VARCHAR(40)				NULL,
	title														VARCHAR(100)			NULL,
	companiesId													INT						NULL,
	creatorId													INT						NULL,
	completerId													INT						NULL,
	projectsId													INT						NULL,
	CONSTRAINT PK_milestones PRIMARY KEY (milestonesId),
	CONSTRAINT FK_milestones_companies FOREIGN KEY (companiesId) REFERENCES dbo.companies(companiesId),
	CONSTRAINT FK_milestones_people FOREIGN KEY (creatorId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_milestones_peopleCompleter FOREIGN KEY (completerId) REFERENCES dbo.people(peopleId),
	CONSTRAINT FK_milestones_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT UN_milestonesID UNIQUE(id)
);

CREATE INDEX idx_milestones_companies ON dbo.milestones(companiesId);
CREATE INDEX idx_milestones_people ON dbo.milestones(creatorId);
CREATE INDEX idx_milestones_peopleCompleter ON dbo.milestones(completerId);
CREATE INDEX idx_milestones_projects ON dbo.milestones(projectsId);
