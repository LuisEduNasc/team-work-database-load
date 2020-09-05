CREATE TABLE IF NOT EXISTS dbo.sporadicAlignment (
	sporadicAlignmentId				INT NOT NULL AUTO_INCREMENT,
	createdAt						VARCHAR(40)			NULL,
	emailEvaluator					VARCHAR(500)		NULL,
	fillDate						VARCHAR(40)			NULL,
	emailEvaluated					VARCHAR(500)    	NULL,
    comments						text				NULL,
    classification					char(3)				NULL,
	CONSTRAINT PK_sporadicAlignment PRIMARY KEY (sporadicAlignmentId)
);

