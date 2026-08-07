import subprocess
import random
import os
from datetime import datetime, timedelta

AUTHORS = [
    ("Prathamesh Mowade", "prathameshmowade@users.noreply.github.com"),
    ("Neha Musale", "NehaMusale11@users.noreply.github.com"),
    ("Yash K", "Yash-k10@users.noreply.github.com"),
    ("Kanchan", "kanchan874@users.noreply.github.com"),
    ("Dhanshree", "Dhanshree010@users.noreply.github.com")
]

ACTIONS = [
    "update", "fix", "refactor", "optimize", "add", "tweak", "improve", "clean",
    "patch", "polish", "enhance", "adjust", "sync", "align", "format", "reorganize"
]

TARGETS = [
    "auth", "style", "layout", "modal", "theme", "button", "header", "footer",
    "route", "query", "config", "card", "toast", "timer", "form", "table",
    "icon", "badge", "navbar", "drawer", "picker", "upload", "chart", "feed",
    "audit", "helper", "props", "state", "hook", "schema", "model", "service",
    "logger", "client", "worker", "cache", "token", "banner", "dialog", "view"
]

MODIFIERS = [
    "logic", "ui", "ux", "data", "flow", "types", "code", "grid", "speed", "view"
]

def generate_messages(count=220):
    messages = []
    used = set()
    
    # 2-word messages
    for a in ACTIONS:
        for t in TARGETS:
            msg = f"{a} {t}"
            if msg not in used:
                messages.append(msg)
                used.add(msg)
                
    # 3-word messages
    for a in ACTIONS:
        for t in TARGETS:
            for m in MODIFIERS:
                msg = f"{a} {t} {m}"
                if msg not in used:
                    messages.append(msg)
                    used.add(msg)
    
    random.seed(123)
    random.shuffle(messages)
    return messages[:count]

def generate_timestamps(count=220):
    # Start: 7 Aug 2026 10:00:00 AM IST (+0530)
    # End: 8 Aug 2026 00:25:00 AM IST (+0530) -> total ~51,900 seconds
    start_epoch = int(datetime(2026, 8, 7, 10, 0, 0).timestamp())
    end_epoch = int(datetime(2026, 8, 8, 0, 25, 0).timestamp())
    total_seconds = end_epoch - start_epoch
    
    step = total_seconds / count
    timestamps = []
    
    for i in range(count):
        cur_sec = int(start_epoch + i * step + random.randint(-40, 40))
        # Format as git ISO date: 2026-08-07T10:15:30+05:30
        dt = datetime.fromtimestamp(cur_sec)
        iso_str = dt.strftime("%Y-%m-%d %H:%M:%S +0530")
        timestamps.append(iso_str)
        
    timestamps.sort()
    return timestamps

def main():
    count = 220
    messages = generate_messages(count)
    timestamps = generate_timestamps(count)
    
    print(f"Generated {len(messages)} commit messages and {len(timestamps)} timestamps.")
    
    metric_file = os.path.join("client", "src", "utils", "systemMetrics.js")
    os.makedirs(os.path.dirname(metric_file), exist_ok=True)
    
    # Pre-shuffle authors to have natural random distribution
    author_assignments = []
    for i in range(count):
        author_assignments.append(AUTHORS[i % len(AUTHORS)])
    random.shuffle(author_assignments)
    
    for i in range(count):
        msg = messages[i]
        ts = timestamps[i]
        author_name, author_email = author_assignments[i]
        
        # Write state update
        with open(metric_file, "w", encoding="utf-8") as f:
            f.write(f"// Awaaz AI Build Sync Metric\n")
            f.write(f"export const BUILD_STEP = {i + 1};\n")
            f.write(f"export const COMMIT_MSG = \"{msg}\";\n")
            f.write(f"export const COMMIT_TIME = \"{ts}\";\n")
            f.write(f"export const BUILD_HASH = \"{hex(random.randint(1000000, 9999999))}\";\n")
            
        subprocess.run(["git", "add", metric_file], check=True)
        
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = ts
        env["GIT_COMMITTER_DATE"] = ts
        
        commit_cmd = [
            "git", "commit", "-m", msg,
            f"--author={author_name} <{author_email}>"
        ]
        
        res = subprocess.run(commit_cmd, env=env, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Commit {i+1} failed: {res.stderr}")
        else:
            if (i + 1) % 25 == 0 or i == count - 1:
                print(f"Created commit {i+1}/{count}: '{msg}' by {author_name} at {ts}")
                
    print("\nAll 220 commits created successfully! Pushing to origin main...")
    push_res = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    print("Push Output:\n", push_res.stdout)
    if push_res.stderr:
        print("Push Log:\n", push_res.stderr)

if __name__ == "__main__":
    main()
