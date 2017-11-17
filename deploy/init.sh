sudo yum install -q postgresql-server postgresql-contrib
sudo postgresql-setup initdb
# sudo vi /var/lib/pgsql/data/pg_hba.conf
#   change binding ip to 0.0.0.0/0
# sudo vi/var/lib/pgsql/data/postgresql.conf
#   change listen to *
sudo systemctl start postgresql
sudo systemctl enable postgresql

sudo -i -u postgres

createuser -PE user
createdb -O user iwap
createdb -O user iwap-test
# psql >
# GRANT ALL ON DATABASE iwap TO "user";
# GRANT ALL ON DATABASE "iwap-test" TO "user";
exit
