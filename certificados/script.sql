SELECT l.nome, l.cpf, i.email, COUNT(l.cpf)  AS qtd
	FROM listapresenca AS l
	INNER JOIN inscricao AS i ON l.cpf = i.cpf
	WHERE l.cpf IN (SELECT cpf FROM inscricao)	
	GROUP BY l.cpf, l.nome, i.email
	HAVING COUNT(l.cpf) >= 10
