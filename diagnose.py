import sys
import subprocess
import socket
import os

def check_port(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', port))
    sock.close()
    return result == 0

def main():
    with open('diagnosis.txt', 'w', encoding='utf-8') as f:
        f.write(f"Python Executable: {sys.executable}\n")
        f.write(f"Python Version: {sys.version}\n")
        f.write(f"CWD: {os.getcwd()}\n")
        
        f.write("\nInstalled Packages:\n")
        try:
            result = subprocess.run([sys.executable, "-m", "pip", "list"], capture_output=True, text=True)
            f.write(result.stdout)
            if result.stderr:
                f.write(f"\nStderr:\n{result.stderr}\n")
        except Exception as e:
            f.write(f"Error listing packages: {e}\n")
            
        f.write(f"\nPort 8000 Open: {check_port(8000)}\n")

if __name__ == "__main__":
    main()
