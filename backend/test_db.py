print("Program started")

from sqlalchemy import create_engine, text

DATABASE_URL = "mysql+pymysql://root:Prashant%40kumar26%40@localhost:3306/hostel_matcher"

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT DATABASE();"))
        print("✅ Connected Successfully!")
        print(result.fetchone())
except Exception as e:
    print("❌ Connection Error:", e)

print("Program finished")