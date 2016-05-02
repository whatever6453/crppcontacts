UPDATE
	crppcontacts_contact
SET
	first_name = trim(substring(name from 0 for position(' ' in name))),
	last_name = trim(substring(name from position(' ' in name)+1 for char_length(name)))
WHERE
	trim(first_name) = '';