from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

url = URL.create(
    drivername="mysql+pymysql",
    username="root",
    password="Prashant@kumar26@",   # <-- Yahan ORIGINAL password
    host="localhost",
    port=3306,
    database="hostel_matcher",
)

engine = create_engine(url, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("SELECT DATABASE()"))
    print(result.fetchone())