CREATE TABLE IF NOT EXISTS dbo.taskLists (
	taskListsId												INT NOT NULL AUTO_INCREMENT,
	id														VARCHAR(100)			NULL,
	name													VARCHAR(500)			NULL,
	description												VARCHAR(65500)			NULL,
	position												INT						NULL,
	projectName												VARCHAR(500)			NULL,
	lastUpdate												VARCHAR(40)				NULL,
	private													BOOLEAN				NOT NULL,
	isTemplate												BOOLEAN				NOT NULL,
	pinned													BOOLEAN				NOT NULL,
	complete												BOOLEAN				NOT NULL,
	uncompletedCount										INT						NULL,
	status													VARCHAR(100)			NULL,
	projectsId												INT						NULL,
	milestonesId											INT						NULL,
	CONSTRAINT PK_taskLists PRIMARY KEY (taskListsId),
	CONSTRAINT FK_taskLists_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_taskLists_milestones FOREIGN KEY (milestonesId) REFERENCES dbo.milestones(milestonesId),
	CONSTRAINT UN_taskListsID UNIQUE(id)
);

CREATE INDEX idx_taskLists_projects ON dbo.taskLists(projectsId);
CREATE INDEX idx_taskLists_milestones ON dbo.taskLists(milestonesId);
