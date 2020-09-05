CREATE TABLE IF NOT EXISTS dbo.tasksTags (
	tasksId				INT NOT NULL,
	tagsId				INT NOT NULL,
	CONSTRAINT PK_tasksTags PRIMARY KEY (tasksId, tagsId),
	CONSTRAINT FK_tasksTags_tasks FOREIGN KEY (tasksId) REFERENCES dbo.tasks(tasksId),
	CONSTRAINT FK_tasksTags_tags FOREIGN KEY (tagsId) REFERENCES dbo.tags(tagsId)
);

CREATE INDEX idx_tasksTags_tasks ON dbo.tasksTags (tasksId);
CREATE INDEX idx_tasksTags_tags ON dbo.tasksTags (tagsId);
