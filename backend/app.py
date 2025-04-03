from flask import Flask, request, jsonify
from flask_cors import CORS
import nmap
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

scanner = nmap.PortScanner()

def determine_risk_level(open_ports):
    """Determine risk level based on open ports."""
    if len(open_ports) > 10:
        return "High"
    elif 5 <= len(open_ports) <= 10:
        return "Medium"
    else:
        return "Low"

@app.route('/scan', methods=['POST'])
def scan_network():
    try:
        data = request.json
        target = data.get("target", "").strip()

        if not target:
            return jsonify({"error": "Target is required"}), 400

        # Start scan time
        start_time = datetime.now()
        start_timestamp = start_time.strftime("%Y-%m-%d %H:%M:%S")

        # Run Nmap scan
        scan_start = time.time()
        scanner.scan(target, arguments="-T4 -F")  # Fast scan
        scan_end = time.time()

        # End scan time
        end_time = datetime.now()
        end_timestamp = end_time.strftime("%Y-%m-%d %H:%M:%S")

        duration = round(scan_end - scan_start, 2)  # Calculate scan duration

        results = {
            "target": target,
            "scan_start_time": start_timestamp,
            "scan_end_time": end_timestamp,
            "scan_duration": f"{duration} seconds",
            "tests_performed": "Fast Scan (-T4 -F)",
            "hosts": {}
        }

        open_ports = []

        for host in scanner.all_hosts():
            results["hosts"][host] = {
                "hostname": scanner[host].hostname(),
                "state": scanner[host].state(),
                "ports": []
            }

            for proto in scanner[host].all_protocols():
                ports = scanner[host][proto].keys()
                for port in ports:
                    port_info = {
                        "port": port,
                        "state": scanner[host][proto][port]["state"],
                        "service": scanner[host][proto][port]["name"]
                    }
                    results["hosts"][host]["ports"].append(port_info)

                    if port_info["state"] == "open":
                        open_ports.append(port)

        # Determine overall risk level
        results["overall_risk_level"] = determine_risk_level(open_ports)

        return jsonify(results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
