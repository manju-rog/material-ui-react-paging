BEGIN
    EXECUTE IMMEDIATE 'CREATE SEQUENCE smart_seq START WITH 1 INCREMENT BY 1';
    
    EXECUTE IMMEDIATE 'CREATE TABLE smart_entities (
        id NUMBER PRIMARY KEY,
        entity_name VARCHAR2(100) NOT NULL,
        created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
        payload CLOB
    )';
    
    -- Insert 100,000 sample records
    FOR i IN 1..100000 LOOP
        INSERT INTO smart_entities (id, entity_name, payload)
        VALUES (smart_seq.NEXTVAL, 'Entity-' || i, RPAD('X', 1000, 'X'));
    END LOOP;
    
    COMMIT;
END;
/