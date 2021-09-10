import os, dotenv

if os.path.isfile('.env'):
    dotenv.load_dotenv()

host = "127.0.0.2"
