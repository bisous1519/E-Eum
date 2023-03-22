import requests
import subprocess
import json
import time
import datetime
import pytz
import logging

# 로그 파일 설정
logging.basicConfig(filename='bottle.log', level=logging.DEBUG)

# 웹훅 URL
url = "https://meeting.ssafy.com/hooks/dogefjnqrjf9zy1apf5b64ckxw"

# 에러 로그 패턴을 정의
error_pattern = "Caused by"

# 로그를 스트리밍하는 커맨드 정의 (Docker 컨테이너를 사용하는 경우)
stream_logs_cmd = f"sudo docker logs bottle"

before = 0

while True:
    time.sleep(3);
    process = subprocess.run(stream_logs_cmd, capture_output=True, text=True, shell=True)
    logs = process.stderr.splitlines()[::-1]

    if len(logs) == before:
        continue
    before = len(logs)
    log_text = ""
    
    for log_line in logs:
        #로그 덧붙이기
        log_text = log_line + "\n" + log_text

        # 한국 시간 존 이름
        KST = pytz.timezone('Asia/Seoul')

        # 현재 시간 구하기
        now = datetime.datetime.now(tz=KST)

        # 년, 월, 일, 시간, 분 출력하기
        time_str = now.strftime('%Y-%m-%d %H:%M')

        #로그 패턴 발견되면
        if error_pattern in log_line:
            #헤더, 데이터 설정
            headers = {'Content-Type': 'application/json'}
            data = {'text': f'__Bottle Server__ : @angly97\n```{time_str}```\n```\n{log_text}\n```'}

            curl_command = ['curl', '-i', '-X', 'POST', '-H']

            for k, v in headers.items():
                #발송
                curl_command.extend([f"{k}: {v}"])
                curl_command.extend(['-d', json.dumps(data), url])
                result = subprocess.run(curl_command, capture_output=True, text=True)
                logging.debug(time_str)
                logging.debug(result.stdout)

