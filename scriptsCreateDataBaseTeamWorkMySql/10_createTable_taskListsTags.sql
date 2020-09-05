CREATE TABLE IF NOT EXISTS dbo.taskListsTags (
	taskListsId				INT NOT NULL,
	tagsId					INT NOT NULL,
	CONSTRAINT PK_taskListsTags PRIMARY KEY (taskListsId, tagsId),
	CONSTRAINT FK_taskListsTags_taskLists FOREIGN KEY (taskListsId) REFERENCES dbo.taskLists(taskListsId),
	CONSTRAINT FK_taskListsTags_tags FOREIGN KEY (tagsId) REFERENCES dbo.tags(tagsId)
);

CREATE INDEX idx_taskListsTags_taskLists ON dbo.taskListsTags (taskListsId);
CREATE INDEX idx_taskListsTags_tags ON dbo.taskListsTags (tagsId);
