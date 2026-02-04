from flask import Flask, render_template, jsonify
import requests  # correct separate import

app = Flask(__name__)

PAYSTACK_SECRET_KEY = "sk_test_xxxxxxxx"
PAYSTACK_INIT_URL = "https://api.paystack.co/transaction/initialize"
FIXED_AMOUNT = 100

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/start-payment', methods=['POST'])
def start_payment():
    data = {
        "email": "testuser@example.com",
        "amount": FIXED_AMOUNT
    }
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.post(PAYSTACK_INIT_URL, json=data, headers=headers)
    result = response.json()
    
    if result['status']:
        return jsonify({"authorization_url": result['data']['authorization_url']})
    else:
        return jsonify({"error": "Payment initialization failed"}), 500

@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)
