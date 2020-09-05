CREATE TABLE IF NOT EXISTS dbo.tasksResponsibleParty (
	tasksId				INT NOT NULL,
	peopleId			INT NOT NULL,
	CONSTRAINT PK_tasksResponsibleParty PRIMARY KEY (tasksId, peopleId),
	CONSTRAINT FK_tasksResponsibleParty_tasks FOREIGN KEY (tasksId) REFERENCES dbo.tasks(tasksId),
	CONSTRAINT FK_tasksResponsibleParty_people FOREIGN KEY (peopleId) REFERENCES dbo.people(peopleId)
);

CREATE INDEX idx_tasksResponsibleParty_tasks ON dbo.tasksResponsibleParty (tasksId);
CREATE INDEX idx_tasksResponsibleParty_people ON dbo.tasksResponsibleParty (peopleId);
