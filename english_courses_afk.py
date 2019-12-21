import pyautogui, time, random

c = 1
while True:
	print(f"({c}) ", end = "")
	for i in range(5):
		print(f"{i + 1}...", end = "", flush = True)
		time.sleep(1)
	pyautogui.scroll(random.randint(-400, 400))
	print()
	c += 1