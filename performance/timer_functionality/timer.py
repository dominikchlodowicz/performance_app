import time

class Timer():
    def __init__(self, start_time=[0, 0, 0]) -> None:
        self.start_time = start_time
    
    @staticmethod
    def get_time():
        return f'That is the time {time.time()}'
    
    def stopwatch(self, stop=False):
        while True:
            if self.start_time[2] == 59:
                self.start_time[2] = 0
                self.start_time[1] = self.start_time[1] + 1
                time.sleep(1)
                continue
            elif self.start_time[1] == 59 and self.start_time[2] == 59:
                self.start_time[1] == 0
                self.start_time[2] == 0
                self.start_time[0] = self.start_time[0] + 1
            self.start_time[2] = self.start_time[2] + 1
            time.sleep(1)
    
    def start(self):
        self.stopwatch()
