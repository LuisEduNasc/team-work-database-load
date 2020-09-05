CREATE TABLE IF NOT EXISTS dbo.milestonesTags (
	milestonesId			INT NOT NULL,
	tagsId					INT NOT NULL,
	CONSTRAINT PK_milestonesTags PRIMARY KEY (milestonesId, tagsId),
	CONSTRAINT FK_milestonesTags_milestones FOREIGN KEY (milestonesId) REFERENCES dbo.milestones(milestonesId),
	CONSTRAINT FK_milestonesTags_tags FOREIGN KEY (tagsId) REFERENCES dbo.tags(tagsId)
);

CREATE INDEX idx_milestonesTags_milestones ON dbo.milestonesTags(milestonesId);
CREATE INDEX idx_milestonesTags_tags ON dbo.milestonesTags (tagsId);
