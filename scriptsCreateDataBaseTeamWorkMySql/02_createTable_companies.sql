CREATE TABLE IF NOT EXISTS dbo.companies (
	companiesId														INT  NOT NULL AUTO_INCREMENT,
	state															VARCHAR(500)			NULL,
	emailOne														VARCHAR(500)			NULL,
	emailTwo														VARCHAR(500)			NULL,
	emailThree														VARCHAR(500)			NULL,
	contacts														VARCHAR(2)				NULL,
	website															VARCHAR(500)			NULL,
	logoUrl															VARCHAR(2083)			NULL,
	cid																VARCHAR(500)			NULL,
	phone															VARCHAR(200)			NULL,
	createdOn														VARCHAR(30)				NULL,
	accounts														VARCHAR(100)			NULL,
	companyNameUrl													VARCHAR(2083)			NULL,
	canSeePrivate													BOOLEAN					NULL,
	zip																VARCHAR(20)				NULL,
	industryId														VARCHAR(100)			NULL,
	id																VARCHAR(500)			NULL,
	lastChangeOn													VARCHAR(30)				NULL,
	fax																VARCHAR(100)			NULL,
	addressTwo														VARCHAR(500)			NULL,
	name															VARCHAR(500)			NULL,
	country															VARCHAR(500)			NULL,
	isOwner															VARCHAR(100)			NULL,
	industry														VARCHAR(500)			NULL,
	addressOne														VARCHAR(500)			NULL,
	countryCode														VARCHAR(10)				NULL,
	collaborators													VARCHAR(100)			NULL,
	city															VARCHAR(500)			NULL,
	CONSTRAINT PK_companies PRIMARY KEY (companiesId),
	CONSTRAINT UN_companiesID UNIQUE(id)
);

CREATE INDEX idx_companies_country ON dbo.companies (country);
CREATE INDEX idx_companies_name ON dbo.companies (name);

