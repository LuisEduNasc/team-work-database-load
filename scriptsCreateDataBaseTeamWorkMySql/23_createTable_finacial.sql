CREATE TABLE IF NOT EXISTS dbo.financial (
	financialid					INT NOT NULL AUTO_INCREMENT,
	duedate						VARCHAR(40)			NULL,
	competencedate				VARCHAR(40)			NULL,
	category					VARCHAR(1000)		NULL,
	description					VARCHAR(65500)		NULL,
	customersupplier			VARCHAR(65500)		NULL,
	amountreceived				NUMERIC(12,2)		NULL,
	amountpaid					NUMERIC(12,2)		NULL,
	balance						NUMERIC(12,2)		NULL,
	account						VARCHAR(500)		NULL,
	costcenter					VARCHAR(100)		NULL,
	originalvalue				NUMERIC(12,2)		NULL,
	interestfine				NUMERIC(12,2)		NULL,
	discountsfees				NUMERIC(12,2)		NULL,
	receiptpaymentdate			VARCHAR(40)			NULL,
	comments					VARCHAR(65500)		NULL,
	CONSTRAINT PK_financial PRIMARY KEY (financialid)
);

CREATE INDEX idx_financial_duedate ON dbo.financial(duedate);
CREATE INDEX idx_financial_competencedate ON dbo.financial(competencedate);
CREATE INDEX idx_financial_category ON dbo.financial(category);
CREATE INDEX idx_financial_costcenter ON dbo.financial(costcenter);
