# urban.design online platform

## Backend env: <br>

SECRET_KEY='django-secret-key' <br>
DEBUG=False <br>
FRONTEND_URL=https://frontend-url <br>
BACKEND_URL=https://backend-url <br>
DATABASE_NAME='dbName' <br>
DATABASE_USER='dbUsername' <br>
DATABASE_PASSWORD='dbPassword' <br>
DATABASE_HOST='dbHost' <br>
DATABASE_PORT='dbPort' <br>
DATABASE_SSLROOTCERT='if applicable db certification path to secret file' <br>
EMAIL_HOST_USER='email@FromWhereBackendEmailAreSent' <br>
EMAIL_HOST_PASSWORD='emailPassword' <br>
DEFAULT_FROM_EMAIL='email@FromWhereBackendEmailAreSent' <br>

### Root directory: <br>

./urban_design_backend <br>

### Build Command: <br>

`pip install -r requirements.txt && python manage.py collectstatic --no-input` <br>

### Run Command: <br>

`python manage.py makemigrations` (required everytime the models are modified) <br>
`python manage.py migrate` <br>

### Start Command: <br>

`gunicorn -w 2 urban_design_backend.wsgi:application` <br>

**gunicorn current parameters:** <br>

`--bind` (`-b`): <br>

Default: `127.0.0.1:8000` <br>
Description: The address and port Gunicorn will bind to. By default, it binds to localhost on port 8000. <br>

`--workers` (`-w`): <br>
Default: `1` <br>
Description: The number of worker processes for handling requests. Gunicorn defaults to a single worker process, which is suitable for development but not for production. <br>

`--timeout` (`-t`): <br>

Default: `30` seconds <br>
Description: Workers silent for more than this many seconds are killed and restarted. <br>

### Create super user: <br>

**In the backend console:** `python manage.py createsuperuser` <br>

### Deployment: <br>

Django Admin panel can be accessible from https://your.backend-domain.com/admin <br> <br>

## Frontend env: <br>

VITE_APP_BACKEND_URL=https://backend-url <br>

### install Command: <br>

`npm install` <br>
**Note:** Not every web service requires the installation command. <br>

### Build Command: <br>

`npm run build` <br>

### Output directory: <br>

./dist <br> <br>

## Database: <br>

- The database can be accessible from any machine with a Database Management System (DBMS) e.g. pgAdmin, DBeaver etc. <br>
- Database usually works with SQL or other similar languages. <br>
- In most cases, remote connection to the database requires the sources to be trusted (allow target IP address or all address `0.0.0.0/0` for public use) <br>
