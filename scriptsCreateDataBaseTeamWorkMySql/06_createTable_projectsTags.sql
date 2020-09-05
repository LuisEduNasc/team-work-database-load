CREATE TABLE dbo.projectsTags (
	projectsId				INT NOT NULL,
	tagsId					INT NOT NULL,
	CONSTRAINT PK_projectsTags PRIMARY KEY (projectsId, tagsId),
	CONSTRAINT FK_projectsTags_projects FOREIGN KEY (projectsId) REFERENCES dbo.projects(projectsId),
	CONSTRAINT FK_projectsTags_tags FOREIGN KEY (tagsId) REFERENCES dbo.tags(tagsId)
);

CREATE INDEX idx_projectsTags_projects ON dbo.projectsTags (projectsId);
CREATE INDEX idx_projectsTags_tags ON dbo.projectsTags (tagsId);
