
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import google.generativeai as genai
import os
import json

app = Flask(__name__, static_folder='.')
CORS(app)

# Configure the Gemini API using the environment variable
api_key = os.environ.get("API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Mock credentials for MarketMind AI Demo
MOCK_USER = {
    "username": "admin",
    "password": "1234",
    "role": "Chief Strategist"
}

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == MOCK_USER["username"] and password == MOCK_USER["password"]:
        return jsonify({
            "success": True,
            "user": {
                "username": MOCK_USER["username"],
                "role": MOCK_USER["role"]
            }
        })
    else:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

@app.route('/api/campaign', methods=['POST'])
def generate_campaign():
    try:
        data = request.json
        product = data.get('product')
        audience = data.get('audience')
        platform = data.get('platform')
        model = genai.GenerativeModel('gemini-3-flash-preview')
        prompt = f"Generate a detailed marketing campaign for {product} targetting {audience} for {platform}. Return as JSON."
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return jsonify(json.loads(response.text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/pitch', methods=['POST'])
def generate_pitch():
    try:
        data = request.json
        product = data.get('product')
        persona = data.get('persona')
        industry = data.get('industry')
        model = genai.GenerativeModel('gemini-3-pro-preview')
        prompt = f"Craft a professional B2B sales pitch for {product} to {persona} in {industry}. Return as JSON."
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return jsonify(json.loads(response.text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/score-lead', methods=['POST'])
def score_lead():
    try:
        data = request.json
        name = data.get('name')
        budget = data.get('budget')
        need = data.get('need')
        urgency = data.get('urgency')
        model = genai.GenerativeModel('gemini-3-pro-preview')
        prompt = f"Analyze and score lead {name} with budget {budget}, need {need}, urgency {urgency}. Return as JSON."
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return jsonify(json.loads(response.text))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
