import psycopg2

conn = psycopg2.connect(
    host="articles-dashboard.cr8eeq2k4s4r.eu-west-2.rds.amazonaws.com",
    port=5432,
    user="postgres",
    password="123PostGres!",
    database="articles-dashboard"
)
print("Connected!")
conn.close()