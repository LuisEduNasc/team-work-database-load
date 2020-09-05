CREATE TABLE IF NOT EXISTS dbo.categories (
	categoriesId													INT  NOT NULL AUTO_INCREMENT,
	parentId														VARCHAR(500)			NULL,
	name  															VARCHAR(500)			NULL,
	count															VARCHAR(100)			NULL,
	elementsCount													VARCHAR(100)			NULL,
	id																VARCHAR(100)			NULL,
	color															VARCHAR(100)			NULL,
	type															VARCHAR(100)			NULL,
	CONSTRAINT PK_categories PRIMARY KEY (categoriesId),
	CONSTRAINT UN_categoryID UNIQUE(id)
);
