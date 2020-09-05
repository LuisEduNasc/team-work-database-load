CREATE TABLE IF NOT EXISTS dbo.tasksCommentFollowers (
	tasksId				INT NOT NULL,
	peopleId			INT NOT NULL,
	CONSTRAINT PK_tasksCommentFollowers PRIMARY KEY (tasksId, peopleId),
	CONSTRAINT FK_tasksCommentFollowers_tasks FOREIGN KEY (tasksId) REFERENCES dbo.tasks(tasksId),
	CONSTRAINT FK_tasksCommentFollowers_people FOREIGN KEY (peopleId) REFERENCES dbo.people(peopleId)
);

CREATE INDEX idx_tasksCommentFollowers_tasks ON dbo.tasksCommentFollowers (tasksId);
CREATE INDEX idx_tasksCommentFollowers_people ON dbo.tasksCommentFollowers (peopleId);
