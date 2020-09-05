CREATE TABLE IF NOT EXISTS dbo.evaluationLeader (
	evaluationLeaderId				INT NOT NULL AUTO_INCREMENT,
	createdAt						VARCHAR(40)			NULL,
	emailEvaluator					VARCHAR(500)		NULL,
	fillDate						VARCHAR(40)			NULL,
	emailEvaluated					VARCHAR(500)    	NULL,
    courage							CHAR(3)				NULL,
    determination					CHAR(3)				NULL,
    inovation						CHAR(3)				NULL,
    agility							CHAR(3)				NULL,
    collaboration					CHAR(3)				NULL,
    leadership						CHAR(3)				NULL,
    comments						TEXT				NULL,
    classification					CHAR(3)				NULL,
	CONSTRAINT PK_evaluationLeader PRIMARY KEY (evaluationLeaderId)
);

