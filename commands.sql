d7361sf5eg2hg4=> create table blogs (
d7361sf5eg2hg4(> id serial primary key,
d7361sf5eg2hg4(> author text,
d7361sf5eg2hg4(> url varchar not null,
d7361sf5eg2hg4(> title text not null,
d7361sf5eg2hg4(> likes integer default 0
d7361sf5eg2hg4(> );
d7361sf5eg2hg4=> insert into blogs (author, url, title, likes) values ( 'Mati Luukkainen', 'www.fullStackOpen.com/en', 'Full stack application course', 1000000);
INSERT 0 1
d7361sf5eg2hg4=> insert into blogs (author, url, title) values( 'Maxwell Ryan', 'https://www.apartmenttherapy.com/', 'Apartment therapy'); 
INSERT 0 1

