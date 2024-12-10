from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import psutil
import platform
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

def get_system_data():
    try:
        cpu_temperature = psutil.sensors_temperatures().get('coretemp', [{}])[0].get('current', "N/A")
    except Exception as e:
        cpu_temperature = "N/A" 

    system_info = {
        "time": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "python_version": platform.python_version(),
        "battery_status": psutil.sensors_battery().percent if psutil.sensors_battery() else "N/A",
        "cpu_temperature": cpu_temperature,
        "cpu_usage": psutil.cpu_percent(interval=1),
        "ram_usage": psutil.virtual_memory().percent,
        "gpu_usage": "N/A",  
        "location": get_location(),
    }
    return system_info

def get_location():
    try:
        ip_info = requests.get('https://ipinfo.io').json()
        location = ip_info.get('city', 'Unknown') + ", " + ip_info.get('country', 'Unknown')
        return location
    except:
        return "Unable to fetch location"

@app.get("/system_data")
def read_system_data():
    return get_system_data()
