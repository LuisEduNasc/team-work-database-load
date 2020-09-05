CREATE TABLE IF NOT EXISTS dbo.tags (
	tagsId															INT  NOT NULL AUTO_INCREMENT,
	name															VARCHAR(500)			NULL,
	dateUpdated														VARCHAR(40)				NULL,
	id																VARCHAR(500)			NULL,
	dateCreated														VARCHAR(40)				NULL,
	projectId														VARCHAR(100)			NULL,
	color															VARCHAR(500)			NULL,
	CONSTRAINT PK_tags PRIMARY KEY (tagsId),
	CONSTRAINT UN_tagID UNIQUE(id)
);

CREATE INDEX idx_tags_name ON dbo.tags (name)
