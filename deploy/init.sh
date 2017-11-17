# sudo yum install -q postgresql-server postgresql-contrib
yum install postgresql10-server postgresql10
# sudo postgresql-setup initdb
sudo /usr/pgsql-10/bin/postgresql-10-setup initdb
# sudo vi /var/lib/pgsql/10/data/pg_hba.conf
#   change binding ip to 0.0.0.0/0
# sudo vi /var/lib/pgsql/10/data/postgresql.conf
#   change listen to *
sudo systemctl start postgresql-10.service
sudo systemctl enable postgresql-10.service

sudo -i -u postgres

createuser -PE user
createdb -O user iwap
createdb -O user iwap-test
# psql >
# GRANT ALL ON DATABASE iwap TO "user";
# GRANT ALL ON DATABASE "iwap-test" TO "user";
exit
