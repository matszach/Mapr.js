import os

for file in os.listdir():
	if file.endswith('.png'):
		print(f'\'assets/img/location_symbols/{file}\',')