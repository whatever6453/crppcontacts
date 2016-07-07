start transaction;
delete from crppcontacts_contact;
insert into crppcontacts_contact
(name, first_name, last_name, organization, position, department, email1, email2, telephone, mobile1, mobile2, country, state, city, street, zip_code, website)
values
('Mary', 'Poppins', 'Nannys Inc', 'Director', 'Childcare', 'poppins@example.com', 'mary@example.com', '+44 1123 4567', '+44 1987 6543', '+44 1876 5432', 'United Kingdom', 'Greater London', 'London', '17 Cherry Tree Lane', 'SE1', 'http://marypoppins.example.com/')
,('Clark', 'Kent', 'Superman Corp', 'Superhero', 'Villain Control Department', 'superman@example.com', 'clark.kent@example.com', '+1 555 2123 4567', '+1 555 2987 6543', '+1 555 2876 5432', 'United States of America', 'Some State', 'Metropolis', '344 Clinton Street', '00000', 'http://superman.example.com/')
,('Peter', 'Pan', 'Lost Boys', 'Leader', 'Fairy Section', 'peter.pan@example.com', 'peter@example.com', '+1 555 3123 4567', '+1 555 3987 6543', '+1 555 3876 5432', 'Neverland Island', 'Neverland State', 'Mermaid Lagoon', 'Rock pool', '00000', 'http://peterpan.example.com/')
;
delete from crppcontacts_tag;
insert into crppcontacts_tag
(name)
values
('Female')
,('Male')
,('Everyone')
;
delete from crppcontacts_contact_tags;
insert into crppcontacts_contact_tags
(contact_id, tag_id)
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Kent' and t.name='Everyone'
union
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Pan' and t.name='Everyone'
union
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Poppins' and t.name='Everyone'
union
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Kent' and t.name='Male'
union
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Pan' and t.name='Male'
union
select c.id, t.id from crppcontacts_contact c, crppcontacts_tag t where c.last_name='Poppins' and t.name='Female'
;
commit;
