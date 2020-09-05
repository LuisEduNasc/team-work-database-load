CREATE TABLE IF NOT EXISTS dbo.milestonesTasklists (
	milestonesId				INT NOT NULL,
	taskListsId					INT NOT NULL,
	CONSTRAINT PK_milestonesTasklists PRIMARY KEY (milestonesId, taskListsId),
	CONSTRAINT FK_milestonesTasklists_milestones FOREIGN KEY (milestonesId) REFERENCES dbo.milestones(milestonesId),
	CONSTRAINT FK_milestonesTasklists_taskLists FOREIGN KEY (taskListsId) REFERENCES dbo.taskLists(taskListsId)
);

CREATE INDEX idx_milestonesTasklists_milestones ON dbo.milestonesTasklists (milestonesId);
CREATE INDEX idx_milestonesTasklists_taskLists ON dbo.milestonesTasklists (taskListsId);
