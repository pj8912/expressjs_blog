CREATE TABLE blog;

CREATE TABLE blogs(
    id int auto_increment primary key not null,
                    title VARCHAR(60) not null,
                    img_url TEXT not null,
                    description VARCHAR(100) not null,
                    created_at TIMESTAMP default CURRENT_TIMESTAMP
                
)

