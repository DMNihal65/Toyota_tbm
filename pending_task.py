import requests
from datetime import datetime, timedelta, date

host = "localhost"
port = "5051"

today = datetime.now()
if today.isoweekday() == 1:
    yesterday = today-timedelta(days=2)
else:
    yesterday = today-timedelta(days=1)


y_weekd = yesterday.isoweekday()
y_y = yesterday.year
y_m = yesterday.month
y_d = yesterday.day
y_weekNo = (y_d//7.1)+1

weekd = datetime.now().isoweekday()
y = datetime.now().year
m = datetime.now().month
d = datetime.now().day
# to fetch week no.
weekNo = (d//7.1)+1

# Get the API endpoint URLs and query parameters
machine_list_url = f"http://{host}:{port}/head/headMachineList?d=" + \
    str(y_weekd)+"&y="+str(y_y)+"&w="+str(y_weekNo)+"&m="+str(y_m)+"&pS=P"
daily_status_url = f"http://{host}:{port}/dailyStatus?entryFor=" + \
    str(y_y)+"-"+str(y_m)+"-"+str(y_d)+"&pS=P"


machines = []
data={}

# Make a GET request to the machine list API endpoint with the specified query parameters
response = requests.get(machine_list_url, params={})

# Check if the machine list request was successful (status code 200)
if response.status_code == 201:
    # Parse the response JSON to retrieve the list of machines
    data = response.json()['machineData']
    print(data)
    for datum in data:
        machines.extend(datum['processNos'])
    # Do something with the list of machines, for example print them
    
    print(len(machines))
else:
    # Handle error response
    print(f"Error: {response.status_code} - {response.text}")

# Make a GET request to the daily status API endpoint with the specified query parameters
response = requests.get(daily_status_url, params={})
# Check if the daily status request was successful (status code 200)
if response.status_code == 201:
    # Parse the response JSON to retrieve the daily status data
   
    data == response.json()


else:
    # Handle error response
    print(f"Error: {response.status_code} - {response.text}")
