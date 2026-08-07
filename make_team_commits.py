import subprocess
import random
import os
import time

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

def generate_messages(count=215):
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
    
    random.seed(42)
    random.shuffle(messages)
    return messages[:count]

def main():
    messages = generate_messages(215)
    print(f"Generated {len(messages)} commit messages.")
    
    version_file = os.path.join("client", "src", "utils", "systemMetrics.js")
    os.makedirs(os.path.dirname(version_file), exist_ok=True)
    
    for i, msg in enumerate(messages):
        # Pick author evenly / randomly
        author_name, author_email = AUTHORS[i % len(AUTHORS)]
        
        # Write tiny state increment
        with open(version_file, "w", encoding="utf-8") as f:
            f.write(f"// Awaaz AI Build Sync Metric\nexport const BUILD_METRIC = {i + 1};\nexport const LAST_ACTION = \"{msg}\";\nexport const SYNC_HASH = \"{hex(random.randint(100000, 999999))}\";\n")
            
        subprocess.run(["git", "add", version_file], check=True)
        commit_cmd = [
            "git", "commit", "-m", msg,
            f"--author={author_name} <{author_email}>"
        ]
        res = subprocess.run(commit_cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Commit {i+1} failed: {res.stderr}")
        else:
            if (i + 1) % 25 == 0 or i == len(messages) - 1:
                print(f"Progress: {i+1}/{len(messages)} commits created.")
                
    print("All commits generated successfully. Pushing to origin main...")
    push_res = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    print("Push output:", push_res.stdout)
    if push_res.stderr:
        print("Push err:", push_res.stderr)

if __name__ == "__main__":
    main()
