CREATE TABLE IF NOT EXISTS dbo.evaluationChapter (
	evaluationchapterId				INT NOT NULL AUTO_INCREMENT,
	createdAt						VARCHAR(40)			NULL,
	emailEvaluator					VARCHAR(500)		NULL,
	fillDate						VARCHAR(40)			NULL,
	emailEvaluated					VARCHAR(500)    	NULL,
    analyticalAbility				CHAR(3)				NULL,
    technicalProeficience			CHAR(3)				NULL,
    organization					CHAR(3)				NULL,
    coaching						CHAR(3)				NULL,
    teamWork						CHAR(3)				NULL,
    customerService					CHAR(3)				NULL,
    comments						text				NULL,
    classification					CHAR(3)				NULL,
	CONSTRAINT PK_evaluationChapter PRIMARY KEY (evaluationchapterId)
);