import requests
import subprocess
import json

# 웹훅 URL
webhook_url = "https://meeting.ssafy.com/hooks/jn79takmfbbepnodq9ssbhr8iw"

# 에러 로그 패턴을 정의합니다. (예시)
error_pattern = "Caused by"

# 로그를 스트리밍하는 커맨드 정의 (Docker 컨테이너를 사용하는 경우)
container_id = "8428f6810b73"
stream_logs_cmd = f"docker logs -f {container_id}"

# 로그를 스트리밍하는 프로세스를 실행합니다.
process = subprocess.Popen(stream_logs_cmd.split(), stdout=subprocess.PIPE)

# 로그를 실시간으로 읽어 에러 패턴을 찾고, Mattermost에 알림을 전송합니다.
for line in iter(process.stdout.readline, b''):
    log_line = line.decode('utf-8')
    if error_pattern in log_line:
        payload = {
            "text": f"**Error detected**:\n```\n{log_line}\n```"
        }
        response = requests.post(webhook_url, data=json.dumps(payload), headers={"Content-Type": "application/json"})
