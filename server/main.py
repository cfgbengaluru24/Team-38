from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
import numpy as np
import joblib
from helpers import translate, handle_messages, report_analysis, search_KB
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
from os import getenv
import json
import io
from pydub import AudioSegment

# Load environment variables
load_dotenv()
MONGO_URL = getenv('MONGO_URL')

# MongoDB connection
client = MongoClient(MONGO_URL)
db = client['jpmc']

app = Flask(__name__)
CORS(app)



# Route for the bar chart
@app.route('/bar-chart')
def bar_chart():
    np.random.seed(42)
    investment_data = np.random.randint(1000, 5000, size=10)
    earned_data = investment_data + np.random.randint(-500, 1500, size=10)
    profit_data = earned_data - investment_data

    num_data_points = len(investment_data)
    days = [f'Day {i+1}' for i in range(num_data_points)]

    fig, ax = plt.subplots(figsize=(12, 6))
    bar_width = 0.35
    index = np.arange(num_data_points)
    ax.bar(index, investment_data, bar_width, label='Investment', color='b')
    ax.bar(index + bar_width, profit_data, bar_width, label='Profit', color='g')

    ax.set_xlabel('Days')
    ax.set_ylabel('Amount')
    ax.set_title('Comparative Analysis of Investment and Profit')
    ax.set_xticks(index + bar_width / 2)
    ax.set_xticklabels(days)
    ax.legend()

    plt.tight_layout()
    save_path = 'static/bar_chart_comparative_analysis.png'
    plt.savefig(save_path)
    plt.close()

    return send_file(save_path, mimetype='image/png')

# Route for the comparative line graph
@app.route('/comparative-graph')
def comparative_graph():
    np.random.seed(42)
    investment_data = np.random.randint(1000, 5000, size=10)
    earned_data = investment_data + np.random.randint(-500, 1500, size=10)
    profit_data = earned_data - investment_data

    num_data_points = len(investment_data)
    days = [f'Day {i+1}' for i in range(num_data_points)]

    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(days, investment_data, marker='o', linestyle='-', color='b', label='Investment')
    ax.plot(days, profit_data, marker='o', linestyle='-', color='g', label='Profit')
    ax.plot(days, earned_data, marker='o', linestyle='-', color='r', label='Earned')

    ax.set_xlabel('Days')
    ax.set_ylabel('Amount')
    ax.set_title('Comparative Analysis of Investment, Profit, and Earned')
    ax.legend()
    ax.grid(True)

    plt.xticks(rotation=45)
    plt.tight_layout()
    save_path = 'static/comparative_analysis.png'
    plt.savefig(save_path)
    plt.close()

    return send_file(save_path, mimetype='image/png')



@app.route("/predict-business-score", methods=["POST"])
def predict():
    try:
        # Get the input array from the request JSON body
        input_data = request.json['input_data']
        
        # Ensure input_data is a 2D array
        if not isinstance(input_data, list) or not all(isinstance(i, list) for i in input_data):
            return jsonify({"error": "Input data should be a 2D array"}), 400

        # Load the model
        model = joblib.load('model.pkl')

        # Convert input data to numpy array
        input_array = np.array(input_data)
        
        # Perform prediction
        prediction = model.predict(input_array)

        # Assuming we want to return the first prediction result
        result = prediction[0]

        return jsonify({"prediction": result}), 200

    except KeyError:
        return jsonify({"error": "Invalid input. Please provide 'input_data' as a key in JSON body"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route for analyzing report
@app.route('/analyze_report', methods=['POST'])
def analyze_report():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400

        audio_file = request.files['file']
        
        # Convert audio_file to multipart/form-data
        if audio_file.content_type == 'application/octet-stream':
            multipart_file = io.BytesIO(audio_file.read())
            multipart_file.name = audio_file.filename
            multipart_file.content_type = 'multipart/form-data'
            audio_file = multipart_file

        # Convert the audio to mp3 format
        audio = AudioSegment.from_file(audio_file)
        mp3_filename = f"{audio_file.filename.rsplit('.', 1)[0]}.mp3"
        audio.export(mp3_filename, format="mp3")
        audio_file = open(mp3_filename, 'rb')

        trainee_report = translate(audio_file)
        system_prompt = """
        You are an assistant for an NGO Best Practices Foundation.
        You are given a report of a trainee's week's summary about how their business has performed. Your task is to extract insights from the report given by the trainee.
        Only extract insights related to the business and how it performs, never the personal details of the trainee.
        For example, for the report of a vegetable business, the insights you might extract based on the report given by the trainee might be:
        - The trainee's business profits in the past week
        - The trainee's business expenses in the past week
        - Types and units of vegetables sold in the past week
        
        Similarly, figure out more insights as needed and add fields as needed, based on the report. Extract up to 10 insights max.
        Output in the following JSON format:
        {
            "insights": [
                {"name": "Insight 1", "value": "Value 1"},
                {"name": "Insight 2", "value": "Value 2"},
                ...
            ]
        }
        """
        
        response = report_analysis(system_prompt, trainee_report)
        insights = json.loads(response)
        
        return jsonify(insights), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.json
        user_message = data.get('message')
        chat_history = data.get('history', [])

        # Get word count of the message
        word_count = len(user_message.split())
        
        # Set alpha value based on word count
        alpha_val = 0.3 if word_count < 5 else 0.6

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Search knowledge base
        kb_results = search_KB(user_message, alpha_val)
        kb_context = "\n".join([result['section'] for result in kb_results])

        # Prepare the messages for the API call
        messages = [
            {"role": "system", "content": "You are a helpful assistant for the Best Practices Foundation NGO. Do not output large more than 3-4 sentences, try to be concise. Use the following context from our knowledge base to inform your responses:\n\n" + kb_context},
        ]
        
        # Add chat history
        for message in chat_history:
            messages.append({"role": "user", "content": message["user"]})
            if "assistant" in message:
                messages.append({"role": "assistant", "content": message["assistant"]})
        
        # Add the current user message
        messages.append({"role": "user", "content": user_message})

        response = handle_messages(messages)
        assistant_response = response

        # Update chat history
        chat_history.append({"user": user_message, "assistant": assistant_response})

        return jsonify({
            "response": assistant_response,
            "history": chat_history
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for trainee progress
@app.route('/trainee-progress', methods=['GET'])
def trainee_progress():
    try:
        trainee_id = request.args.get('trainee_id')
        if not trainee_id:
            return jsonify({"error": "No trainee ID provided"}), 400

        # Query MongoDB for trainee progress
        progress_data = list(db.trainee_progress.find(
            {"trainee_id": ObjectId(trainee_id)},
            {"_id": 0, "date": 1, "score": 1}
        ))

        return jsonify({
            "trainee_id": trainee_id,
            "progress": progress_data
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
