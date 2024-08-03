-- CREATE DATABASE CRUD
CREATE DATABASE crud;

-- CREATE TABLE USER
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user') THEN
        CREATE TABLE public.user (
            id SERIAL PRIMARY KEY,
			username VARCHAR(32) NOT NULL, 
			password VARCHAR(50) NOT NULL, 
			email VARCHAR(32) NULL
		);
    ELSE
        RAISE NOTICE 'La tabla user ya existe.';
    END IF;
END $$;

-- CREATE TABLE CLIENTS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'clients') THEN
        CREATE TABLE clients (
            id SERIAL PRIMARY KEY,
			nit BIGINT NOT NULL, 
            business_name VARCHAR (100) NOT NULL, 
            email VARCHAR(50) NULL, 
            phone BIGINT NULL, 
            status BOOLEAN NOT NULL,
            created_by BIGINT NOT NULL
		);
    ELSE
        RAISE NOTICE 'La tabla clients ya existe.';
    END IF;
END $$;

-- CREATE USER
CREATE OR REPLACE FUNCTION create_user(p_username VARCHAR(32), p_password VARCHAR(50), p_email VARCHAR(32))
RETURNS TABLE (ret_username VARCHAR(32), ret_password VARCHAR(50), ret_email VARCHAR(32)) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO public.user (username, password, email)
    VALUES (p_username, p_password, p_email)
    RETURNING username AS ret_username, password AS ret_password, email AS ret_email;
END;
$$ LANGUAGE plpgsql;

-- AUTHENTICATE USER
CREATE OR REPLACE FUNCTION authenticate_user(_username VARCHAR, _password VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    stored_password VARCHAR;
BEGIN
    SELECT password INTO stored_password
    FROM public.user
    WHERE username = _username;

    IF stored_password = _password THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- GET CLIENTS
CREATE OR REPLACE FUNCTION get_clients()
RETURNS TABLE (id INTEGER, nit BIGINT, business_name VARCHAR(100), email VARCHAR(50), phone BIGINT, status BOOLEAN, username VARCHAR(32)) AS $$
BEGIN
    RETURN QUERY 
		SELECT 
			cl.id,
			cl.nit,
			cl.business_name,
			cl.email,
			cl.phone,
			cl.status,
			u.username
		FROM clients cl 
		LEFT JOIN public.user u ON u.id = cl.created_by;
END;
$$ LANGUAGE plpgsql;

-- CREATE CLIENT
CREATE OR REPLACE FUNCTION create_client(p_nit BIGINT, p_business_name VARCHAR(100), p_email VARCHAR(50), p_phone BIGINT, p_created_by BIGINT)
RETURNS TABLE (ret_nit BIGINT, ret_business_name VARCHAR(100), ret_email VARCHAR(50), ret_phone BIGINT, ret_created_by BIGINT) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO clients (nit, business_name, email, phone, status, created_by)
    VALUES (p_nit, p_business_name, p_email, p_phone, true, p_created_by)
    RETURNING nit AS ret_nit, business_name AS ret_business_name, email AS ret_email, phone AS ret_phone, created_by AS ret_created_by;
END;
$$ LANGUAGE plpgsql;

-- UPDATE CLIENT
CREATE OR REPLACE FUNCTION update_client(p_client_id INTEGER, p_nit BIGINT, p_business_name VARCHAR(100), p_email VARCHAR(50), p_phone BIGINT, p_status BOOLEAN)
RETURNS TABLE (ret_nit BIGINT, ret_business_name VARCHAR(100), ret_email VARCHAR(50), ret_phone BIGINT, ret_status BOOLEAN) AS $$
BEGIN
    RETURN QUERY
	UPDATE clients 
    SET nit = p_nit, 
		business_name = p_business_name, 
		email = p_email, 
		phone = p_phone, 
		status = p_status
	WHERE id = p_client_id
    RETURNING nit AS ret_nit, business_name AS ret_business_name, email AS ret_email, phone AS ret_phone, status AS ret_status;
END;
$$ LANGUAGE plpgsql;

-- GET CLIENT BY NIT
CREATE OR REPLACE FUNCTION get_client_by_nit(_nit VARCHAR)
RETURNS TABLE (client_id INT, created_at TIMESTAMP, nit VARCHAR, business_name VARCHAR, email VARCHAR, phone VARCHAR, created_by INT, status VARCHAR) AS $$
BEGIN
    RETURN QUERY SELECT * FROM clients WHERE nit = _nit;
END;
$$ LANGUAGE plpgsql;

-- DELETE CLIENT 
CREATE OR REPLACE FUNCTION delete_client(client_id BIGINT)
RETURNS TEXT
AS $$
DECLARE
    cliente_eliminado RECORD;
BEGIN
    DELETE FROM clients
    WHERE id = client_id
    RETURNING business_name INTO cliente_eliminado;

    RETURN 'SE ELIMINÓ EL CLIENTE ' || cliente_eliminado.business_name;
END;
$$ LANGUAGE plpgsql;
