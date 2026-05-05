CREATE TABLE new_table(
    id int AUTO_INCREMENT PRIMARY KEY,
    label_alias VARCHAR(255),
    label_code INTEGER,
    companies VARCHAR(255)
);

LOAD DATA INFILE 'src/main/resources/Labels With Headers.csv'
    INTO TABLE new_table
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;